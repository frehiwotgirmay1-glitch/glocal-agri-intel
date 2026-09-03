import { motion } from "framer-motion";

export const panel = "rounded-2xl border border-border bg-card p-4 shadow-sm";

export function PanelHeader({
  icon: Icon, title, sub, right,
}: { icon: React.ComponentType<{ className?: string }>; title: string; sub?: string; right?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-start justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700 dark:text-emerald-300">
          <Icon className="size-4" />
        </span>
        <div>
          <div className="text-sm font-bold leading-tight">{title}</div>
          {sub && <div className="text-[11px] text-muted-foreground">{sub}</div>}
        </div>
      </div>
      {right}
    </div>
  );
}

export function Bar({
  value, max, tone = "emerald",
}: { value: number; max: number; tone?: "emerald" | "amber" | "red" | "sky" }) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const cls =
    tone === "emerald" ? "bg-emerald-500" :
    tone === "amber" ? "bg-amber-500" :
    tone === "red" ? "bg-red-500" : "bg-sky-500";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`h-full rounded-full ${cls}`}
      />
    </div>
  );
}

export function Tag({ children, tone = "emerald" }: { children: React.ReactNode; tone?: "emerald" | "amber" | "red" | "sky" | "muted" }) {
  const tones: Record<string, string> = {
    emerald: "bg-emerald-600/10 text-emerald-700",
    amber: "bg-amber-500/10 text-amber-700",
    red: "bg-red-600/10 text-red-700",
    sky: "bg-sky-600/10 text-sky-700",
    muted: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function moduleTabs(tabs: { id: string; label: string; icon: React.ComponentType<{ className?: string }> }[], active: string, setActive: (id: string) => void) {
  return tabs.map(({ id, label, icon: Icon }) => (
    <button
      key={id}
      onClick={() => setActive(id)}
      className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-bold transition-all ${
        active === id
          ? "border-emerald-700/30 bg-emerald-700 text-white shadow-md shadow-emerald-900/20 dark:bg-emerald-500 dark:text-emerald-950"
          : "border-border bg-card text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="size-4" />
      {label}
    </button>
  ));
}