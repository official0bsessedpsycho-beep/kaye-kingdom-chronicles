-- =============================================
-- NOTIFICATIONS TABLE
-- =============================================
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('comment', 'reaction', 'mention', 'system', 'welcome')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  related_post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  related_user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Notification policies
CREATE POLICY "Users can view their own notifications"
ON public.notifications FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.notifications FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
ON public.notifications FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can delete their own notifications"
ON public.notifications FOR DELETE
USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(user_id, read);

-- =============================================
-- ACTIVITY LOGS TABLE (for analytics)
-- =============================================
CREATE TABLE public.activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view activity logs
CREATE POLICY "Admins can view all activity logs"
ON public.activity_logs FOR SELECT
USING (is_admin(auth.uid()));

-- System can insert logs
CREATE POLICY "System can create activity logs"
ON public.activity_logs FOR INSERT
WITH CHECK (true);

-- Index for faster queries
CREATE INDEX idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX idx_activity_logs_action ON public.activity_logs(action);
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at DESC);

-- =============================================
-- STORAGE BUCKET FOR POST MEDIA
-- =============================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'post-media', 
  'post-media', 
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
);

-- Storage policies for post-media bucket
CREATE POLICY "Anyone can view post media"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-media');

CREATE POLICY "Approved users can upload post media"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'post-media' 
  AND auth.uid()::text = (storage.foldername(name))[1]
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND approved = true
  )
);

CREATE POLICY "Users can update their own media"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'post-media' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own media"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'post-media' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- =============================================
-- ADMIN STATS VIEW (for dashboard)
-- =============================================
CREATE OR REPLACE VIEW public.admin_stats AS
SELECT
  (SELECT COUNT(*) FROM public.profiles) as total_users,
  (SELECT COUNT(*) FROM public.profiles WHERE approved = true) as approved_users,
  (SELECT COUNT(*) FROM public.profiles WHERE approved = false) as pending_users,
  (SELECT COUNT(*) FROM public.posts) as total_posts,
  (SELECT COUNT(*) FROM public.comments) as total_comments,
  (SELECT COUNT(*) FROM public.reactions) as total_reactions,
  (SELECT COUNT(*) FROM public.posts WHERE created_at > now() - interval '7 days') as posts_last_week,
  (SELECT COUNT(*) FROM public.profiles WHERE created_at > now() - interval '7 days') as signups_last_week;

-- =============================================
-- FUNCTION TO CREATE NOTIFICATIONS
-- =============================================
CREATE OR REPLACE FUNCTION public.create_notification(
  p_user_id UUID,
  p_type TEXT,
  p_title TEXT,
  p_message TEXT,
  p_related_post_id UUID DEFAULT NULL,
  p_related_user_id UUID DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  notification_id UUID;
BEGIN
  INSERT INTO public.notifications (user_id, type, title, message, related_post_id, related_user_id)
  VALUES (p_user_id, p_type, p_title, p_message, p_related_post_id, p_related_user_id)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$;

-- =============================================
-- FUNCTION TO LOG ACTIVITY
-- =============================================
CREATE OR REPLACE FUNCTION public.log_activity(
  p_user_id UUID,
  p_action TEXT,
  p_entity_type TEXT DEFAULT NULL,
  p_entity_id UUID DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO public.activity_logs (user_id, action, entity_type, entity_id, metadata)
  VALUES (p_user_id, p_action, p_entity_type, p_entity_id, p_metadata)
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$;

-- =============================================
-- TRIGGERS FOR AUTO-NOTIFICATIONS
-- =============================================

-- Notify post author when someone comments
CREATE OR REPLACE FUNCTION public.notify_on_comment()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  post_author_id UUID;
  commenter_name TEXT;
BEGIN
  -- Get post author
  SELECT author_id INTO post_author_id FROM public.posts WHERE id = NEW.post_id;
  
  -- Don't notify if commenting on own post
  IF post_author_id = NEW.author_id THEN
    RETURN NEW;
  END IF;
  
  -- Get commenter name
  SELECT display_name INTO commenter_name FROM public.profiles WHERE user_id = NEW.author_id;
  
  -- Create notification
  PERFORM public.create_notification(
    post_author_id,
    'comment',
    'New Comment',
    commenter_name || ' commented on your post',
    NEW.post_id,
    NEW.author_id
  );
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_comment_notify
AFTER INSERT ON public.comments
FOR EACH ROW EXECUTE FUNCTION public.notify_on_comment();

-- Notify post author when someone reacts
CREATE OR REPLACE FUNCTION public.notify_on_reaction()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  post_author_id UUID;
  reactor_name TEXT;
BEGIN
  -- Get post author
  SELECT author_id INTO post_author_id FROM public.posts WHERE id = NEW.post_id;
  
  -- Don't notify if reacting to own post
  IF post_author_id = NEW.user_id THEN
    RETURN NEW;
  END IF;
  
  -- Get reactor name
  SELECT display_name INTO reactor_name FROM public.profiles WHERE user_id = NEW.user_id;
  
  -- Create notification
  PERFORM public.create_notification(
    post_author_id,
    'reaction',
    'New Reaction',
    reactor_name || ' loved your post',
    NEW.post_id,
    NEW.user_id
  );
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_reaction_notify
AFTER INSERT ON public.reactions
FOR EACH ROW EXECUTE FUNCTION public.notify_on_reaction();

-- Welcome notification for new approved users
CREATE OR REPLACE FUNCTION public.notify_on_approval()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only trigger when approved changes from false to true
  IF OLD.approved = false AND NEW.approved = true THEN
    PERFORM public.create_notification(
      NEW.user_id,
      'welcome',
      'Welcome to the Family!',
      'Maligayang pagdating! Your account has been approved. Start sharing your magical moments!',
      NULL,
      NULL
    );
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_user_approved_notify
AFTER UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.notify_on_approval();

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;