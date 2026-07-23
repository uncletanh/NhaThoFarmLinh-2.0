ALTER TABLE public.poems
ADD COLUMN IF NOT EXISTS view_count BIGINT NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION public.increment_poem_view(poem_id UUID)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated_count BIGINT;
BEGIN
  UPDATE public.poems
  SET view_count = view_count + 1
  WHERE id = poem_id
    AND is_public = true
  RETURNING view_count INTO updated_count;

  RETURN COALESCE(updated_count, 0);
END;
$$;

REVOKE ALL ON FUNCTION public.increment_poem_view(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_poem_view(UUID) TO anon, authenticated;
