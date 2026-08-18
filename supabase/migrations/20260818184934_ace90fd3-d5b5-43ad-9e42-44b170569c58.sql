ALTER TABLE public.socials ADD COLUMN IF NOT EXISTS ig_id text;
CREATE UNIQUE INDEX IF NOT EXISTS socials_ig_id_key ON public.socials (ig_id) WHERE ig_id IS NOT NULL;
ALTER TABLE public.socials ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'manual';