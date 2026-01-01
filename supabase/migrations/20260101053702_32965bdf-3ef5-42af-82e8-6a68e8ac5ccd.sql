-- Fix security definer view issue by replacing with a function
-- Drop the view first
DROP VIEW IF EXISTS public.admin_stats;

-- Create a SECURITY DEFINER function instead (which is acceptable for admin-only access)
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS TABLE (
  total_users BIGINT,
  approved_users BIGINT,
  pending_users BIGINT,
  total_posts BIGINT,
  total_comments BIGINT,
  total_reactions BIGINT,
  posts_last_week BIGINT,
  signups_last_week BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins to call this function
  IF NOT is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Access denied: Admin privileges required';
  END IF;

  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM public.profiles)::BIGINT,
    (SELECT COUNT(*) FROM public.profiles WHERE approved = true)::BIGINT,
    (SELECT COUNT(*) FROM public.profiles WHERE approved = false)::BIGINT,
    (SELECT COUNT(*) FROM public.posts)::BIGINT,
    (SELECT COUNT(*) FROM public.comments)::BIGINT,
    (SELECT COUNT(*) FROM public.reactions)::BIGINT,
    (SELECT COUNT(*) FROM public.posts WHERE created_at > now() - interval '7 days')::BIGINT,
    (SELECT COUNT(*) FROM public.profiles WHERE created_at > now() - interval '7 days')::BIGINT;
END;
$$;