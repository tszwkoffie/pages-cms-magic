import yaml from "js-yaml";
import { asset } from "./asset";

function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  return {
    data: (yaml.load(match[1]) as Record<string, unknown>) || {},
    body: match[2] ?? "",
  };
}

// Resolve a content image path (which may be "/images/uploads/x.jpg" or "images/x.jpg")
// to a URL respecting Vite's base. Absolute (http) URLs pass through.
export function contentImage(p: string | undefined | null): string {
  if (!p) return "";
  if (/^https?:\/\//.test(p)) return p;
  return asset(p);
}

// ---------- About ----------
export interface About {
  name: string;
  subtitle: string;
  portrait: string;
  action: string;
  age: string;
  className: string;
  nationality: string;
  team: string;
  body: string;
}

const aboutRaw = import.meta.glob("/content/about.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export function getAbout(): About {
  const raw = Object.values(aboutRaw)[0] ?? "";
  const { data, body } = parseFrontmatter(raw);
  return {
    name: (data.name as string) ?? "JEAVY REPPEL",
    subtitle: (data.subtitle as string) ?? "ABOUT ME",
    portrait: (data.portrait as string) ?? "/images/profile.png",
    action: (data.action as string) ?? "/images/helmet.jpg",
    age: (data.age as string) ?? "12",
    className: (data.class as string) ?? "Junior Rotax",
    nationality: (data.nationality as string) ?? "Dutch",
    team: (data.team as string) ?? "CS KART",
    body: body.trim(),
  };
}

// ---------- Races ----------
export interface Race {
  round: string;
  track: string;
  date: string; // ISO yyyy-mm-dd
  country: "es" | "be" | "it" | "nl";
  result: string;
  upcoming: boolean;
}

const racesRaw = import.meta.glob("/content/races/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export function getRaces(): Race[] {
  return Object.values(racesRaw)
    .map((raw) => parseFrontmatter(raw).data)
    .map((d, i) => ({
      round: (d.round as string) ?? `ROUND ${i + 1}`,
      track: ((d.track as string) ?? "").toUpperCase(),
      date: (d.date as string) ?? "",
      country: ((d.country as string) ?? "nl") as Race["country"],
      result: (d.result as string) ?? "TBD",
      upcoming: Boolean(d.upcoming),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

// ---------- Sponsors ----------
export interface Sponsor {
  name: string;
  logo?: string;
  url?: string;
  order: number;
}

const sponsorsRaw = import.meta.glob("/content/sponsors/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export function getSponsors(): Sponsor[] {
  return Object.values(sponsorsRaw)
    .map((raw) => parseFrontmatter(raw).data)
    .map((d) => ({
      name: (d.name as string) ?? "",
      logo: d.logo as string | undefined,
      url: d.url as string | undefined,
      order: Number(d.order ?? 0),
    }))
    .filter((s) => s.name)
    .sort((a, b) => a.order - b.order);
}

// Format a yyyy-mm-dd date as "15 FEB 2026"
export function formatRaceDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return `${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
