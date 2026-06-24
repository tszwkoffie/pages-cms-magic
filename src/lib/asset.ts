// Prepends Vite's BASE_URL so asset paths work whether deployed at "/"
// (user/org GitHub Pages) or "/repo-name/" (project Pages).
export function asset(p: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const clean = p.replace(/^\//, "");
  return base.endsWith("/") ? base + clean : base + "/" + clean;
}
