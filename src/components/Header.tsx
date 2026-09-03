import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Globe, ListChecks, Moon, Signal, Sprout, Sun, Wifi, WifiOff,
} from "lucide-react";
import { LANGS, type Lang, type NetworkMode } from "../types/crais";
import { T, t } from "../data/i18n";
import { ZONES } from "../data/agri";
import { NETWORK_MODES } from "../data/channels";

interface HeaderProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  net: NetworkMode;
  setNet: (n: NetworkMode) => void;
  zone: string;
  setZone: (z: string) => void;
  queueCount: number;
}

const NET_ICON = { "4g": Wifi, "2g": Signal, offline: WifiOff } as const;

export default function Header({ lang, setLang, theme, toggleTheme, net, setNet, zone, setZone, queueCount }: HeaderProps) {
  const [now, setNow] = useState(() => new Date());
  const [langOpen, setLangOpen] = useState(false);
  const [zoneOpen, setZoneOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  const NetIcon = NET_ICON[net];
  const clock = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const selZone = ZONES.find((z) => z.id === zone);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-500 text-white shadow-md shadow-emerald-900/20">
            <Sprout className="size-5" />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-extrabold tracking-tight">
              {t(T.brand, lang)}
              <span className="ml-1.5 rounded-md bg-accent/90 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-accent-foreground">
                Agri-Intel
              </span>
            </div>
            <div className="hidden text-[10px] font-medium text-muted-foreground sm:block">
              {t(T.brandFull, lang)}
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Live clock */}
          <div className="tabular hidden items-center gap-1.5 rounded-lg border border-border bg-muted/60 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground md:flex">
            <span className="size-1.5 rounded-full bg-emerald-500 pulse-dot" />
            EAT {clock}
          </div>

          {/* Agro-zone selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setZoneOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/60 px-2.5 py-1.5 text-xs font-semibold hover:bg-muted"
            >
              <span className="text-muted-foreground">{t(T.zoneLabel, lang)}</span>
              <span className="text-foreground">{selZone?.name ?? zone}</span>
              <ChevronDown className={`size-3.5 text-muted-foreground transition-transform ${zoneOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {zoneOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                  className="absolute right-0 top-full z-50 mt-1.5 w-60 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg"
                >
                  {ZONES.map((z) => (
                    <button
                      key={z.id}
                      onClick={() => { setZone(z.id); setZoneOpen(false); }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs ${zone === z.id ? "bg-emerald-600/10 font-semibold text-emerald-700 dark:text-emerald-300" : "hover:bg-muted"}`}
                    >
                      <span>{z.name}</span>
                      <span className="text-[10px] text-muted-foreground">{z.country} · {z.altM}m</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Network simulator */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/60 p-1">
            <span className="hidden pl-1.5 pr-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground lg:block">
              {t(T.connectivity, lang)}
            </span>
            {NETWORK_MODES.map((m) => {
              const active = net === m.id;
              const ModeIcon = NET_ICON[m.id];
              return (
                <button
                  key={m.id}
                  onClick={() => { setNet(m.id); }}
                  title={t(T[m.labelKey], lang)}
                  className={`relative flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-bold transition-colors ${active ? "bg-background text-emerald-700 shadow-sm dark:text-emerald-300" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <ModeIcon className={`size-3.5 ${net === "offline" ? "text-orange-500" : ""}`} />
                  <span className="hidden sm:inline">{m.id === "4g" ? "4G/5G" : m.id === "2g" ? "2G" : "OFF"}</span>
                  {net === "offline" && active && (
                    <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-orange-500 text-[8px] font-black text-white">
                      {queueCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/60 px-2.5 py-1.5 text-xs font-bold hover:bg-muted"
            >
              <Globe className="size-3.5 text-emerald-700 dark:text-emerald-300" />
              <span>{LANGS.find((l) => l.code === lang)?.native}</span>
              <ChevronDown className={`size-3.5 text-muted-foreground transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                  className="absolute right-0 top-full z-50 mt-1.5 w-44 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg"
                >
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs ${lang === l.code ? "bg-emerald-600/10 font-semibold text-emerald-700 dark:text-emerald-300" : "hover:bg-muted"}`}
                    >
                      <span className={l.code === "am" || l.code === "ti" ? "text-sm" : ""}>{l.native}</span>
                      <span className="text-[10px] uppercase text-muted-foreground">{l.en}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex size-8 items-center justify-center rounded-lg border border-border bg-muted/60 hover:bg-muted"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4 text-emerald-800" />}
          </button>
        </div>
      </div>

      {/* Queue strip */}
      <AnimatePresence>
        {net === "offline" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-orange-500/20 bg-orange-500/10"
          >
            <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-1.5 text-[11px] font-semibold text-orange-800 dark:text-orange-300">
              <ListChecks className="size-3.5" />
              {queueCount} {t(T.queueCount, lang)} · *384*55# USSD + SMS operate offline
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}