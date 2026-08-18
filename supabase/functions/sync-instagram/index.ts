import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

interface IgMedia {
  id: string;
  caption?: string;
  media_type: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  const token = Deno.env.get("INSTAGRAM_ACCESS_TOKEN");
  if (!token) {
    return json({ error: "INSTAGRAM_ACCESS_TOKEN ontbreekt" }, 500);
  }

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&limit=12&access_token=${token}`,
    );
    const payload = await res.json();
    if (!res.ok) {
      console.error("Instagram API fout", payload);
      return json({ error: payload?.error?.message ?? "Instagram API fout" }, 502);
    }

    const media: IgMedia[] = (payload.data ?? []).filter(
      (m: IgMedia) => m.media_type !== "VIDEO" || m.thumbnail_url,
    );

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const rows = media.map((m, i) => ({
      ig_id: m.id,
      image: m.media_type === "VIDEO" ? (m.thumbnail_url ?? "") : (m.media_url ?? ""),
      caption: (m.caption ?? "").slice(0, 500),
      link: m.permalink,
      post_date: m.timestamp?.slice(0, 10) ?? null,
      sort_order: i,
      source: "instagram",
    }));

    if (rows.length) {
      const { error } = await supabase.from("socials").upsert(rows, { onConflict: "ig_id" });
      if (error) {
        console.error("Opslaan mislukt", error);
        return json({ error: error.message }, 500);
      }

      // Oudere automatisch opgehaalde posts opruimen, handmatige posts blijven staan.
      const keep = rows.map((r) => r.ig_id);
      await supabase
        .from("socials")
        .delete()
        .eq("source", "instagram")
        .not("ig_id", "in", `(${keep.map((k) => `"${k}"`).join(",")})`);
    }

    return json({ synced: rows.length });
  } catch (err) {
    console.error(err);
    return json({ error: (err as Error).message }, 500);
  }
});
