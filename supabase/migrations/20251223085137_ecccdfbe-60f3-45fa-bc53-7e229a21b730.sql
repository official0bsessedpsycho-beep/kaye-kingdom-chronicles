-- Create enum for post audience/privacy
CREATE TYPE public.post_audience AS ENUM ('family', 'inner_circle', 'friends', 'everyone');

-- Create posts table
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT,
  audience post_audience NOT NULL DEFAULT 'everyone',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create post_media table for images/videos
CREATE TABLE public.post_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reactions table
CREATE TABLE public.reactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL DEFAULT 'heart',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Enable RLS on all tables
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user can view a post based on audience
CREATE OR REPLACE FUNCTION public.can_view_post(post_audience post_audience, viewer_relationship user_role)
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT CASE
    WHEN post_audience = 'everyone' THEN true
    WHEN post_audience = 'family' AND viewer_relationship = 'family' THEN true
    WHEN post_audience = 'inner_circle' AND viewer_relationship IN ('family', 'inner_circle') THEN true
    WHEN post_audience = 'friends' AND viewer_relationship IN ('family', 'inner_circle', 'friend') THEN true
    ELSE false
  END
$$;

-- Posts policies: approved users can view posts based on audience
CREATE POLICY "Approved users can view posts based on audience"
ON public.posts
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.user_id = auth.uid()
    AND p.approved = true
    AND public.can_view_post(posts.audience, p.relationship)
  )
);

-- Users can create their own posts
CREATE POLICY "Approved users can create posts"
ON public.posts
FOR INSERT
WITH CHECK (
  auth.uid() = author_id
  AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid() AND approved = true
  )
);

-- Users can update their own posts
CREATE POLICY "Users can update their own posts"
ON public.posts
FOR UPDATE
USING (auth.uid() = author_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete their own posts"
ON public.posts
FOR DELETE
USING (auth.uid() = author_id);

-- Post media policies
CREATE POLICY "Users can view media for viewable posts"
ON public.post_media
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.posts p
    JOIN public.profiles pr ON pr.user_id = auth.uid()
    WHERE p.id = post_media.post_id
    AND pr.approved = true
    AND public.can_view_post(p.audience, pr.relationship)
  )
);

CREATE POLICY "Post authors can add media"
ON public.post_media
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.posts
    WHERE id = post_media.post_id AND author_id = auth.uid()
  )
);

CREATE POLICY "Post authors can delete media"
ON public.post_media
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.posts
    WHERE id = post_media.post_id AND author_id = auth.uid()
  )
);

-- Comments policies
CREATE POLICY "Users can view comments on viewable posts"
ON public.comments
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.posts p
    JOIN public.profiles pr ON pr.user_id = auth.uid()
    WHERE p.id = comments.post_id
    AND pr.approved = true
    AND public.can_view_post(p.audience, pr.relationship)
  )
);

CREATE POLICY "Approved users can create comments"
ON public.comments
FOR INSERT
WITH CHECK (
  auth.uid() = author_id
  AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid() AND approved = true
  )
);

CREATE POLICY "Users can update their own comments"
ON public.comments
FOR UPDATE
USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own comments"
ON public.comments
FOR DELETE
USING (auth.uid() = author_id);

-- Reactions policies
CREATE POLICY "Users can view reactions on viewable posts"
ON public.reactions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.posts p
    JOIN public.profiles pr ON pr.user_id = auth.uid()
    WHERE p.id = reactions.post_id
    AND pr.approved = true
    AND public.can_view_post(p.audience, pr.relationship)
  )
);

CREATE POLICY "Approved users can add reactions"
ON public.reactions
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid() AND approved = true
  )
);

CREATE POLICY "Users can remove their own reactions"
ON public.reactions
FOR DELETE
USING (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON public.comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for posts
ALTER PUBLICATION supabase_realtime ADD TABLE public.posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reactions;