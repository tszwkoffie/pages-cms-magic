import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  getAbout as getAboutFallback,
  getRaces as getRacesFallback,
  getSponsors as getSponsorsFallback,
  type About,
  type Race,
  type Sponsor,
} from "@/lib/content";

export interface SiteData {
  about: About;
  races: Race[];
  sponsors: Sponsor[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const fallback: Omit<SiteData, "loading" | "refresh"> = {
  about: getAboutFallback(),
  races: getRacesFallback(),
  sponsors: getSponsorsFallback(),
};

const SiteDataContext = createContext<SiteData>({
  ...fallback,
  loading: true,
  refresh: async () => {},
});

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [aboutRes, racesRes, sponsorsRes] = await Promise.all([
      supabase.from("site_about").select("*").limit(1).maybeSingle(),
      supabase.from("races").select("*").order("race_date", { ascending: true }),
      supabase.from("sponsors").select("*").order("sort_order", { ascending: true }),
    ]);

    setData((prev) => ({
      about: aboutRes.data
        ? {
            name: aboutRes.data.name,
            subtitle: aboutRes.data.subtitle,
            portrait: aboutRes.data.portrait,
            action: aboutRes.data.action,
            age: aboutRes.data.age,
            className: aboutRes.data.class,
            nationality: aboutRes.data.nationality,
            team: aboutRes.data.team,
            body: aboutRes.data.intro,
            fullStory: aboutRes.data.full_story,
          }
        : prev.about,
      races: racesRes.data
        ? racesRes.data.map((r, i) => ({
            round: r.round || `RONDE ${i + 1}`,
            track: (r.track || "").toUpperCase(),
            date: r.race_date ?? "",
            time: r.time ?? "",
            address: r.address ?? "",
            country: (r.country || "nl") as Race["country"],
            result: r.result || "TBD",
            upcoming: r.upcoming,
          }))
        : prev.races,
      sponsors: sponsorsRes.data
        ? sponsorsRes.data.map((s) => ({
            name: s.name,
            logo: s.logo || undefined,
            url: s.url || undefined,
            order: s.sort_order,
          }))
        : prev.sponsors,
    }));
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <SiteDataContext.Provider value={{ ...data, loading, refresh: load }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export const useSiteData = () => useContext(SiteDataContext);
export const useAbout = () => useSiteData().about;
export const useRaces = () => useSiteData().races;
export const useSponsors = () => useSiteData().sponsors;
