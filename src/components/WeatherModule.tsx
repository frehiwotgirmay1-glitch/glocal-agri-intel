import { CloudRain, CloudSun, CloudLightning, Droplets, Mic, ThermometerSun, Wind } from "lucide-react";
import type { Lang, NetworkMode, WeatherDay, WeatherIcon } from "../types/crais";
import { WEEK_FORECAST, ZONES } from "../data/agri";
import { STATUS_FEEDS } from "../data/channels";
import { panel, PanelHeader } from "./ui/common";

const WEATHER_ICON: Record<WeatherIcon, typeof CloudSun> = {
  sun: CloudSun, cloud: Wind, rain: CloudRain, storm: CloudLightning, wind: Wind, drizzle: CloudRain,
};
const RISK_LABEL = { frost: "Frost", flood: "Flood", drought: "Drought", storm: "Storm" } as const;

function Day({ d }: { d: WeatherDay }) {
  const Icon = WEATHER_ICON[d.icon];
  return (
    <div className="relative flex flex-col items-center gap-1 rounded-xl border border-border bg-background/60 px-1 py-2">
      {d.risk && (
        <span className="absolute -top-1.5 right-1 rounded-full bg-red-500 px-1.5 py-px text-[8px] font-black uppercase text-white">
          {RISK_LABEL[d.risk]}
        </span>
      )}
      <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{d.label}</span>
      <Icon className="size-5 text-sky-500 dark:text-sky-300" />
      <span className="tabular text-xs font-extrabold">{d.hi}°</span>
      <span className="tabular text-[10px] text-muted-foreground">L {d.lo}°</span>
      <span className="flex items-center gap-0.5 text-[10px] font-semibold text-sky-600 dark:text-sky-300">
        <Droplets className="size-2.5" /> {d.rainPct}%
      </span>
    </div>
  );
}

export default function WeatherModule({ lang, net, zone }: { lang: Lang; net: NetworkMode; zone: string }) {
  const zoneName = ZONES.find((z) => z.id === zone)?.name ?? zone;
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className={`${panel} lg:col-span-2`}>
        <PanelHeader
          icon={CloudSun}
          title={`7-day forecast · ${zoneName}`}
          sub="High-resolution model + indigenous calibration"
          right={<span className="rounded-md bg-sky-600/10 px-2 py-1 text-[10px] font-bold text-sky-700">Updated 06:00 EAT</span>}
        />
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {WEEK_FORECAST.map((d) => <Day key={d.day} d={d} />)}
        </div>
        <div className="mt-4 rounded-xl border border-border bg-background/60 p-3">
          <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
            <span>Precipitation · 7 days (mm)</span>
            <span className="text-sky-600 dark:text-sky-300">∑ 58 mm</span>
          </div>
          <div className="flex h-20 items-end gap-2">
            {WEEK_FORECAST.map((d, i) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full max-w-8 rounded-t-md transition-all duration-700 ease-out"
                  style={{ height: `${d.rainPct * 0.8}px`, backgroundColor: d.rainPct > 70 ? "var(--chart-3)" : d.rainPct > 40 ? "var(--chart-4)" : "var(--border)" }}
                />
                <span className="tabular text-[9px] text-muted-foreground">{d.rainPct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className={panel}>
          <PanelHeader icon={CloudSun} title="Agro-advisories" sub="Zone-tuned guidance" />
          <div className="space-y-2">
            {STATUS_FEEDS.sow.map((s) => (
              <div key={s.title} className="flex gap-2 rounded-xl border border-border bg-background/50 p-2.5">
                <span className={`mt-0.5 size-2 shrink-0 rounded-full ${s.mode === "success" ? "bg-emerald-500" : s.mode === "warn" ? "bg-amber-500" : "bg-sky-500"}`} />
                <div>
                  <div className="text-[11px] font-bold">{s.title}</div>
                  <div className="text-[10px] leading-relaxed text-muted-foreground">{s.body}</div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-xl border border-emerald-600/20 bg-emerald-600/5 p-2.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
              <ThermometerSun className="size-4 shrink-0" />
              Sowing window opens Saturday — seedbeds drain by Sunday dawn.
            </div>
          </div>
        </div>

        <div className={panel}>
          <PanelHeader icon={Mic} title="Voice brief" sub="Played over IVR · SW / AM / TI" />
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-emerald-700 text-white">
              <Mic className="size-5" />
            </span>
            <div className="flex-1 space-y-1">
              <div className="flex h-1.5 items-center gap-px">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span key={i} className="wave-bar w-0.5 flex-1 rounded-full bg-emerald-500" style={{ animationDelay: `${i * 0.05}s` }} />
                ))}
              </div>
              <div className="text-[10px] text-muted-foreground">00:24 / 00:41 · Kiswahili</div>
            </div>
            <button className="flex size-8 items-center justify-center rounded-full bg-emerald-600 text-white">
              <span className="text-xs">▶</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}