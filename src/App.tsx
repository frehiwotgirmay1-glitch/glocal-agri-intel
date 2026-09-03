import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import {
  Bell, Bot, Bug, CloudRain, CloudSun, Database, FlaskConical, Globe, LayoutDashboard, Leaf,
  MapPin, Moon, Phone, Smartphone, Sparkles, Sun, TrendingUp, Users, Wifi, WifiOff,
} from "lucide-react";
import type { Lang, NetworkMode } from "./types/crais";
import { t, T } from "./data/i18n";
import { REGIONAL_ALERTS, ZONES } from "./data/agri";
import Header from "./components/Header";
import WeatherModule from "./components/WeatherModule";
import SoilModule from "./components/SoilModule";
import IntelligenceCenter from "./components/IntelligenceCenter";
import { FarmerModuleWithModals } from "./components/FarmerModule";
import { OfflineGatewayWithModals } from "./components/OfflineGateway";

const KPIS: { label: string; value: number; suffix: string; sub: string }[] = [
  { label: "Farmers onboarded", value: 12840, suffix: "+", sub: "across 3 nations" },
  { label: "Parcels mapped", value: 22310, suffix: "", sub: "satellite-fused" },
  { label: "Weather alerts", value: 34, suffix: "", sub: "this week" },
  { label: "Soil samples", value: 9412, suffix: "", sub: "lab-verified" },
  { label: "Pest reports", value: 512, suffix: "", sub: "last 30 days" },
  { label: "Crops monitored", value: 46, suffix: "", sub: "yield models live" },
];

type LiveItem = { ts: string; tone: "pest" | "market" | "weather"; title: string; body: string };
const LIVE_FEED: LiveItem[] = [
  { ts: "09:12", tone: "pest", title: "Fall armyworm scouted", body: "Nakuru East · 3 fields flagged — SMS advisory sent." },
  { ts: "08:47", tone: "market", title: "Maize price 12% up", body: "Karatina hub · KES 3,840/bag, best since April." },
  { ts: "08:02", tone: "weather", title: "Long rains onset", body: "Zone 4B · west Kenya. Recommended: top-dress urea." },
  { ts: "07:30", tone: "market", title: "Fertilizer subsidy live", body: "DAP at KES 2,500/bag via e-voucher in 6 counties." },
  { ts: "06:58", tone: "pest", title: "Locust swarm tracked", body: "Borena corridor — drone spray window opens 05:00." },
];

type View = "home" | "modules" | "ai" | "offline";
type Module = "farmer" | "weather" | "soil";

const MODULE_TABS: { id: Module; label: string; icon: typeof Users; desc: string }[] = [
  { id: "farmer", label: "Farmer & Farm Data", icon: Users, desc: "Profiles, parcels, soil history, yields & input use" },
  { id: "weather", label: "Weather Intelligence", icon: CloudSun, desc: "Forecasts, drought & flood alerts, field guidance" },
  { id: "soil", label: "Soil Intelligence", icon: FlaskConical, desc: "Fertility, pH, nutrients, moisture & fertilizer advice" },
];

const NET_STATE: Record<NetworkMode, { label: string; icon: typeof Wifi; cls: string }> = {
  "4g": { label: "4G · live radar", icon: Wifi, cls: "text-white bg-emerald-700" },
  "2g": { label: "2G · USSD/SMS", icon: Smartphone, cls: "text-amber-950 bg-amber-400" },
  offline: { label: "Offline queue", icon: WifiOff, cls: "text-white bg-orange-600" },
};

function CountUp({ to, suffix }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{v.toLocaleString()}{suffix}</span>;
}

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(() => typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches);
  const [zone, setZone] = useState("RiftValley");
  const [net, setNet] = useState<NetworkMode>("4g");
  const [view, setView] = useState<View>("home");
  const [module, setModule] = useState<Module>("farmer");
  const [feedIdx, setFeedIdx] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const id = setInterval(() => setFeedIdx((i) => (i + 1) % LIVE_FEED.length), 4200);
    return () => clearInterval(id);
  }, []);

  const kpis = useMemo(() => KPIS, []);
  const alerts = REGIONAL_ALERTS.slice(0, 4);
  const feed = LIVE_FEED[feedIdx];
  const NetBadge = NET_STATE[net];

  const switchView = (v: View) => {
    setView(v);
    if (v === "ai" && net === "offline") {
      toast.info("Some AI features cache and work offline via the local model pack.");
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <Header
        lang={lang}
        setLang={setLang}
        theme={dark ? "dark" : "light"}
        toggleTheme={() => setDark((d) => !d)}
        net={net}
        setNet={setNet}
        zone={zone}
        setZone={setZone}
        queueCount={12}
      />
      <Toaster position="top-center" richColors closeButton theme={dark ? "dark" : "light"} />

      <main className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden py-10 sm:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-72 max-w-3xl rounded-full bg-gradient-to-r from-emerald-500/20 via-sky-500/15 to-amber-400/20 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative mx-auto max-w-3xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-600/10 px-3 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
              <Sparkles className="size-3.5" />
              {t(T.brandFull, lang)}
            </div>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
              Decisions rooted
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent">
                in the field — literally.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              CRAIS fuses satellite weather models, soil labs, pest scouting, market prices and
              indigenous calendars into one low-bandwidth platform — so a maize farmer on 2G gets
              the same intelligence as a plantation in the cloud.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {([
                { k: t(T.navModules, lang), i: CloudSun, v: "modules" as View },
                { k: t(T.navAI, lang), i: Bot, v: "ai" as View },
                { k: t(T.navOffline, lang), i: Phone, v: "offline" as View },
              ]).map(({ k, i: Icon, v }) => (
                <button
                  key={v}
                  onClick={() => switchView(v)}
                  className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-600/40 hover:shadow-md"
                >
                  <Icon className="size-4 text-emerald-600 dark:text-emerald-300" />
                  {k}
                </button>
              ))}
            </div>
          </motion.div>

          {/* KPI band */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
            className="relative mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6"
          >
            {kpis.map((k) => (
              <div key={k.label} className="rounded-2xl border border-border bg-card/80 p-3 text-center shadow-sm backdrop-blur">
                <div className="tabular text-2xl font-black text-emerald-700 dark:text-emerald-300">
                  <CountUp to={k.value} suffix={k.suffix} />
                </div>
                <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{k.label}</div>
                <div className="text-[9px] text-muted-foreground/70">{k.sub}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ============ NAV ============ */}
        <nav className="sticky top-16 z-30 -mx-2 mb-4 flex gap-1 overflow-x-auto rounded-2xl border border-border bg-card/90 p-1.5 shadow-sm backdrop-blur">
          {([
            { id: "home" as View, label: t(T.navOverview, lang), icon: LayoutDashboard },
            { id: "modules" as View, label: t(T.navModules, lang), icon: Users },
            { id: "ai" as View, label: t(T.navAI, lang), icon: Bot },
            { id: "offline" as View, label: t(T.navOffline, lang), icon: Phone },
          ]).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => switchView(id)}
              className={`relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                view === id ? "text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {view === id && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-xl bg-emerald-700 shadow-md shadow-emerald-900/20 dark:bg-emerald-500" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <Icon className="relative z-10 size-4" />
              <span className="relative z-10">{label}</span>
            </button>
          ))}
          <span className="ml-auto hidden shrink-0 items-center self-center gap-1.5 rounded-xl border border-border bg-background/60 px-3 py-1.5 text-[11px] font-bold lg:flex">
            <span className={`flex size-2.5 items-center justify-center rounded-full ${NetBadge.cls}`}>
              <NetBadge.icon className="size-2" />
            </span>
            {NetBadge.label}
            <span className="text-muted-foreground">·</span>
            <MapPin className="size-3 text-emerald-600" />
            {ZONES.find((z) => z.id === zone)?.name}
          </span>
        </nav>

        {/* ============ VIEWS ============ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {view === "home" && (
              <div className="grid gap-4 lg:grid-cols-3">
                {/* Module cards */}
                <div className="space-y-4 lg:col-span-2">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {MODULE_TABS.map((m, i) => (
                      <motion.button
                        key={m.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.35, ease: "easeOut" }}
                        onClick={() => { setModule(m.id); setView("modules"); }}
                        className="group rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-600/40 hover:shadow-lg"
                      >
                        <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700 transition-colors group-hover:bg-emerald-700 group-hover:text-white dark:text-emerald-300">
                          <m.icon className="size-5" />
                        </span>
                        <div className="text-sm font-bold leading-tight">{m.label}</div>
                        <div className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{m.desc}</div>
                      </motion.button>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <LiveFeed feed={feed} />
                  </div>
                </div>

                {/* Alerts rail */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <Bell className="size-4 text-red-500" />
                    <span className="text-sm font-bold">Live alerts</span>
                    <span className="ml-auto flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-300">
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                      </span>
                      LIVE
                    </span>
                  </div>
                  <div className="space-y-2">
                    {alerts.map((a, i) => (
                      <div
                        key={a.id}
                        className={`flex gap-2.5 rounded-xl border p-2.5 ${
                          a.level === "critical"
                            ? "border-red-600/30 bg-red-600/5"
                            : a.level === "warning"
                              ? "border-amber-500/30 bg-amber-500/5"
                              : "border-sky-600/30 bg-sky-600/5"
                        }`}
                      >
                        {i < 2 ? <CloudRain className="size-3.5 shrink-0 text-sky-600" /> : <Leaf className="size-3.5 shrink-0 text-emerald-600" />}
                        <div className="min-w-0">
                          <div className="text-[11px] font-bold leading-tight">{t(T[a.titleKey], lang)}</div>
                          <div className="mt-0.5 text-[10px] text-muted-foreground">
                            {a.scope} · {ZONES.find((z) => z.id === a.zoneId)?.name ?? ""}
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => { setView("modules"); setModule("farmer"); }}
                      className="w-full rounded-xl border border-border bg-background/60 py-2 text-[11px] font-bold text-muted-foreground hover:border-emerald-600/40 hover:text-foreground"
                    >
                      View all in Farmer module
                    </button>
                  </div>
                </div>
              </div>
            )}

            {view === "modules" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {MODULE_TABS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setModule(m.id)}
                      className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-bold transition-all ${
                        module === m.id
                          ? "border-emerald-700/30 bg-emerald-700 text-white shadow-md shadow-emerald-900/20 dark:bg-emerald-500 dark:text-emerald-950"
                          : "border-border bg-card text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <m.icon className="size-4" />
                      {m.label}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={module}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {module === "farmer" && <FarmerModuleWithModals lang={lang} net={net} zone={zone} />}
                    {module === "weather" && <WeatherModule lang={lang} net={net} zone={zone} />}
                    {module === "soil" && <SoilModule lang={lang} net={net} zone={zone} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {view === "ai" && <IntelligenceCenter lang={lang} net={net} />}
            {view === "offline" && <OfflineGatewayWithModals lang={lang} net={net} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-border bg-card/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-8 text-center sm:px-6">
          <div className="flex items-center gap-2 text-sm font-black">
            <span className="flex size-6 items-center justify-center rounded-lg bg-emerald-700 text-white">
              <Leaf className="size-3.5" />
            </span>
            CRAIS · {t(T.brandFull, lang)}
          </div>
          <p className="max-w-xl text-[11px] leading-relaxed text-muted-foreground">
            Satellite models, soil labs, pest scouts, market prices and indigenous calendars —
            fused into <span className="font-bold text-emerald-700 dark:text-emerald-300">one contextually relevant decision</span>, delivered over USSD, SMS, IVR and the web.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-semibold text-muted-foreground">
            <span className="flex items-center gap-1"><Globe className="size-3" /> EN · SW · AM · TI · 40+</span>
            <span className="flex items-center gap-1"><Database className="size-3" /> Mecha-Ware Farming · 2025</span>
            <span className="flex items-center gap-1"><Leaf className="size-3" /> Carbon-neutral data grid</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LiveFeed({ feed }: { feed: (typeof LIVE_FEED)[number] }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={feed.ts}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -12 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex items-start gap-3"
      >
        <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${feed.tone === "pest" ? "bg-red-600/10 text-red-600" : feed.tone === "market" ? "bg-emerald-600/10 text-emerald-600" : "bg-sky-600/10 text-sky-600"}`}>
          {feed.tone === "pest" ? <Bug className="size-4" /> : feed.tone === "market" ? <TrendingUp className="size-4" /> : <CloudRain className="size-4" />}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">{feed.title}</span>
            <span className="tabular rounded bg-muted px-1.5 py-px text-[9px] font-bold text-muted-foreground">{feed.ts}</span>
          </div>
          <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{feed.body}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}