import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, Banknote, Bot, Bug, Coins, Landmark, Leaf, MessageCircle,
  Send, ShieldCheck, ShoppingBag, Sprout, TrendingDown, TrendingUp, Upload,
} from "lucide-react";
import type { Lang, NetworkMode } from "../types/crais";
import {
  BUYER_DEALS, BOT_CANNED, BOT_FIRST, CREDIT_PROFILE, CROP_STAGES, DEALERS,
  HUBS, MARKET_QUOTES, NDVI_SERIES, NBA_ACTIONS, PESTS, PROMPT_CHIPS,
  SEASON_CALENDAR, SOIL_SAMPLES, WISDOM_RECORDS,
} from "../data/agri";
import { T, t } from "../data/i18n";
import { panel, PanelHeader, Bar, Tag, moduleTabs } from "./ui/common";
import { PestReportForm, CropSeasonLogger } from "./InputModals";

type View = "crop" | "pest" | "market" | "copilot" | "finance" | "wisdom";

const GOOD_BAD = (v: number) =>
  <span className={`tabular font-bold ${v >= 0 ? "text-emerald-600 dark:text-emerald-300" : "text-red-500"}`}>{v >= 0 ? "+" : ""}{v}%</span>;

function Sparkline({ data }: { data: number[] }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${38 - ((v - min) / ((max - min) || 1)) * 32}`).join(" ");
  const up = data[data.length - 1] >= data[0];
  return (
    <svg viewBox="0 0 100 40" className="h-9 w-full">
      <polyline points={pts} fill="none" stroke={up ? "var(--chart-4)" : "var(--chart-5)"} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function IntelligenceCenter({ lang, net }: { lang: Lang; net: NetworkMode }) {
  const [view, setView] = useState<View>("crop");
  const [cropSel, setCropSel] = useState("Maize");
  const [pestSel, setPestSel] = useState(PESTS[0].id);
  const [hubSel, setHubSel] = useState(HUBS[0]);
  const [msgs, setMsgs] = useState<{ role: "bot" | "user"; text: string }[]>([{ role: "bot", text: BOT_FIRST[lang] }]);
  const [input, setInput] = useState("");
  const [wisdomGroup, setWisdomGroup] = useState("All");
  const [showPestReport, setShowPestReport] = useState(false);
  const [showCropSeason, setShowCropSeason] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    const canned = BOT_CANNED[input.trim().toLowerCase()]?.[0] ?? BOT_CANNED.weather[0];
    setMsgs((m) => [...m, { role: "user", text: input.trim() }, { role: "bot", text: canned[lang] ?? canned.en }]);
    setInput("");
  };

  const stages = CROP_STAGES[cropSel] ?? CROP_STAGES["Maize"];
  const ndvi = NDVI_SERIES[cropSel] ?? NDVI_SERIES["Maize"];
  const quotes = MARKET_QUOTES.filter((q) => q.hub === hubSel || hubSel === "Nairobi");

  const tabDefs: { id: View; label: string; icon: typeof Bot }[] = [
    { id: "crop", label: "Crop", icon: Sprout },
    { id: "pest", label: "Pest & Disease", icon: Bug },
    { id: "market", label: "Market", icon: TrendingUp },
    { id: "copilot", label: "AI Copilot", icon: Bot },
    { id: "finance", label: "Finance & Inputs", icon: Landmark },
    { id: "wisdom", label: "Wisdom", icon: Leaf },
  ];

  return (
    <div className="space-y-4">
      <motion.div layout className="flex flex-wrap gap-2">
        {moduleTabs(tabDefs, view, (id) => setView(id as View))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2, ease: "easeOut" }}>

          {/* ============ CROP INTELLIGENCE ============ */}
          {view === "crop" && (
            <div className="grid gap-4 lg:grid-cols-3">
              <div className={`${panel} lg:col-span-2`}>
                <PanelHeader icon={Sprout} title="Crop Intelligence" sub="Phenology · NDVI · yield forecast" right={
                  <select value={cropSel} onChange={(e) => setCropSel(e.target.value)} className="rounded-md border border-border bg-background px-2 py-1 text-[11px] font-semibold">
                    {Object.keys(CROP_STAGES).map((c) => <option key={c}>{c}</option>)}
                  </select>
                } />
                <div className="space-y-2">
                  {stages.map((s) => (
                    <div key={s.key} className={`flex items-center gap-3 rounded-xl border p-2.5 ${s.active ? "border-emerald-600/40 bg-emerald-600/5" : "border-border bg-background/50"}`}>
                      <span className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black ${s.active ? "bg-emerald-700 text-white" : "bg-muted text-muted-foreground"}`}>
                        {s.key.toUpperCase()}
                      </span>
                      <div className="w-24">
                        <div className="text-[11px] font-bold">{s.label}</div>
                        <div className="text-[10px] tabular text-muted-foreground">BBCH {s.bbch}</div>
                      </div>
                      <div className="hidden flex-1 sm:block">
                        <div className="relative h-1.5 rounded-full bg-muted">
                          <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" style={{ width: `${stagePct(s.from, s.to)}%` }} />
                        </div>
                      </div>
                      <div className="ml-auto tabular text-right text-[10px] text-muted-foreground">
                        {s.from} → {s.to}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-xl border border-border bg-background/60 p-3">
                  <div className="mb-1 flex justify-between text-[11px] font-semibold text-muted-foreground">
                    <span>NDVI · vegetation vigour</span>
                    <span className="text-emerald-600 dark:text-emerald-300">current 0.42</span>
                  </div>
                  <div className="flex h-16 items-end gap-2">
                    {ndvi.map((r, i) => (
                      <div key={r.label} className="flex flex-1 flex-col items-center gap-1">
                        <div className="w-full max-w-6 rounded-t-md bg-emerald-500" style={{ height: `${r.value * 90}px` }} />
                        <span className="tabular text-[9px] text-muted-foreground">{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className={panel}>
                  <PanelHeader icon={TrendingUp} title="Yield forecast" sub="Maize · 2.4 ha block" />
                  <div className="tabular text-3xl font-black text-emerald-700 dark:text-emerald-300">4.2 t/ha</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">± 0.6 t (85% CI) · baseline 3.1 t</div>
                  <div className="mt-3 space-y-1.5 text-[11px]">
                    {[
                      ["Fertilizer on time", +22], ["Moisture deficit @ flowering", -14], ["Armyworm pressure", -18], ["Legume rotation", +9],
                    ].map(([k, v]) => (
                      <div key={k as string} className="flex items-center justify-between">
                        <span className="text-muted-foreground">{k}</span>
                        {GOOD_BAD(v as number)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={panel}>
                  <PanelHeader icon={Sprout} title="Season calendar" sub={cropSel} />
                  <div className="space-y-1">
                    {(SEASON_CALENDAR[cropSel] ?? SEASON_CALENDAR["Maize"]).map((s) => (
                      <div key={s.month} className="flex gap-2 rounded-lg border border-border/60 bg-background/40 px-2 py-1.5">
                        <span className="w-8 text-[10px] font-black text-emerald-700 dark:text-emerald-300">{s.month}</span>
                        <span className="text-[11px] text-foreground/90">{s.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============ PEST & DISEASE ============ */}
          {view === "pest" && (
            <div className="grid gap-4 lg:grid-cols-3">
              <div className={`${panel} lg:col-span-2`}>
                <PanelHeader icon={Bug} title="Detected threats" sub={`${PESTS.length} monitored · AI vision + scout reports`} />
                <div className="grid gap-2 sm:grid-cols-2">
                  {PESTS.map((p) => (
                    <button key={p.id} onClick={() => setPestSel(p.id)} className={`rounded-xl border p-3 text-left transition-all ${pestSel === p.id ? "border-red-500/50 bg-red-500/5" : "border-border bg-background/50 hover:border-red-500/30"}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{p.name}</span>
                        <Tag tone={p.severity === "high" ? "red" : p.severity === "medium" ? "amber" : "sky"}>{p.severity}</Tag>
                      </div>
                      <div className="mt-1 text-[10px] text-muted-foreground">{p.crop} · confidence {p.confidence}%</div>
                      {pestSel === p.id && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 space-y-1.5 border-t border-border/60 pt-2">
                          {p.symptoms.map((s) => (
                            <div key={s} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                              <span className="size-1 rounded-full bg-red-500" /> {s}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className={panel}>
                  <PanelHeader icon={ShieldCheck} title="Treatment protocol" sub={PESTS.find((p) => p.id === pestSel)?.name} />
                  <div className="space-y-2.5 text-[11px]">
                    <div>
                      <div className="mb-1 font-bold text-emerald-700 dark:text-emerald-300">Chemical</div>
                      <p className="leading-relaxed text-muted-foreground">{PESTS.find((p) => p.id === pestSel)?.chemical}</p>
                    </div>
                    <div>
                      <div className="mb-1 font-bold text-emerald-700 dark:text-emerald-300">Biological / organic</div>
                      <p className="leading-relaxed text-muted-foreground">{PESTS.find((p) => p.id === pestSel)?.bio}</p>
                    </div>
                    <div>
                      <div className="mb-1 font-bold text-emerald-700 dark:text-emerald-300">Prevention</div>
                      <p className="leading-relaxed text-muted-foreground">{PESTS.find((p) => p.id === pestSel)?.prevention}</p>
                    </div>
                  </div>
                </div>
                <div className={panel}>
                  <div className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-border p-4 text-[11px] font-semibold text-muted-foreground">
                    <Upload className="size-4" /> Upload leaf photo for AI diagnosis
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============ MARKET INTELLIGENCE ============ */}
          {view === "market" && (
            <div className="grid gap-4 lg:grid-cols-3">
              <div className={`${panel} lg:col-span-2`}>
                <PanelHeader icon={TrendingUp} title="Market quotes" sub="Regional hubs · live" right={
                  <select value={hubSel} onChange={(e) => setHubSel(e.target.value)} className="rounded-md border border-border bg-background px-2 py-1 text-[11px] font-semibold">
                    {HUBS.map((h) => <option key={h}>{h}</option>)}
                  </select>
                } />
                <div className="space-y-2">
                  {quotes.slice(0, 6).map((q) => (
                    <div key={q.id} className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-xl border border-border bg-background/50 px-3 py-2 sm:grid-cols-[1.2fr_0.8fr_auto]">
                      <div>
                        <div className="text-xs font-bold">{q.crop}</div>
                        <div className="text-[10px] text-muted-foreground">{q.hub}, {q.country} · <Tag tone={q.season === "peak" ? "emerald" : q.season === "mid" ? "amber" : "muted"}>{q.season} season</Tag></div>
                      </div>
                      <div className="hidden sm:block"><Sparkline data={q.trend} /></div>
                      <div className="text-right">
                        <div className="tabular text-base font-black">KSh {q.price}</div>
                        <div className={`tabular text-[10px] font-bold ${q.change24 >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                          {q.change24 >= 0 ? "▲" : "▼"} {Math.abs(q.change24)}% 24h
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className={panel}>
                  <PanelHeader icon={ShoppingBag} title="Buyer deals" sub="Premium bids" />
                  {BUYER_DEALS.map((b) => (
                    <div key={b.id} className="mb-2 flex items-center justify-between rounded-xl border border-emerald-600/20 bg-emerald-600/5 px-3 py-2">
                      <div>
                        <div className="text-[11px] font-bold">{b.buyer}</div>
                        <div className="text-[10px] text-muted-foreground">{b.qtyT} t {b.crop} · {b.hub} · valid {b.validityDays}d</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="tabular text-sm font-black text-emerald-700 dark:text-emerald-300">KSh {b.price}</span>
                        <ArrowUpRight className="size-3.5 text-emerald-600" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className={panel}>
                  <PanelHeader icon={Banknote} title="CRAIS advisory" sub="Sell window" />
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Nairobi millers bid KSh 55/kg (2.4% above spot). Graded maize to Eastern Grain Millers nets <b className="text-emerald-700 dark:text-emerald-300">+6.2%</b> vs farm-gate. Hold Teff to mid-season peak.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ============ AI COPILOT ============ */}
          {view === "copilot" && (
            <div className="grid gap-4 lg:grid-cols-3">
              <div className={`${panel} flex flex-col lg:col-span-2`}>
                <PanelHeader icon={Bot} title="ShambaGPT" sub="Agronomy copilot · 4 languages" right={<Tag tone="emerald">LLM + RAG on farm data</Tag>} />
                <div className="flex-1 space-y-3 overflow-y-auto rounded-xl border border-border bg-background/50 p-3" style={{ minHeight: 260, maxHeight: 360 }}>
                  {msgs.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed ${m.role === "user" ? "rounded-br-sm bg-emerald-700 text-white" : "rounded-bl-sm border border-border bg-card"}`}>
                        {m.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {PROMPT_CHIPS.map((c) => (
                    <button key={c.key} onClick={() => setInput(c.text)} className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground hover:border-emerald-600/40 hover:text-foreground">
                      {c.text.length > 34 ? c.text.slice(0, 33) + "…" : c.text}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Ask in EN / SW / AM / TI…"
                    className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50"
                  />
                  <button onClick={send} className="flex size-9 items-center justify-center rounded-xl bg-emerald-700 text-white hover:bg-emerald-600">
                    <Send className="size-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div className={panel}>
                  <PanelHeader icon={Coins} title="Next-best actions" sub="Ranked by ROI · today" />
                  <div className="space-y-2">
                    {NBA_ACTIONS.map((a, i) => (
                      <div key={a.id} className="rounded-xl border border-border bg-background/50 p-2.5">
                        <div className="flex items-center gap-2">
                          <span className="flex size-5 items-center justify-center rounded-full bg-emerald-700 text-[10px] font-black text-white">{i + 1}</span>
                          <span className="text-[11px] font-bold">{t(T[a.titleKey], lang)}</span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-2 text-[10px] text-muted-foreground">
                          <Tag tone={a.tag === "pest" ? "red" : a.tag === "soil" ? "amber" : "emerald"}>{a.tag}</Tag>
                          <span>impact {GOOD_BAD(a.impact)}</span><span className="tabular">ROI KSh {a.roi.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={panel}>
                  <PanelHeader icon={BudgetIcon} title="Why now?" sub="Model reasoning" />
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {NBA_ACTIONS[0].reasons.join(" · ")}. Decision engine fused soil lab (12d), satellite NDVI, and 5-day rainfall radar at 06:00 EAT.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ============ FINANCE & INPUTS ============ */}
          {view === "finance" && (
            <div className="grid gap-4 lg:grid-cols-3">
              <div className={`${panel} lg:col-span-2`}>
                <PanelHeader icon={Landmark} title="Input marketplace" sub="Verified dealers · stock status" />
                <div className="space-y-2">
                  {DEALERS.map((d) => (
                    <div key={d.id} className="rounded-xl border border-border bg-background/50 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700">
                            <ShoppingBag className="size-3.5" />
                          </span>
                          <div>
                            <div className="text-xs font-bold">{d.name}</div>
                            <div className="text-[10px] text-muted-foreground">{d.town}</div>
                          </div>
                        </div>
                        <Tag tone={d.stock ? "emerald" : "amber"}>{d.stock ? "In stock" : "Limited"}</Tag>
                      </div>
                      <div className="mt-2 grid gap-1.5 sm:grid-cols-3">
                        {d.items.map((it) => (
                          <div key={it.name} className="rounded-lg border border-border/60 bg-background/40 px-2 py-1.5">
                            <div className="text-[10px] font-bold">{it.name}</div>
                            <div className="tabular text-[10px] text-muted-foreground">KSh {it.price.toLocaleString()}/{it.unit}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className={panel}>
                  <PanelHeader icon={Coins} title="Credit profile" sub="Grace Wanjiru" />
                  <div className="flex items-end gap-2">
                    <span className="tabular text-4xl font-black text-emerald-700 dark:text-emerald-300">{CREDIT_PROFILE.score}</span>
                    <span className="mb-1 text-[11px] font-bold uppercase text-muted-foreground">{CREDIT_PROFILE.band} band</span>
                  </div>
                  <div className="mt-1.5"><Bar value={CREDIT_PROFILE.score} max={100} /></div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="rounded-lg border border-border bg-background/40 p-2">
                      <div className="text-muted-foreground">Max input credit</div>
                      <div className="tabular font-black">KSh {CREDIT_PROFILE.maxLoan.toLocaleString()}</div>
                    </div>
                    <div className="rounded-lg border border-border bg-background/40 p-2">
                      <div className="text-muted-foreground">Rate / yr</div>
                      <div className="tabular font-black">{CREDIT_PROFILE.rate}%</div>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    {CREDIT_PROFILE.factors.map((f) => (
                      <div key={f.label} className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">{f.label}</span>
                        <span className={`font-bold ${f.good ? "text-emerald-600" : "text-amber-500"}`}>{f.good ? "✓" : "△"}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={panel}>
                  <PanelHeader icon={ShieldCheck} title="Index insurance" sub="Weather auto-trigger" />
                  <div className="space-y-1.5 text-[11px]">
                    {[
                      ["Maize (2015A)", 120, "active"],
                      ["Sorghum (2015A)", 85, "active"],
                      ["Wheat (2014B)", 160, "claimed"],
                    ].map(([crop, cov, st]) => (
                      <div key={crop as string} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-2 py-1.5">
                        <span className="font-bold">{crop}</span>
                        <span className="tabular text-muted-foreground">KSh {cov}k</span>
                        <Tag tone={(st as string) === "claimed" ? "sky" : "emerald"}>{st as string}</Tag>
                      </div>
                    ))}
                    <p className="pt-1 text-[10px] text-muted-foreground">Rainfall index &gt; 240 mm trigger · payout in 72h</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============ INDIGENOUS WISDOM ============ */}
          {view === "wisdom" && (
            <div className="grid gap-4 lg:grid-cols-3">
              <div className={`${panel} lg:col-span-2`}>
                <PanelHeader icon={Leaf} title="Indigenous knowledge bank" sub="Validated + digitised" right={
                  <select value={wisdomGroup} onChange={(e) => setWisdomGroup(e.target.value)} className="rounded-md border border-border bg-background px-2 py-1 text-[11px] font-semibold">
                    <option>All</option><option>Indicator</option><option>Practice</option><option>Calendar</option>
                  </select>
                } />
                <div className="grid gap-2 sm:grid-cols-2">
                  {WISDOM_RECORDS.filter((w) => wisdomGroup === "All" || w.group === wisdomGroup).map((w) => (
                    <div key={w.id} className="rounded-xl border border-border bg-background/50 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{w.title}</span>
                        <Tag tone={w.group === "Indicator" ? "sky" : w.group === "Practice" ? "emerald" : "amber"}>{w.group}</Tag>
                      </div>
                      <p className="mt-1.5 text-[10px] leading-relaxed text-muted-foreground">{w.text}</p>
                      <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
                        <span>{w.region}</span><span className="italic">{w.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className={panel}>
                  <PanelHeader icon={Sprout} title="Fusion engine" sub="Modern × traditional" />
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Weather models and indigenous calendars agree: <b className="text-emerald-700 dark:text-emerald-300">sowing in the waxing moon of April</b> (+9% emergence). Acacia flowering corroborates short-rains onset ± 4 days.
                  </p>
                </div>
                <div className={panel}>
                  <PanelHeader icon={MessageCircle} title="Field agents" sub="52 verified" />
                  <div className="space-y-1.5 text-[11px]">
                    {[
                      ["Kisii elders · rain", "3 regions"], ["Sukuma herders · drought", "2 regions"], ["Tigrayan farmers · pests", "4 regions"],
                    ].map(([a, b]) => (
                      <div key={a} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-2 py-1.5">
                        <span className="font-bold">{a}</span><span className="text-[10px] text-muted-foreground">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal Overlays */}
      <AnimatePresence>
        {showPestReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowPestReport(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl border border-border bg-background p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <PestReportForm lang={lang} onClose={() => setShowPestReport(false)} />
            </motion.div>
          </motion.div>
        )}
        {showCropSeason && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowCropSeason(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl border border-border bg-background p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <CropSeasonLogger lang={lang} onClose={() => setShowCropSeason(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function stagePct(from: string, to: string): number {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const a = months.indexOf(from.split(" ")[0]);
  const b = months.indexOf(to.split(" ")[0]);
  return a >= 0 && b >= 0 ? Math.min(100, ((new Date().getMonth() - a) / (b - a || 1)) * 100) : 45;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BudgetIcon({ className }: { className?: string }) { return <MessageCircle className={className} />; }