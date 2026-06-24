// Fetches the latest Instagram posts via the Instagram Graph API and writes
// them to content/instagram.json so the Vite build can render them as static
// cards. Runs in GitHub Actions before `bun run build`.
//
// Required env vars (set as GitHub repo secrets):
//   IG_TOKEN  - long-lived Instagram Graph API access token
//               (Business/Creator account linked to a Facebook Page)
//
// Optional:
//   IG_USER_ID - numeric IG user id. If omitted, the script resolves it
//                from /me/accounts -> instagram_business_account.
//   IG_LIMIT   - number of posts to fetch (default 9)
//
// If IG_TOKEN is missing the script exits successfully with an empty list,
// so local builds / first-time deploys don't fail.

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../content/instagram.json");

const TOKEN = process.env.IG_TOKEN;
const LIMIT = Number(process.env.IG_LIMIT ?? 9);
const FIELDS = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";

async function writeOut(posts, note) {
  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(
    OUT,
    JSON.stringify({ fetched_at: new Date().toISOString(), note, posts }, null, 2),
  );
  console.log(`[instagram] wrote ${posts.length} post(s) to ${OUT}${note ? ` (${note})` : ""}`);
}

if (!TOKEN) {
  console.warn("[instagram] IG_TOKEN not set — writing empty feed and skipping fetch.");
  await writeOut([], "no token configured");
  process.exit(0);
}

async function ig(path, params = {}) {
  const url = new URL(`https://graph.instagram.com/v21.0/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  url.searchParams.set("access_token", TOKEN);
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`IG API ${res.status}: ${JSON.stringify(json)}`);
  }
  return json;
}

try {
  // /me works for both Instagram Login (direct IG tokens) and Graph API tokens
  // attached to an IG Business account.
  const userId = process.env.IG_USER_ID ?? "me";
  const data = await ig(`${userId}/media`, { fields: FIELDS, limit: LIMIT });

  const posts = (data.data ?? []).map((p) => ({
    id: p.id,
    caption: p.caption ?? "",
    media_type: p.media_type,
    image: p.media_type === "VIDEO" ? p.thumbnail_url : p.media_url,
    permalink: p.permalink,
    timestamp: p.timestamp,
  }));

  await writeOut(posts);
} catch (err) {
  console.error("[instagram] fetch failed:", err.message);
  // Don't fail the whole deploy — keep the previous (or empty) feed.
  await writeOut([], `fetch failed: ${err.message}`);
}
