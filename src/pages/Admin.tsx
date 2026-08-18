import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ImagePlus, LogOut, Plus, Save, Trash2 } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useSiteData } from "@/lib/site-data";

type Tab = "about" | "texts" | "races" | "sponsors" | "socials";

type Row = Record<string, string | number | boolean | null>;

const input =
  "w-full bg-muted border border-border px-3 py-2 text-sm text-foreground outline-none focus:border-accent transition-colors";
const label = "font-heading text-[10px] tracking-[0.3em] text-muted-foreground mb-1 block";
const btn =
  "inline-flex items-center justify-center gap-2 font-heading text-[11px] font-semibold tracking-[0.25em] px-4 py-2.5 transition";

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("about");
  const [status, setStatus] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => setIsAdmin(Boolean(data)));
  }, [session]);

  if (!session) return <Login />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="h-[2px] section-divider" />
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-heading text-[10px] tracking-[0.35em] text-accent">CMS</p>
            <h1 className="display-italic text-3xl">
              JEAVY <span className="text-primary">REPPEL</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className={`${btn} border border-border text-muted-foreground hover:text-foreground`}
            >
              <ArrowLeft size={14} /> SITE
            </Link>
            <button
              onClick={() => supabase.auth.signOut()}
              className={`${btn} border border-border text-muted-foreground hover:text-foreground`}
            >
              <LogOut size={14} /> UITLOGGEN
            </button>
          </div>
        </div>
      </header>

      {isAdmin === false && (
        <p className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted-foreground">
          Je bent ingelogd als <span className="text-foreground">{session.user.email}</span>, maar dit
          account heeft geen beheerdersrechten. Vraag een beheerder om je de admin-rol te geven.
        </p>
      )}

      {isAdmin && (
        <div className="mx-auto max-w-6xl px-5 py-8">
          <nav className="flex flex-wrap gap-2 mb-8">
            {(
              [
                ["about", "OVER MIJ"],
                ["texts", "TEKSTEN"],
                ["races", "SEIZOEN"],
                ["sponsors", "SPONSORS"],
                ["socials", "SOCIALS"],
              ] as [Tab, string][]
            ).map(([key, text]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`${btn} border ${
                  tab === key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {text}
              </button>
            ))}
          </nav>

          {status && (
            <p className="mb-6 font-heading text-[11px] tracking-[0.25em] text-accent">{status}</p>
          )}

          {tab === "about" && <AboutEditor onStatus={setStatus} />}
          {tab === "texts" && <TextsEditor onStatus={setStatus} />}
          {tab === "races" && (
            <CollectionEditor
              table="races"
              onStatus={setStatus}
              orderBy="race_date"
              title="Races"
              blank={{
                round: "RONDE 1",
                track: "",
                race_date: "",
                time: "",
                address: "",
                country: "nl",
                result: "",
                upcoming: false,
                sort_order: 0,
              }}
              fields={[
                { key: "round", label: "RONDE" },
                { key: "track", label: "CIRCUIT" },
                { key: "race_date", label: "DATUM", type: "date" },
                { key: "time", label: "TIJD" },
                { key: "address", label: "ADRES", wide: true },
                {
                  key: "country",
                  label: "LAND",
                  options: [
                    ["nl", "Nederland"],
                    ["be", "België"],
                    ["es", "Spanje"],
                    ["it", "Italië"],
                  ],
                },
                { key: "result", label: "RESULTAAT" },
                { key: "upcoming", label: "AANKOMEND", type: "boolean" },
              ]}
            />
          )}
          {tab === "sponsors" && (
            <CollectionEditor
              table="sponsors"
              onStatus={setStatus}
              orderBy="sort_order"
              title="Sponsors"
              blank={{ name: "", logo: "", url: "", sort_order: 0 }}
              fields={[
                { key: "name", label: "NAAM" },
                { key: "logo", label: "LOGO", type: "image", wide: true },
                { key: "url", label: "WEBSITE (opent in nieuw tabblad)", wide: true },
                { key: "sort_order", label: "VOLGORDE", type: "number" },
              ]}
            />
          )}
          {tab === "socials" && (
            <CollectionEditor
              table="socials"
              onStatus={setStatus}
              orderBy="sort_order"
              title="Instagram posts"
              blank={{ image: "", caption: "", link: "", post_date: null, sort_order: 0 }}
              fields={[
                { key: "image", label: "FOTO", type: "image", wide: true },
                { key: "caption", label: "CAPTION", type: "textarea", wide: true },
                { key: "link", label: "LINK NAAR INSTAGRAM POST", wide: true },
                { key: "post_date", label: "DATUM", type: "date" },
                { key: "sort_order", label: "VOLGORDE", type: "number" },
              ]}
            />
          )}
        </div>
      )}
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/#/admin` },
          });
    if (res.error) setError(res.error.message);
    setBusy(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-5">
      <form onSubmit={submit} className="w-full max-w-sm bg-card border border-border p-8">
        <p className="font-heading text-[10px] tracking-[0.35em] text-accent mb-2">CMS LOGIN</p>
        <h1 className="display-italic text-3xl mb-8">
          JEAVY <span className="text-primary">REPPEL</span>
        </h1>
        <div className="space-y-4">
          <div>
            <span className={label}>E-MAIL</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={input}
            />
          </div>
          <div>
            <span className={label}>WACHTWOORD</span>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={input}
            />
          </div>
        </div>
        {error && <p className="mt-4 text-sm text-primary">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className={`${btn} mt-6 w-full bg-primary text-primary-foreground hover:brightness-110 disabled:opacity-60`}
        >
          {mode === "in" ? "INLOGGEN" : "ACCOUNT AANMAKEN"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "in" ? "up" : "in")}
          className="mt-4 w-full font-heading text-[11px] tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
        >
          {mode === "in" ? "NOG GEEN ACCOUNT?" : "AL EEN ACCOUNT? INLOGGEN"}
        </button>
        <Link
          to="/"
          className="mt-6 block text-center font-heading text-[10px] tracking-[0.3em] text-muted-foreground hover:text-foreground"
        >
          TERUG NAAR SITE
        </Link>
      </form>
    </div>
  );
}

function AboutEditor({ onStatus }: { onStatus: (s: string) => void }) {
  const { refresh } = useSiteData();
  const [row, setRow] = useState<Row | null>(null);

  useEffect(() => {
    supabase
      .from("site_about")
      .select("*")
      .limit(1)
      .maybeSingle()
      .then(({ data }) => setRow((data as Row) ?? null));
  }, []);

  if (!row) return <p className="text-sm text-muted-foreground">Laden…</p>;

  const set = (k: string, v: string) => setRow({ ...row, [k]: v });

  const save = async () => {
    const { error } = await supabase.from("site_about").update(row as never).eq("id", row.id as string);
    onStatus(error ? `Fout: ${error.message}` : "Opgeslagen ✓");
    if (!error) await refresh();
  };

  const fields: [string, string, boolean?][] = [
    ["name", "NAAM"],
    ["subtitle", "SECTIE-LABEL"],
    ["age", "LEEFTIJD"],
    ["class", "KLASSE"],
    ["nationality", "NATIONALITEIT"],
    ["team", "TEAM"],
    ["portrait", "PORTRETFOTO URL"],
    ["action", "ACTIEFOTO URL"],
  ];

  return (
    <div className="bg-card border border-border p-6">
      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map(([k, l]) => (
          <div key={k}>
            <span className={label}>{l}</span>
            <input value={String(row[k] ?? "")} onChange={(e) => set(k, e.target.value)} className={input} />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <span className={label}>KORTE INTRO</span>
        <textarea
          rows={5}
          value={String(row.intro ?? "")}
          onChange={(e) => set("intro", e.target.value)}
          className={input}
        />
      </div>
      <div className="mt-4">
        <span className={label}>VOLLEDIGE VERHAAL (UITKLAP)</span>
        <textarea
          rows={7}
          value={String(row.full_story ?? "")}
          onChange={(e) => set("full_story", e.target.value)}
          className={input}
        />
      </div>
      <button onClick={save} className={`${btn} mt-6 bg-primary text-primary-foreground hover:brightness-110`}>
        <Save size={14} /> OPSLAAN
      </button>
    </div>
  );
}

interface Field {
  key: string;
  label: string;
  type?: "text" | "date" | "number" | "boolean" | "textarea" | "image";
  options?: [string, string][];
  wide?: boolean;
}

/** Uploads a logo and returns a long-lived signed URL we can store in the row. */
async function uploadLogo(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("partner-logos").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage
    .from("partner-logos")
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (signErr || !data) throw signErr ?? new Error("Kon geen link maken");
  return data.signedUrl;
}

function TextsEditor({ onStatus }: { onStatus: (s: string) => void }) {
  const { refresh } = useSiteData();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    supabase
      .from("site_texts")
      .select("*")
      .order("group_name", { ascending: true })
      .order("sort_order", { ascending: true })
      .then(({ data }) => setRows((data as Row[]) ?? []));
  }, []);

  const save = async () => {
    const results = await Promise.all(
      rows.map((r) =>
        supabase
          .from("site_texts")
          .update({ value: String(r.value ?? "") })
          .eq("id", r.id as string),
      ),
    );
    const failed = results.find((r) => r.error);
    onStatus(failed?.error ? `Fout: ${failed.error.message}` : "Opgeslagen ✓");
    if (!failed?.error) await refresh();
  };

  if (!rows.length) return <p className="text-sm text-muted-foreground">Laden…</p>;

  const groups = [...new Set(rows.map((r) => String(r.group_name)))];

  return (
    <div className="space-y-6">
      {groups.map((g) => (
        <div key={g} className="bg-card border border-border p-6">
          <h3 className="font-heading text-[11px] tracking-[0.3em] text-accent mb-5">
            {g.toUpperCase()}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {rows
              .filter((r) => r.group_name === g)
              .map((r) => (
                <div key={String(r.id)} className={r.multiline ? "sm:col-span-2" : ""}>
                  <span className={label}>{String(r.label || r.key)}</span>
                  {r.multiline ? (
                    <textarea
                      rows={3}
                      value={String(r.value ?? "")}
                      onChange={(e) =>
                        setRows(rows.map((x) => (x.id === r.id ? { ...x, value: e.target.value } : x)))
                      }
                      className={input}
                    />
                  ) : (
                    <input
                      value={String(r.value ?? "")}
                      onChange={(e) =>
                        setRows(rows.map((x) => (x.id === r.id ? { ...x, value: e.target.value } : x)))
                      }
                      className={input}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
      <button onClick={save} className={`${btn} bg-primary text-primary-foreground hover:brightness-110`}>
        <Save size={14} /> ALLE TEKSTEN OPSLAAN
      </button>
    </div>
  );
}

function CollectionEditor({
  table,
  fields,
  blank,
  orderBy,
  title,
  onStatus,
}: {
  table: "races" | "sponsors" | "socials";
  fields: Field[];
  blank: Row;
  orderBy: string;
  title: string;
  onStatus: (s: string) => void;
}) {
  const { refresh } = useSiteData();
  const [rows, setRows] = useState<Row[]>([]);

  const load = async () => {
    const { data } = await supabase.from(table).select("*").order(orderBy, { ascending: true });
    setRows((data as Row[]) ?? []);
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  const update = (i: number, k: string, v: string | number | boolean) =>
    setRows(rows.map((r, idx) => (idx === i ? { ...r, [k]: v } : r)));

  const save = async (row: Row) => {
    const payload = { ...row };
    delete payload.created_at;
    delete payload.updated_at;
    Object.keys(payload).forEach((k) => {
      if (payload[k] === "") payload[k] = k.endsWith("_date") ? null : "";
    });
    const { error } = await supabase.from(table).update(payload as never).eq("id", row.id as string);
    onStatus(error ? `Fout: ${error.message}` : "Opgeslagen ✓");
    if (!error) await refresh();
  };

  const add = async () => {
    const payload = { ...blank };
    Object.keys(payload).forEach((k) => {
      if (payload[k] === "" && k.endsWith("_date")) payload[k] = null;
    });
    const { error } = await supabase.from(table).insert(payload as never);
    if (error) return onStatus(`Fout: ${error.message}`);
    await load();
    await refresh();
    onStatus("Toegevoegd ✓");
  };

  const remove = async (row: Row) => {
    const { error } = await supabase.from(table).delete().eq("id", row.id as string);
    if (error) return onStatus(`Fout: ${error.message}`);
    setRows(rows.filter((r) => r.id !== row.id));
    await refresh();
    onStatus("Verwijderd ✓");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading text-sm tracking-[0.3em] text-muted-foreground">
          {title.toUpperCase()} ({rows.length})
        </h2>
        <button onClick={add} className={`${btn} bg-accent text-accent-foreground hover:brightness-110`}>
          <Plus size={14} /> NIEUW
        </button>
      </div>

      <div className="space-y-4">
        {rows.map((row, i) => (
          <div key={String(row.id)} className="bg-card border border-border p-5">
            <div className="grid sm:grid-cols-3 gap-4">
              {fields.map((f) => (
                <div key={f.key} className={f.wide ? "sm:col-span-3" : ""}>
                  <span className={label}>{f.label}</span>
                  {f.options ? (
                    <select
                      value={String(row[f.key] ?? "")}
                      onChange={(e) => update(i, f.key, e.target.value)}
                      className={input}
                    >
                      {f.options.map(([v, l]) => (
                        <option key={v} value={v}>
                          {l}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "boolean" ? (
                    <label className="inline-flex items-center gap-2 text-sm text-muted-foreground py-2">
                      <input
                        type="checkbox"
                        checked={Boolean(row[f.key])}
                        onChange={(e) => update(i, f.key, e.target.checked)}
                        className="accent-primary h-4 w-4"
                      />
                      Ja
                    </label>
                  ) : f.type === "image" ? (
                    <div className="space-y-2">
                      <input
                        value={String(row[f.key] ?? "")}
                        onChange={(e) => update(i, f.key, e.target.value)}
                        placeholder="https://… of upload hieronder"
                        className={input}
                      />
                      <div className="flex items-center gap-3">
                        <label className="inline-flex cursor-pointer items-center gap-2 border border-border px-3 py-2 font-heading text-[10px] tracking-[0.25em] text-muted-foreground hover:text-foreground">
                          <ImagePlus size={14} /> LOGO UPLOADEN
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              onStatus("Uploaden…");
                              try {
                                const url = await uploadLogo(file);
                                update(i, f.key, url);
                                onStatus("Logo geüpload — vergeet niet op te slaan");
                              } catch (err) {
                                onStatus(`Fout: ${(err as Error).message}`);
                              }
                            }}
                          />
                        </label>
                        {row[f.key] ? (
                          <img
                            src={String(row[f.key])}
                            alt=""
                            className="h-10 max-w-[120px] object-contain"
                          />
                        ) : null}
                      </div>
                    </div>
                  ) : f.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={String(row[f.key] ?? "")}
                      onChange={(e) => update(i, f.key, e.target.value)}
                      className={input}
                    />
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                      value={String(row[f.key] ?? "")}
                      onChange={(e) =>
                        update(i, f.key, f.type === "number" ? Number(e.target.value) : e.target.value)
                      }
                      className={input}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => save(row)}
                className={`${btn} bg-primary text-primary-foreground hover:brightness-110`}
              >
                <Save size={14} /> OPSLAAN
              </button>
              <button
                onClick={() => remove(row)}
                className={`${btn} border border-border text-muted-foreground hover:text-primary`}
              >
                <Trash2 size={14} /> VERWIJDEREN
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
