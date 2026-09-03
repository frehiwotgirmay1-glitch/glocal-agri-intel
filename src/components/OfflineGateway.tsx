import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownToLine, Check, CheckCircle2, ChevronRight, Clock, Database,
  ListChecks, MessageSquare, Phone, Play, Radio, RefreshCw, Signal, Smartphone,
  TriangleAlert, Upload, Wifi, WifiOff,
} from "lucide-react";
import type { Lang, NetworkMode } from "../types/crais";
import { t } from "../data/i18n";
import {
  CREDIT_BANDS, IVR_PROMPTS, IVR_PROMPT_KEYS, NETWORK_MODES, OFFLINE_QUEUE,
  OFFLINE_STATS, SMS_COMMANDS, SMS_LOG, USSD_TREE,
} from "../data/channels";
import { panel, PanelHeader, Tag, Bar } from "./ui/common";
import { MarketListingForm, FinancialSimulator } from "./InputModals";

const NET_ICON = { "4g": Wifi, "2g": Signal, offline: WifiOff } as const;
const OP_ICON = { USSD: Smartphone, SMS: MessageSquare, VC: Phone } as const;
const OP_TONE = { USSD: "bg-violet-600/10 text-violet-700 border-violet-600/30", SMS: "bg-emerald-600/10 text-emerald-700 border-emerald-600/30", VC: "bg-amber-600/10 text-amber-700 border-amber-600/30" } as const;

export default function OfflineGateway({ lang, net }: { lang: Lang; net: NetworkMode }) {
  const [nodeId, setNodeId] = useState(USSD_TREE[0].id);
  const [dialLang, setDialLang] = useState<Lang>("en");
  const [smsIn, setSmsIn] = useState(SMS_LOG);
  const [smsInput, setSmsInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [ivrIdx, setIvrIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [tab, setTab] = useState<"queue" | "history">("queue");

  const node = USSD_TREE.find((n) => n.id === nodeId) ?? USSD_TREE[0];
  const credits = CREDIT_BANDS.map((b) => ({
    ...b,
    n: b.key === "excellent" ? 128 : b.key === "good" ? 76 : b.key === "medium" ? 31 : 44,
    pct: b.key === "excellent" ? 100 : b.key === "good" ? 62 : b.key === "medium" ? 24 : 36,
  }));
  const smsReply = (cmd: string) => SMS_COMMANDS.find((c) => c.cmd.toLowerCase() === cmd.trim().toLowerCase())?.reply ?? SMS_COMMANDS[5].reply;

  const sendSms = () => {
    const cmd = smsInput.trim();
    if (!cmd) return;
    setTyping(true);
    setSmsInput("");
    setTimeout(() => {
      setTyping(false);
      setSmsIn((m) => [...m, { text: cmd, class: "sent", time: "now" }, { text: smsReply(cmd)[lang] ?? smsReply(cmd).en, class: "received", time: "now" }]);
    }, 700);
  };

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {/* ---- Connection status ---- */}
      <div className={`${panel} xl:col-span-2`}>
        <PanelHeader
          icon={Smartphone}
          title="Field connectivity booster"
          sub="USSD · SMS · IVR · offline queue — works from 2G to no signal"
          right={<Tag tone={net === "offline" ? "amber" : "emerald"}>{net === "offline" ? "QUEUE ACTIVE" : "LIVE"}</Tag>}
        />
        <div className="flex flex-wrap items-center gap-2">
          {NETWORK_MODES.map((m) => {
            const active = net === m.id;
            const ModeIcon = NET_ICON[m.id];
            return (
              <button
                key={m.id}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${active ? "border-emerald-700/40 bg-emerald-700 text-white shadow-md shadow-emerald-900/20 dark:bg-emerald-500 dark:text-emerald-950" : "border-border bg-background/50 text-muted-foreground"}`}
              >
                <ModeIcon className={`size-4 ${m.id === "offline" && !active ? "text-orange-500" : ""}`} />
                {m.id === "4g" ? "4G / 5G" : m.id === "2g" ? "2G " : "Offline"}
                <span className={`text-[9px] font-black uppercase ${active ? "text-white/80" : "text-muted-foreground"}`}>
                  {m.id === "offline" ? "GPRS/EDGE · USSD OK" : "Radar + video OK"}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 grid gap-2 text-[11px] sm:grid-cols-3">
          {[
            ["Weighted message", "~22 KB", "USSD payload optimized"],
            ["Sync savings", "−94%", "delta-only over GPRS"],
            ["Coverage", "97%", "EA + Horn of Africa"],
          ].map(([k, v, s]) => (
            <div key={k} className="rounded-xl border border-border bg-background/50 px-3 py-2">
              <div className="text-muted-foreground">{k}</div>
              <div className="tabular text-sm font-black text-emerald-700 dark:text-emerald-300">{v}</div>
              <div className="text-[10px] text-muted-foreground">{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- USSD simulator ---- */}
      <div className={panel}>
        <PanelHeader
          icon={Smartphone}
          title="USSD simulator"
          sub="Dial *384*55# · zero data required"
          right={
            <select value={dialLang} onChange={(e) => setDialLang(e.target.value as Lang)} className="rounded-md border border-border bg-background px-2 py-1 text-[11px] font-semibold">
              {([["en", "EN"], ["sw", "SW"], ["am", "AM"], ["ti", "TI"]] as [Lang, string][]).map(([c, n]) => <option key={c} value={c}>{n}</option>)}
            </select>
          }
        />
        <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-emerald-900 to-emerald-950 text-emerald-50 shadow-inner">
          <div className="flex items-center justify-between border-b border-emerald-800/60 px-3 py-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">CRAIS · {net === "offline" ? "offline voice data" : "USSD"}</span>
            <span className="flex items-center gap-1 text-[9px] text-emerald-400"><Signal className="size-3" /> *384*55#</span>
          </div>
          <div className="min-h-[150px] px-3 py-3">
            <AnimatePresence mode="wait">
              <motion.div key={node.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
                <p className="whitespace-pre-line text-[12px] leading-relaxed text-emerald-100">{node.title[dialLang]}</p>
                <div className="mt-2 space-y-1">
                  {node.options.map((o, i) => (
                    <button
                      key={i}
                      onClick={() => setNodeId(o.next)}
                      className="flex w-full items-center gap-2 rounded-lg bg-emerald-800/40 px-2.5 py-1.5 text-left text-[11px] text-emerald-50 transition-colors hover:bg-emerald-700/50"
                    >
                      <span className="font-black text-emerald-300">{i + 1}.</span>
                      <span className="flex-1">{o.label[dialLang]}</span>
                      <ChevronRight className="size-3.5 text-emerald-400" />
                    </button>
                  ))}
                </div>
                <div className="mt-2 rounded-lg bg-black/30 px-2.5 py-1.5 text-[10px] text-emerald-300">
                  {node.sms?.[dialLang]}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="border-t border-emerald-800/60 px-3 py-1.5 text-[9px] text-emerald-400">
            Reply · 0 KSh · served even when modern data is down
          </div>
        </div>
      </div>

      {/* ---- SMS gateway ---- */}
      <div className={panel}>
        <PanelHeader
          icon={MessageSquare}
          title="SMS gateway"
          sub="Keyword + SMS · 2G friendly"
          right={<Tag tone={net === "offline" ? "amber" : "emerald"}>{net === "offline" ? "QUEUED" : "SENT"}</Tag>}
        />
        <div className="overflow-y-auto rounded-xl border border-border bg-background/50 p-3" style={{ minHeight: 250, maxHeight: 290 }}>
          {smsIn.map((m, i) => (
            <div key={i} className={`mb-2 flex ${m.class === "sent" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-3 py-1.5 text-[11px] leading-relaxed ${m.class === "sent" ? "rounded-br-sm bg-emerald-700 text-white" : "rounded-bl-sm border border-border bg-card"}`}>
                {m.text}
                <div className={`mt-0.5 text-right text-[9px] ${m.class === "sent" ? "text-emerald-200" : "text-muted-foreground"}`}>{m.time}</div>
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-border bg-card px-3 py-2">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="size-1.5 animate-bounce rounded-full bg-emerald-500" style={{ animationDelay: `${d * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            value={smsInput}
            onChange={(e) => setSmsInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendSms()}
            placeholder='Try "PRICE MAIZE", "WEATHER", "SOIL", "HELP"…'
            className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50"
          />
          <button onClick={sendSms} className="flex size-9 items-center justify-center rounded-xl bg-emerald-700 text-white hover:bg-emerald-600">
            <Play className="size-4" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {SMS_COMMANDS.slice(0, 5).map((c) => (
            <button key={c.cmd} onClick={() => { setSmsInput(c.cmd); }} className="rounded-full border border-border bg-background/60 px-2 py-0.5 text-[10px] font-bold text-muted-foreground hover:border-emerald-600/40 hover:text-foreground">
              {c.cmd}
            </button>
          ))}
        </div>
      </div>

      {/* ---- IVR ---- */}
      <div className={panel}>
        <PanelHeader icon={Phone} title="IVR voice service" sub="Local-language audio · toll-free" />
        <div className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-3">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white transition-transform hover:scale-105"
          >
            {playing ? <span className="flex gap-0.5">{[0, 1, 2].map((i) => <span key={i} className="wave-bar h-3 w-0.5 rounded-full bg-white" />)}</span> : <Play className="size-4" />}
          </button>
          <div className="flex-1">
            <div className="text-[11px] font-bold">{IVR_PROMPT_KEYS[ivrIdx] === "welcome" ? "Welcome prompt" : "Weather brief"}</div>
            <div className="mt-1 flex h-1.5 items-center gap-[2px]">
              {Array.from({ length: 32 }).map((_, i) => (
                <span key={i} className={`flex-1 rounded-full ${i < 18 ? "bg-emerald-500" : "bg-muted"}`} style={{ height: 4 + ((i * 7) % 6) }} />
              ))}
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground">00:24 / 00:41 · {IVR_PROMPTS[ivrIdx][lang] ? "local" : "EN"}</div>
          </div>
        </div>
        <div className="mt-2 rounded-xl border border-border bg-background/50 p-2.5 text-[11px] leading-relaxed text-muted-foreground">
          {IVR_PROMPTS[ivrIdx][lang]?.slice(0, 190)}…
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground">Dial-in 0800 38 55 (KE) · 8001 (ET) · 40+ languages supported via TTS + studio voices</p>
      </div>

      {/* ---- Offline sync ---- */}
      <div className={panel}>
        <PanelHeader
          icon={Database}
          title="Offline-first sync"
          sub="SQLite on device · delta sync"
          right={
            <div className="flex gap-1 rounded-lg border border-border p-0.5">
              {(["queue", "history"] as const).map((tb) => (
                <button key={tb} onClick={() => setTab(tb)} className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase ${tab === tb ? "bg-emerald-700 text-white" : "text-muted-foreground"}`}>
                  {tb}
                </button>
              ))}
            </div>
          }
        />
        {tab === "queue" ? (
          <div className="space-y-2">
            {OFFLINE_QUEUE.map((q) => {
              const OpIcon = OP_ICON[q.op];
              return (
                <div key={q.id} className="flex items-center gap-2 rounded-xl border border-border bg-background/50 px-3 py-2">
                  <span className={`flex size-8 items-center justify-center rounded-lg border ${OP_TONE[q.op]}`}>
                    <OpIcon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[11px] font-bold">{q.summary}</div>
                    <div className="text-[10px] text-muted-foreground">{q.op} → {q.target}</div>
                  </div>
                  <div className="text-right">
                    <span className="tabular text-[10px] font-bold text-orange-500">{q.ts}</span>
                    <div className="flex items-center gap-0.5 text-[9px] font-semibold text-muted-foreground"><Clock className="size-2.5" /> retry 4m</div>
                  </div>
                </div>
              );
            })}
            <div className="flex items-center justify-between rounded-xl border border-orange-500/30 bg-orange-500/5 px-3 py-2 text-[11px] font-semibold text-orange-700 dark:text-orange-300">
              <span className="flex items-center gap-1.5"><TriangleAlert className="size-3.5" /> 1 conflict detected (price quote)</span>
              <button className="rounded-md bg-orange-600 px-2 py-1 text-[10px] font-bold text-white">Resolve</button>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5 text-[11px]">
            {[
              ["Yields · Nakuru 4B", 42, "ok"], ["Soil samples", 9, "ok"], ["Weather cache", 14, "ok"], ["Insights v18", 1, "new"],
            ].map(([k, v, st]) => (
              <div key={k as string} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-2 py-1.5">
                <span className="font-bold">{k}</span>
                <span className="tabular text-muted-foreground">{v} rows</span>
                {st === "ok" ? <CheckCircle2 className="size-4 text-emerald-500" /> : <Tag tone="emerald">new</Tag>}
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            ["Pending", OFFLINE_STATS.pending, "text-orange-500"],
            ["Synced", OFFLINE_STATS.synced, "text-emerald-600"],
            ["Last sync", OFFLINE_STATS.lastSync, "text-muted-foreground"],
          ].map(([k, v, cls]) => (
            <div key={k as string} className="rounded-lg border border-border bg-background/40 p-2 text-center">
              <div className={`tabular text-lg font-black ${cls}`}>{v}</div>
              <div className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground">{k}</div>
            </div>
          ))}
        </div>
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-2 text-xs font-bold text-white hover:bg-emerald-600">
          <RefreshCw className="size-3.5" /> Sync now
        </button>
      </div>

      {/* ---- Input credits ---- */}
      <div className={`${panel} xl:col-span-2`}>
        <PanelHeader icon={ListChecks} title="Input credit allocation" sub="Season A · triggered by resilience score" />
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {credits.map((c) => (
            <div key={c.key} className="rounded-xl border border-border bg-background/50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold">{c.label}</span>
                <Tag tone={c.key === "excellent" || c.key === "good" ? "emerald" : c.key === "low" ? "muted" : "amber"}>{c.key}</Tag>
              </div>
              <div className="tabular mt-1.5 text-lg font-black">{c.n} <span className="text-[10px] font-semibold text-muted-foreground">farmers</span></div>
              <div className="mt-1.5"><Bar value={c.pct} max={100} tone={c.key === "excellent" ? "emerald" : c.key === "low" ? "amber" : "sky"} /></div>
              <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>credit ≤ KSh {c.key === "excellent" ? "90k" : c.key === "good" ? "60k" : c.key === "medium" ? "30k" : "10k"}</span>
                <span className="flex items-center gap-0.5"><ArrowDownToLine className="size-3" /> {c.key === "excellent" ? "85+" : c.key === "good" ? "70+" : c.key === "medium" ? "50+" : "any"} score</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><Check className="size-3 text-emerald-600" /> USDA-style weighted score composite</span>
          <span className="flex items-center gap-1"><Check className="size-3 text-emerald-600" /> Applied at the till via USSD/SMS</span>
          <span className="flex items-center gap-1"><Radio className="size-3 text-emerald-600" /> Re-evaluated monthly via GPRS sync</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Modal Overlays                                                       */
/* ------------------------------------------------------------------ */
export function OfflineGatewayWithModals({ lang, net }: { lang: Lang; net: NetworkMode }) {
  const [showMarketListing, setShowMarketListing] = useState(false);
  const [showFinancialSim, setShowFinancialSim] = useState(false);

  return (
    <>
      <OfflineGateway lang={lang} net={net} />
      <AnimatePresence>
        {showMarketListing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowMarketListing(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl border border-border bg-background p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <MarketListingForm lang={lang} onClose={() => setShowMarketListing(false)} />
            </motion.div>
          </motion.div>
        )}
        {showFinancialSim && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowFinancialSim(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl border border-border bg-background p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <FinancialSimulator lang={lang} onClose={() => setShowFinancialSim(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}