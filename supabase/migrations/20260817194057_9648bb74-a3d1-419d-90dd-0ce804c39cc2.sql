CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ABOUT (single row)
CREATE TABLE public.site_about (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'JEAVY REPPEL',
  subtitle text NOT NULL DEFAULT 'OVER MIJ',
  portrait text NOT NULL DEFAULT '/images/profile.png',
  action text NOT NULL DEFAULT '/images/helmet.jpg',
  age text NOT NULL DEFAULT '12',
  class text NOT NULL DEFAULT 'Junior Rotax',
  nationality text NOT NULL DEFAULT 'Nederlands',
  team text NOT NULL DEFAULT 'CS KART',
  intro text NOT NULL DEFAULT '',
  full_story text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_about TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_about TO authenticated;
GRANT ALL ON public.site_about TO service_role;
ALTER TABLE public.site_about ENABLE ROW LEVEL SECURITY;
CREATE POLICY "About is publicly readable" ON public.site_about FOR SELECT USING (true);
CREATE POLICY "Admins manage about" ON public.site_about FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_about_updated_at BEFORE UPDATE ON public.site_about
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RACES
CREATE TABLE public.races (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  round text NOT NULL DEFAULT '',
  track text NOT NULL DEFAULT '',
  race_date date,
  time text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  country text NOT NULL DEFAULT 'nl',
  result text NOT NULL DEFAULT '',
  upcoming boolean NOT NULL DEFAULT false,
  notes text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.races TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.races TO authenticated;
GRANT ALL ON public.races TO service_role;
ALTER TABLE public.races ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Races are publicly readable" ON public.races FOR SELECT USING (true);
CREATE POLICY "Admins manage races" ON public.races FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER races_updated_at BEFORE UPDATE ON public.races
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- SPONSORS
CREATE TABLE public.sponsors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo text NOT NULL DEFAULT '',
  url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.sponsors TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sponsors TO authenticated;
GRANT ALL ON public.sponsors TO service_role;
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sponsors are publicly readable" ON public.sponsors FOR SELECT USING (true);
CREATE POLICY "Admins manage sponsors" ON public.sponsors FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER sponsors_updated_at BEFORE UPDATE ON public.sponsors
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- SOCIALS
CREATE TABLE public.socials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image text NOT NULL DEFAULT '',
  caption text NOT NULL DEFAULT '',
  link text NOT NULL DEFAULT '',
  post_date date,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.socials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.socials TO authenticated;
GRANT ALL ON public.socials TO service_role;
ALTER TABLE public.socials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Socials are publicly readable" ON public.socials FOR SELECT USING (true);
CREATE POLICY "Admins manage socials" ON public.socials FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER socials_updated_at BEFORE UPDATE ON public.socials
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- SEED
INSERT INTO public.site_about (name, subtitle, portrait, action, age, class, nationality, team, intro, full_story)
VALUES (
  'JEAVY REPPEL', 'OVER MIJ', '/images/profile.png', '/images/helmet.jpg', '12', 'Junior Rotax', 'Nederlands', 'CS KART',
  E'Ik ben Jeavy Reppel, een 12-jarige kartcoureur uit Nederland. Ik rijd in de Junior Rotax klasse met CS KART (Carlos Sainz Kart) en ben volledig gefocust om elke dag te verbeteren en mijn dromen waar te maken.\n\nHard werken, discipline en een winnaarsmentaliteit drijven mij elke race vooruit.',
  E'Mijn passie voor karting begon op jonge leeftijd en is sindsdien alleen maar gegroeid. Wat ooit een hobby was, is uitgegroeid tot een serieuze sportieve uitdaging waarin ik elke dag stappen wil zetten.\n\nNaast het rijden zelf besteed ik veel tijd aan training, voorbereiding en het analyseren van data. Samen met mijn team en familie werk ik aan elk detail — van setup en lijnen tot mentale focus en fitheid.\n\nMijn doel is duidelijk: groeien als coureur, het podium halen in het Junior Rotax kampioenschap en uiteindelijk de stap maken naar de hogere klassen van de internationale autosport.'
);

INSERT INTO public.sponsors (name, sort_order) VALUES ('IKWILUM', 1), ('REPPEL MONTAGE', 2);

INSERT INTO public.socials (image, caption, link, post_date, sort_order) VALUES
('/images/helmet.jpg', 'Klaar voor de seizoensstart! Eerste tests op het circuit zitten erop.', 'https://instagram.com/jeavy_reppel.karting', '2026-06-01', 1),
('/images/profile.png', 'Podium! Tweede plaats in een sterke kwalificatie. Op naar de volgende race.', 'https://instagram.com/jeavy_reppel.karting', '2026-06-15', 2),
('/images/helmet.jpg', 'Paddock vibes. Dank aan het team voor de perfecte voorbereiding!', 'https://instagram.com/jeavy_reppel.karting', '2026-06-22', 3);