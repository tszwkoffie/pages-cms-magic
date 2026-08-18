CREATE TABLE public.site_texts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  label text NOT NULL DEFAULT '',
  value text NOT NULL DEFAULT '',
  group_name text NOT NULL DEFAULT 'algemeen',
  multiline boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_texts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_texts TO authenticated;
GRANT ALL ON public.site_texts TO service_role;
ALTER TABLE public.site_texts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Texts are publicly readable" ON public.site_texts FOR SELECT USING (true);
CREATE POLICY "Admins manage texts" ON public.site_texts FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_texts_updated_at BEFORE UPDATE ON public.site_texts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.site_texts (key, label, value, group_name, multiline, sort_order) VALUES
  ('hero_badge', 'Hero — badge', 'Junior Rotax · Seizoen 2026 / 2027', 'hero', false, 10),
  ('hero_title_first', 'Hero — voornaam', 'JEAVY', 'hero', false, 20),
  ('hero_title_last', 'Hero — achternaam', 'REPPEL', 'hero', false, 30),
  ('hero_number', 'Hero — startnummer', '#236', 'hero', false, 40),
  ('hero_tagline', 'Hero — tagline', 'Snelheid. Toewijding. Vooruitgang. Een nieuwe generatie achter het stuur — elke ronde scherper.', 'hero', true, 50),
  ('hero_cta_primary', 'Hero — knop 1', 'VOLG MIJN SEIZOEN', 'hero', false, 60),
  ('hero_cta_secondary', 'Hero — knop 2', 'WORD PARTNER', 'hero', false, 70),
  ('contact_title', 'Contact — titel', 'LATEN WE DE TOEKOMST SAMEN BOUWEN.', 'contact', true, 10),
  ('contact_body', 'Contact — tekst', 'Interesse in een partnership met Jeavy Reppel? Neem contact op en word onderdeel van het avontuur.', 'contact', true, 20),
  ('contact_cta', 'Contact — knop', 'NEEM CONTACT OP', 'contact', false, 30),
  ('contact_email', 'Contact — e-mailadres', 'info@jeavyreppel.com', 'contact', false, 40),
  ('contact_instagram', 'Contact — Instagram', '@jeavy_reppel.karting', 'contact', false, 50),
  ('partners_title', 'Partners — titel', 'ONZE PARTNERS', 'partners', false, 10);

CREATE POLICY "Partner logos are readable" ON storage.objects FOR SELECT
USING (bucket_id = 'partner-logos');
CREATE POLICY "Admins upload partner logos" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'partner-logos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update partner logos" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'partner-logos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete partner logos" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'partner-logos' AND public.has_role(auth.uid(), 'admin'));