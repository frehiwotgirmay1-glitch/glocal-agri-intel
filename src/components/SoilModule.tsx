import { FlaskConical, Leaf, ScanLine } from "lucide-react";
import type { Lang, NetworkMode } from "../types/crais";
import { SOIL_SAMPLES } from "../data/agri";
import { panel, PanelHeader, Bar, Tag } from "./ui/common";

const RECS = [
  { n: "CAN (27-0-0)", q: "140 kg · KSh 3,100", why: "N deficit" },
  { n: "DAP (18-46-0)", q: "50 kg · KSh 3,650", why: "P & S starter" },
  { n: "ZnSO₄", q: "10 kg · KSh 950", why: "Zinc 18 ppm" },
];

export default function SoilModule({ lang, net, zone }: { lang: Lang; net: NetworkMode; zone: string }) {
  const soil = SOIL_SAMPLES["Maize"];
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className={`${panel} lg:col-span-2`}>
        <PanelHeader
          icon={FlaskConical}
          title="Soil profile · Nakuru Parcel A"
          sub="Maize · Nitisol · last test 12 days ago"
          right={<Tag tone="amber">ACTION: N LOW</Tag>}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { k: "Nitrogen (N)", v: soil.n, max: 120, unit: "ppm", tone: "red" as const },
            { k: "Phosphorus (P)", v: soil.p, max: 60, unit: "ppm", tone: "amber" as const },
            { k: "Potassium (K)", v: soil.k, max: 80, unit: "ppm", tone: "emerald" as const },
            { k: "Organic matter", v: soil.organicMatter, max: 6, unit: "%", tone: "emerald" as const },
          ].map((m) => (
            <div key={m.k} className="rounded-xl border border-border bg-background/60 p-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-muted-foreground">{m.k}</span>
                <span className="tabular font-black">{m.v} <span className="text-[9px] font-semibold text-muted-foreground">{m.unit}</span></span>
              </div>
              <div className="mt-2"><Bar value={m.v} max={m.max} tone={m.tone} /></div>
              <div className="mt-1 text-[10px] text-muted-foreground">{(m.v / m.max) < 0.35 ? "Low" : (m.v / m.max) > 0.7 ? "Optimal" : "Adequate"}</div>
            </div>
          ))}
          <div className="rounded-xl border border-border bg-background/60 p-3">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-muted-foreground">pH</span>
              <span className="tabular font-black">{soil.ph}</span>
            </div>
            <div className="mt-2"><Bar value={(soil.ph - 3.5) * 20} max={100} tone={soil.ph < 5.8 ? "red" : "emerald"} /></div>
            <div className="mt-1 text-[10px] text-muted-foreground">Target 6.0–6.5 · lime 1.2 t/ha</div>
          </div>
          <div className="rounded-xl border border-border bg-background/60 p-3">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-muted-foreground">Moisture</span>
              <span className="tabular font-black">{soil.moisture}%</span>
            </div>
            <div className="mt-2"><Bar value={soil.moisture} max={100} tone="sky" /></div>
            <div className="mt-1 text-[10px] text-muted-foreground">Sensors ×3 · drains after Tue rain</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className={panel}>
          <PanelHeader icon={FlaskConical} title="Fertilizer recommendation" sub="Top-dress now · +22% yield" />
          <div className="space-y-2">
            {RECS.map((r) => (
              <div key={r.n} className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-3 py-2">
                <div>
                  <div className="text-xs font-bold">{r.n}</div>
                  <div className="text-[10px] text-muted-foreground">{r.why}</div>
                </div>
                <div className="text-[11px] font-bold">{r.q}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={panel}>
          <PanelHeader icon={Leaf} title="Micronutrients" sub="Verified by lab" right={<Tag>3 samples</Tag>} />
          <div className="space-y-2">
            {soil.minerals.map((m) => (
              <div key={m.name} className="flex items-center gap-2">
                <span className="w-16 text-[11px] font-semibold text-muted-foreground">{m.name}</span>
                <div className="flex-1"><Bar value={m.level} max={100} tone={m.level < 30 ? "red" : m.level < 55 ? "amber" : "emerald"} /></div>
                <span className="tabular w-9 text-right text-[11px] font-bold">{m.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}