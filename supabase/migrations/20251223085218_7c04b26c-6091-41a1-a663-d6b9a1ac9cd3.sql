-- Fix the function search_path security warning
CREATE OR REPLACE FUNCTION public.can_view_post(post_audience post_audience, viewer_relationship user_role)
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT CASE
    WHEN post_audience = 'everyone' THEN true
    WHEN post_audience = 'family' AND viewer_relationship = 'family' THEN true
    WHEN post_audience = 'inner_circle' AND viewer_relationship IN ('family', 'inner_circle') THEN true
    WHEN post_audience = 'friends' AND viewer_relationship IN ('family', 'inner_circle', 'friend') THEN true
    ELSE false
  END
$$;