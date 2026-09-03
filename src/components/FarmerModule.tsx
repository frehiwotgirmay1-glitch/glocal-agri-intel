import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudSun, Droplets, FlaskConical, Gauge, Leaf, MapPin, Plus, Ruler, Tractor, TriangleAlert,
  Users, Wheat,
} from "lucide-react";
import type { Lang, NetworkMode, Parcel } from "../types/crais";
import { FARMERS, PARCELS, REGIONAL_ALERTS, ZONES } from "../data/agri";
import { panel, PanelHeader, Bar, Tag, moduleTabs } from "./ui/common";
import { FarmerRegistrationModal, SoilTestForm } from "./InputModals";

type Tab = "list" | "parcels" | "crops";

export default function FarmerModule({ lang, net, zone }: { lang: Lang; net: NetworkMode; zone: string }) {
  const [tab, setTab] = useState<Tab>("list");
  const [activeAlert, setActiveAlert] = useState(REGIONAL_ALERTS[0].id);
  const [showFarmerReg, setShowFarmerReg] = useState(false);
  const [showSoilTest, setShowSoilTest] = useState(false);
  const zoneName = ZONES.find((z) => z.id === zone)?.name ?? zone;
  const zoneFarmers = FARMERS.filter((f) => f.zoneId === zone);
  const zoneParcels = PARCELS.filter((p) => zoneFarmers.some((f) => f.id === p.farmerId));

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className={`${panel} lg:col-span-2`}>
        <PanelHeader
          icon={Users}
          title={`${zoneFarmers.length} farmers · ${zoneParcels.length} parcels registered`}
          sub={zoneName}
          right={
            <div className="flex items-center gap-1.5">
              <button onClick={() => setShowSoilTest(true)} className="flex items-center gap-1 rounded-lg border border-border bg-background/60 px-2 py-1 text-[10px] font-bold text-muted-foreground hover:border-emerald-600/40 hover:text-foreground">
                <FlaskConical className="size-3" /> Soil Test
              </button>
              <button onClick={() => setShowFarmerReg(true)} className="flex items-center gap-1 rounded-lg bg-emerald-700 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm hover:bg-emerald-600">
                <Plus className="size-3" /> Register
              </button>
            </div>
          }
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-x-auto"
          >
            {tab === "list" && (
              <table className="w-full min-w-[560px] text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-[10px] uppercase tracking-wider text-muted-foreground">
                    <th className="pb-2">Farmer</th>
                    <th className="pb-2">Co-op</th>
                    <th className="pb-2">Phone</th>
                    <th className="pb-2">Score</th>
                    <th className="pb-2 text-right">Parcels</th>
                  </tr>
                </thead>
                <tbody>
                  {zoneFarmers.map((f) => {
                    const parcels = PARCELS.filter((p) => p.farmerId === f.id);
                    return (
                      <tr key={f.id} className="border-b border-border/60 last:border-0">
                        <td className="py-2.5">
                          <div className="flex items-center gap-2">
                            <span className={`flex size-6 items-center justify-center rounded-full text-[10px] font-black text-white ${f.gender === "F" ? "bg-fuchsia-600" : "bg-sky-600"}`}>
                              {f.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </span>
                            <div>
                              <div className="font-bold">{f.name}</div>
                              <div className="text-[10px] text-muted-foreground">{f.age} yrs</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5">{f.coop}</td>
                        <td className="tabular py-2.5 text-muted-foreground">{f.phone}</td>
                        <td className="py-2.5">
                          <Tag tone={f.score >= 75 ? "emerald" : f.score >= 60 ? "amber" : "red"}>{f.score}</Tag>
                        </td>
                        <td className="tabular py-2.5 text-right font-bold">{parcels.length}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {tab === "parcels" && (
              <div className="grid gap-2 sm:grid-cols-2">
                {zoneParcels.map((p: Parcel) => (
                  <div key={p.id} className="rounded-xl border border-border bg-background/60 p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold">
                        <MapPin className="size-3.5 text-emerald-600" />
                        {p.name}
                      </div>
                      <Tag>{p.currentCrop}</Tag>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Ruler className="size-3" /> {p.sizeHa} ha</span>
                      <span className="flex items-center gap-1"><Tractor className="size-3" /> {p.soilType}</span>
                      <span className="flex items-center gap-1"><Gauge className="size-3" /> {p.elevationM} m</span>
                      <span className="flex items-center gap-1"><Droplets className="size-3" /> {p.irrigation ? "Irrigated" : "Rain-fed"}</span>
                    </div>
                    <div className="tabular mt-2 text-[10px] text-muted-foreground">{p.lat}°, {p.lng}°</div>
                  </div>
                ))}
                {zoneParcels.length === 0 && (
                  <div className="col-span-full rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                    No parcels registered for this agro-zone yet.
                  </div>
                )}
              </div>
            )}

            {tab === "crops" && (
              <div className="space-y-2">
                {zoneParcels.map((p: Parcel) => (
                  <div key={p.id} className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Wheat className="size-4 text-amber-600" />
                      <div>
                        <div className="text-xs font-bold">{p.currentCrop}</div>
                        <div className="text-[10px] text-muted-foreground">{p.name}</div>
                      </div>
                    </div>
                    <Tag tone={p.currentCrop === "Maize" ? "emerald" : "muted"}>
                      {p.currentCrop === "Maize" ? "Vegetative BBCH 14-19" : p.currentCrop === "Beans" ? "Flowering BBCH 61" : "Growing"}
                    </Tag>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-4">
        <div className={panel}>
          <PanelHeader icon={Leaf} title="Zone resilience" sub={zoneName} />
          <div className="mb-1 flex items-end justify-between">
            <span className="tabular text-3xl font-black text-emerald-700 dark:text-emerald-300">82</span>
            <span className="text-[11px] font-semibold text-muted-foreground">+6 pts QoQ</span>
          </div>
          <Bar value={82} max={100} />
          <div className="mt-3 space-y-1.5 text-[11px]">
            {[
              ["Crop diversity", 78], ["Input access", 64], ["Market linkage", 88], ["Weather cover", 70],
            ].map(([k, v]) => (
              <div key={k as string} className="flex items-center gap-2">
                <span className="w-28 text-muted-foreground">{k}</span>
                <div className="flex-1"><Bar value={v as number} max={100} tone={(v as number) > 75 ? "emerald" : (v as number) > 55 ? "amber" : "red"} /></div>
                <span className="tabular w-8 text-right font-bold">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={panel}>
          <PanelHeader icon={TriangleAlert} title={`${REGIONAL_ALERTS.filter((a) => a.level === "critical").length} critical alerts`} />
          <div className="space-y-2">
            {REGIONAL_ALERTS.map((a) => {
              const tones: Record<string, string> = {
                flood: "bg-blue-600/10 text-blue-700 border-blue-600/30",
                drought: "bg-amber-600/10 text-amber-700 border-amber-600/30",
                pest: "bg-red-600/10 text-red-700 border-red-600/30",
                storm: "bg-violet-600/10 text-violet-700 border-violet-600/30",
                market: "bg-emerald-600/10 text-emerald-700 border-emerald-600/30",
                advisory: "bg-sky-600/10 text-sky-700 border-sky-600/30",
              };
              return (
                <button
                  key={a.id}
                  onClick={() => setActiveAlert(a.id)}
                  className={`w-full rounded-xl border p-2.5 text-left transition-all ${activeAlert === a.id ? "ring-2 ring-emerald-500/40 " + tones[a.type] : "border-border bg-background/50"}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold">{a.titleKey}</span>
                    <span className={`rounded-full px-1.5 py-px text-[9px] font-black uppercase ${a.level === "critical" ? "bg-red-600 text-white" : a.level === "warning" ? "bg-amber-500 text-white" : "bg-sky-600 text-white"}`}>
                      {a.level}
                    </span>
                  </div>
                  <div className="mt-1 text-[10px] text-muted-foreground">
                    {a.scope} · {ZONES.find((z) => z.id === a.zoneId)?.name ?? "—"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Modal Overlays                                                       */
/* ------------------------------------------------------------------ */
export function FarmerModuleWithModals({ lang, net, zone }: { lang: Lang; net: NetworkMode; zone: string }) {
  const [showFarmerReg, setShowFarmerReg] = useState(false);
  const [showSoilTest, setShowSoilTest] = useState(false);

  return (
    <>
      <FarmerModule lang={lang} net={net} zone={zone} />
      <AnimatePresence>
        {showFarmerReg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowFarmerReg(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl border border-border bg-background p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <FarmerRegistrationModal lang={lang} onClose={() => setShowFarmerReg(false)} />
            </motion.div>
          </motion.div>
        )}
        {showSoilTest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowSoilTest(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl border border-border bg-background p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <SoilTestForm lang={lang} onClose={() => setShowSoilTest(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}