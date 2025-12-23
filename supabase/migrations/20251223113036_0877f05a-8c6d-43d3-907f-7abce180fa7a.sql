-- Fix 1: Create a SECURITY DEFINER function to handle profile approval during registration
-- This prevents clients from directly setting approved=true

CREATE OR REPLACE FUNCTION public.approve_user_with_invite(
  p_user_id UUID,
  p_display_name TEXT,
  p_relationship user_role
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  clean_display_name TEXT;
BEGIN
  -- Validate and sanitize display_name
  clean_display_name := COALESCE(NULLIF(TRIM(p_display_name), ''), 'User');
  
  -- Enforce length limits
  IF LENGTH(clean_display_name) > 50 THEN
    clean_display_name := LEFT(clean_display_name, 50);
  END IF;
  
  -- Only allow alphanumeric, spaces, hyphens, and apostrophes
  clean_display_name := REGEXP_REPLACE(clean_display_name, '[^a-zA-Z0-9\s''-]', '', 'g');
  
  -- Update the profile with validated data
  UPDATE profiles
  SET approved = true,
      relationship = p_relationship,
      display_name = clean_display_name
  WHERE user_id = p_user_id
    AND approved = false;
END;
$$;

-- Fix 2: Restrict users from changing their own approval status or relationship
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can update their own profile (limited)"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id 
  AND approved = (SELECT approved FROM profiles WHERE user_id = auth.uid())
  AND relationship = (SELECT relationship FROM profiles WHERE user_id = auth.uid())
);

-- Fix 3: Improve handle_new_user function with input validation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  clean_display_name TEXT;
BEGIN
  -- Validate and sanitize display_name from metadata
  clean_display_name := COALESCE(
    NULLIF(TRIM(NEW.raw_user_meta_data->>'display_name'), ''),
    SPLIT_PART(NEW.email, '@', 1)
  );
  
  -- Enforce length limits (max 50 chars)
  IF LENGTH(clean_display_name) > 50 THEN
    clean_display_name := LEFT(clean_display_name, 50);
  END IF;
  
  -- Remove potentially dangerous characters - only allow safe characters
  clean_display_name := REGEXP_REPLACE(clean_display_name, '[^a-zA-Z0-9\s''-]', '', 'g');
  
  -- Ensure we have at least something
  IF LENGTH(TRIM(clean_display_name)) < 1 THEN
    clean_display_name := 'User';
  END IF;
  
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, clean_display_name);
  
  RETURN NEW;
END;
$$;

-- Fix 4: Improve is_admin function with authentication check
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Ensure caller is authenticated
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;
  
  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'admin'
  );
END;
$$;