import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LogOut, Plus, Save, Trash2 } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useSiteData } from "@/lib/site-data";

type Tab = "about" | "races" | "sponsors" | "socials";

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
                { key: "logo", label: "LOGO URL", wide: true },
                { key: "url", label: "WEBSITE", wide: true },
                { key: "sort_order", label: "VOLGORDE", type: "number" },
              ]}
            />
          )}
          {tab === "socials" && (
            <CollectionEditor
              table="socials"
              onStatus={setStatus}
              orderBy="sort_order"
              title="Socials"
              blank={{ image: "", caption: "", link: "", post_date: "", sort_order: 0 }}
              fields={[
                { key: "image", label: "AFBEELDING URL", wide: true },
                { key: "caption", label: "CAPTION", wide: true, type: "textarea" },
                { key: "link", label: "LINK", wide: true },
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
    const { error } = await supabase.from("site_about").update(row).eq("id", row.id as string);
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
  type?: "text" | "date" | "number" | "boolean" | "textarea";
  options?: [string, string][];
  wide?: boolean;
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
    const { error } = await supabase.from(table).update(payload).eq("id", row.id as string);
    onStatus(error ? `Fout: ${error.message}` : "Opgeslagen ✓");
    if (!error) await refresh();
  };

  const add = async () => {
    const payload = { ...blank };
    Object.keys(payload).forEach((k) => {
      if (payload[k] === "" && k.endsWith("_date")) payload[k] = null;
    });
    const { error } = await supabase.from(table).insert(payload);
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
