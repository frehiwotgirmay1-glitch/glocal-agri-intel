import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus, MapPin, Droplets, FlaskConical, Bug, Upload, Camera,
  Calculator, ShieldCheck, Coins, Landmark, Send, MessageCircle,
  ChevronDown, X, Check, Plus, Minus, Save, Trash2, Edit, Eye,
  Search, Filter, SlidersHorizontal, RotateCcw, RefreshCw,
  AlertTriangle, Info, Bell, Globe, Wifi, WifiOff, Smartphone, Phone,
  Mic, Play, Sprout, Leaf, Wheat, Tractor, Ruler, Gauge, CloudSun,
  CloudRain, Sun, Moon, Users, Database, Settings, LogOut, Menu,
  Home, LayoutDashboard, Bot, Zap, Sparkles, FileText, Image, Video,
  Radio, Signal, ListChecks, Clock, ArrowDownToLine, CheckCircle2,
  ChevronRight, Copy, Share2, ExternalLink, Lock, Unlock, CreditCard,
  Wallet, Banknote, Receipt, Percent, Scale, Award, Star, Bookmark,
  Flag, ThumbsUp, ThumbsDown, Quote, BookOpen,
  GraduationCap, School, Building2, Store, ShoppingBag, ShoppingCart,
  Truck, Package, Box, Boxes, Layers, Network, Map, Compass, Target,
  Shield, ShieldAlert, HeartPulse, Activity, TrendingUp, TrendingDown,
  BarChart3, PieChart, ArrowUpRight, ArrowDownRight, ArrowUp, ArrowDown,
  Volume2, Pause, MicOff, CameraOff, VideoOff, Film, ImagePlus, Images,
  QrCode, Fingerprint, Crown, Gem, Gift, Rocket, Flame,
  Sparkle as LucideSparkle, Stars, SunMoon, Sunrise, Sunset, CloudLightning, CloudDrizzle,
  Snowflake, Wind, Thermometer, Waves, Anchor, Ship, Sailboat, Umbrella,
  Mountain, TreePine, Flower, Apple, Banana,
  Cherry, Grape, Carrot, Egg, Milk,
  Beef, Fish, Coffee, Beer, Wine, Martini,
  GlassWater, Soup, UtensilsCrossed, CakeSlice, Candy, Cookie, IceCream, Popcorn,
  Lollipop, Croissant, Sandwich, Pizza,
  Salad,
} from "lucide-react";
import type { Lang, NetworkMode } from "../types/crais";
import { T, t } from "../data/i18n";
import { panel, PanelHeader, Tag, Bar } from "./ui/common";

/* ------------------------------------------------------------------ */
/* Farmer Registration & Parcel Onboarding                              */
/* ------------------------------------------------------------------ */
interface FarmerFormData {
  name: string; phone: string; coop: string; zoneId: string;
  age: string; gender: "F" | "M"; score: number;
}
interface ParcelFormData {
  name: string; farmerId: string; sizeHa: string; elevationM: string;
  soilType: string; currentCrop: string; irrigation: boolean; lat: string; lng: string;
}

const INITIAL_FARMER: FarmerFormData = { name: "", phone: "", coop: "", zoneId: "rv", age: "", gender: "M", score: 0 };
const INITIAL_PARCEL: ParcelFormData = { name: "", farmerId: "", sizeHa: "", elevationM: "", soilType: "", currentCrop: "Maize", irrigation: false, lat: "", lng: "" };

export function FarmerRegistrationModal({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const [step, setStep] = useState<"farmer" | "parcel">("farmer");
  const [farmer, setFarmer] = useState<FarmerFormData>(INITIAL_FARMER);
  const [parcel, setParcel] = useState<ParcelFormData>(INITIAL_PARCEL);
  const [saved, setSaved] = useState(false);

  const save = () => {
    if (!farmer.name || !farmer.phone) return;
    const id = `f${Date.now()}`;
    const pid = `p${Date.now() + 1}`;
    localStorage.setItem("crais_farmers", JSON.stringify([...JSON.parse(localStorage.getItem("crais_farmers") || "[]"), { ...farmer, id }]));
    if (parcel.name && parcel.sizeHa) {
      localStorage.setItem("crais_parcels", JSON.stringify([...JSON.parse(localStorage.getItem("crais_parcels") || "[]"), { ...parcel, id: pid, farmerId: id }]));
    }
    setSaved(true);
    setTimeout(onClose, 1200);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <PanelHeader icon={UserPlus} title={t(T.module1, lang)} sub={step === "farmer" ? "Register farmer" : "Add parcel"} />
        <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted"><X className="size-4" /></button>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2">
        {(["farmer", "parcel"] as const).map((s, i) => (
          <button key={s} onClick={() => setStep(s)} className={`flex-1 rounded-xl border px-3 py-2 text-xs font-bold transition-all ${step === s ? "border-emerald-700/40 bg-emerald-700 text-white" : "border-border bg-background/50 text-muted-foreground"}`}>
            {i + 1}. {s === "farmer" ? "Farmer Profile" : "Farm Parcel"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.15 }}>
          {step === "farmer" ? (
            <div className="space-y-3">
              {[
                { label: "Full Name", key: "name" as keyof FarmerFormData, type: "text", placeholder: "e.g. Grace Wanjiru" },
                { label: "Phone Number", key: "phone" as keyof FarmerFormData, type: "tel", placeholder: "+254 7XX XXX XXX" },
                { label: "Cooperative", key: "coop" as keyof FarmerFormData, type: "text", placeholder: "Rift Agro Co-op" },
                { label: "Age", key: "age" as keyof FarmerFormData, type: "number", placeholder: "41" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">{label}</label>
                  <input type={type} placeholder={placeholder} value={(farmer[key] as string)} onChange={(e) => setFarmer((f) => ({ ...f, [key]: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50" />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Gender</label>
                <div className="flex gap-2">
                  {(["M", "F"] as const).map((g) => (
                    <button key={g} onClick={() => setFarmer((f) => ({ ...f, gender: g }))} className={`flex-1 rounded-xl border px-3 py-2 text-sm font-bold transition-all ${farmer.gender === g ? "border-emerald-700/40 bg-emerald-700 text-white" : "border-border bg-background/50 text-muted-foreground"}`}>
                      {g === "M" ? "Male" : "Female"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Agro-Zone</label>
                <select value={farmer.zoneId} onChange={(e) => setFarmer((f) => ({ ...f, zoneId: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50">
                  <option value="rv">Rift Valley - Zone 4B</option>
                  <option value="eh">Ethiopian Central Highlands</option>
                  <option value="lv">Lake Victoria Basin</option>
                  <option value="tp">Tigray Plateau</option>
                </select>
              </div>
              <button onClick={() => setStep("parcel")} className="w-full rounded-xl bg-emerald-700 py-2.5 text-xs font-bold text-white hover:bg-emerald-600">Next: Add Parcel →</button>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Parcel Name</label>
                <input type="text" placeholder="e.g. Nakuru Parcel A" value={parcel.name} onChange={(e) => setParcel((p) => ({ ...p, name: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Size (ha)</label>
                  <input type="number" step="0.1" placeholder="2.4" value={parcel.sizeHa} onChange={(e) => setParcel((p) => ({ ...p, sizeHa: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Elevation (m)</label>
                  <input type="number" placeholder="1950" value={parcel.elevationM} onChange={(e) => setParcel((p) => ({ ...p, elevationM: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Soil Type</label>
                  <select value={parcel.soilType} onChange={(e) => setParcel((p) => ({ ...p, soilType: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50">
                    <option value="">Select...</option>
                    <option>Nitisol</option><option>Vertisol</option><option>Ferralsol</option><option>Latosol</option><option>Acrisol</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Current Crop</label>
                  <select value={parcel.currentCrop} onChange={(e) => setParcel((p) => ({ ...p, currentCrop: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50">
                    <option>Maize</option><option>Teff</option><option>Coffee (Arabica)</option><option>Cassava</option><option>Sorghum</option><option>Wheat</option><option>Beans</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Latitude</label>
                  <input type="text" placeholder="-0.303" value={parcel.lat} onChange={(e) => setParcel((p) => ({ ...p, lat: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Longitude</label>
                  <input type="text" placeholder="36.080" value={parcel.lng} onChange={(e) => setParcel((p) => ({ ...p, lng: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="irrigation" checked={parcel.irrigation} onChange={(e) => setParcel((p) => ({ ...p, irrigation: e.target.checked }))} className="rounded border-border" />
                <label htmlFor="irrigation" className="text-xs font-semibold text-muted-foreground">Irrigated</label>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep("farmer")} className="flex-1 rounded-xl border border-border bg-background py-2.5 text-xs font-bold text-muted-foreground hover:bg-muted">← Back</button>
                <button onClick={save} disabled={saved} className={`flex-1 rounded-xl py-2.5 text-xs font-bold text-white transition-all ${saved ? "bg-green-600" : "bg-emerald-700 hover:bg-emerald-600"}`}>
                  {saved ? <><Check className="mr-1 inline size-3" /> Saved!</> : <><Save className="mr-1 inline size-3" /> Save All</>}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Soil Lab / Field Test Submission                                     */
/* ------------------------------------------------------------------ */
export function SoilTestForm({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const [ph, setPh] = useState(6.0);
  const [n, setN] = useState(30);
  const [p, setP] = useState(15);
  const [k, setK] = useState(25);
  const [moisture, setMoisture] = useState(40);
  const [organicMatter, setOrganicMatter] = useState(2.5);
  const [recipe, setRecipe] = useState<{ name: string; qtyKg: number; npk: string; priceKsh: number }[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const calculateRecipe = () => {
    const r: typeof recipe = [];
    if (n < 40) r.push({ name: "DAP (18-46-0)", qtyKg: 50, npk: "18-46-0", priceKsh: 3650 });
    if (ph < 6.0) r.push({ name: "Agricultural Lime", qtyKg: 100, npk: "0-0-0", priceKsh: 2500 });
    if (p < 20) r.push({ name: "DAP (18-46-0)", qtyKg: 40, npk: "18-46-0", priceKsh: 2920 });
    if (k < 30) r.push({ name: "MOP (0-0-60)", qtyKg: 30, npk: "0-0-60", priceKsh: 4200 });
    if (organicMatter < 3) r.push({ name: "Bio-organic compost", qtyKg: 100, npk: "3-1.5-2", priceKsh: 900 });
    if (r.length === 0) r.push({ name: "No amendment needed", qtyKg: 0, npk: "-", priceKsh: 0 });
    setRecipe(r);
  };

  const submit = () => {
    const entry = { ph, n, p, k, moisture, organicMatter, date: new Date().toISOString(), timestamp: Date.now() };
    const existing = JSON.parse(localStorage.getItem("crais_soil_tests") || "[]");
    localStorage.setItem("crais_soil_tests", JSON.stringify([...existing, entry]));
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <PanelHeader icon={FlaskConical} title={t(T.module3, lang)} sub="Soil lab submission" />
        <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted"><X className="size-4" /></button>
      </div>

      <div className="space-y-4">
        {/* pH slider */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-[11px] font-semibold text-muted-foreground">pH Level</label>
            <span className="tabular text-sm font-black text-emerald-700 dark:text-emerald-300">{ph.toFixed(1)}</span>
          </div>
          <input type="range" min="4" max="8" step="0.1" value={ph} onChange={(e) => setPh(parseFloat(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-emerald-700" />
          <div className="mt-1 flex justify-between text-[9px] text-muted-foreground"><span>Acidic (4)</span><span>Neutral (7)</span><span>Alkaline (8)</span></div>
        </div>

        {/* NPK inputs */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Nitrogen (N)", val: n, set: setN, unit: "ppm", color: "emerald" },
            { label: "Phosphorus (P)", val: p, set: setP, unit: "ppm", color: "amber" },
            { label: "Potassium (K)", val: k, set: setK, unit: "ppm", color: "sky" },
          ].map(({ label, val, set: setter, unit, color }) => (
            <div key={label}>
              <label className="mb-1 block text-[10px] font-semibold text-muted-foreground">{label}</label>
              <div className="flex items-center gap-1">
                <button onClick={() => setter(Math.max(0, val - 5))} className="rounded-lg border border-border p-1 hover:bg-muted"><Minus className="size-3" /></button>
                <input type="number" value={val} onChange={(e) => setter(parseInt(e.target.value) || 0)} className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-center text-xs font-bold tabular outline-none focus:border-emerald-600/50" />
                <button onClick={() => setter(val + 5)} className="rounded-lg border border-border p-1 hover:bg-muted"><Plus className="size-3" /></button>
              </div>
              <div className="mt-0.5 text-[9px] text-muted-foreground">{unit}</div>
            </div>
          ))}
        </div>

        {/* Moisture & Organic Matter */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Moisture %</label>
            <input type="range" min="10" max="80" value={moisture} onChange={(e) => setMoisture(parseInt(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-sky-600" />
            <div className="mt-1 text-center text-xs font-bold text-sky-600">{moisture}%</div>
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Organic Matter %</label>
            <input type="range" min="0.5" max="8" step="0.1" value={organicMatter} onChange={(e) => setOrganicMatter(parseFloat(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-amber-600" />
            <div className="mt-1 text-center text-xs font-bold text-amber-600">{organicMatter.toFixed(1)}%</div>
          </div>
        </div>

        {/* Auto-generated recipe */}
        <button onClick={calculateRecipe} className="w-full rounded-xl border border-border bg-background py-2.5 text-xs font-bold text-muted-foreground hover:border-emerald-600/40 hover:text-foreground">
          <Calculator className="mr-1.5 inline size-3" /> Generate Fertilizer Prescription
        </button>

        {recipe.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
            <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">Recommended Blend:</div>
            {recipe.map((r, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-3 py-2">
                <div>
                  <div className="text-xs font-bold">{r.name}</div>
                  <div className="text-[10px] text-muted-foreground">NPK {r.npk} · {r.qtyKg} kg/ha</div>
                </div>
                <div className="tabular text-xs font-bold text-amber-600">KSh {r.priceKsh.toLocaleString()}</div>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-xl border border-emerald-600/30 bg-emerald-600/5 px-3 py-2">
              <span className="text-xs font-bold">Total estimated cost</span>
              <span className="tabular text-sm font-black text-emerald-700 dark:text-emerald-300">KSh {recipe.reduce((s, r) => s + r.priceKsh, 0).toLocaleString()}</span>
            </div>
          </motion.div>
        )}

        <button onClick={submit} disabled={submitted} className={`w-full rounded-xl py-2.5 text-xs font-bold text-white transition-all ${submitted ? "bg-green-600" : "bg-emerald-700 hover:bg-emerald-600"}`}>
          {submitted ? <><Check className="mr-1.5 inline size-3" /> Test Logged!</> : <><Save className="mr-1.5 inline size-3" /> Submit Soil Test</>}
        </button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Pest & Disease Report / AI Scanner                                   */
/* ------------------------------------------------------------------ */
export function PestReportForm({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const [crop, setCrop] = useState("Maize");
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("medium");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [zone, setZone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const symptomOptions = ["Window-pane leaf damage", "Frass in leaf whorl", "Ragged defoliation", "Hole-punched grain", "Chlorotic leaf streaks", "Leaf necrosis", "Stunted yellowing", "Poor cob fill", "Yellow-green mosaic", "Leaf distortion"];

  const toggleSymptom = (s: string) => {
    setSymptoms((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const submit = () => {
    if (!zone) return;
    const entry = { crop, severity, symptoms, zone, date: new Date().toISOString(), timestamp: Date.now() };
    const existing = JSON.parse(localStorage.getItem("crais_pest_reports") || "[]");
    localStorage.setItem("crais_pest_reports", JSON.stringify([...existing, entry]));
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <PanelHeader icon={Bug} title={t(T.module5, lang)} sub="Pest & disease report" />
        <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted"><X className="size-4" /></button>
      </div>

      <div className="space-y-4">
        {/* Photo upload simulator */}
        <div className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${photoUploaded ? "border-emerald-600/50 bg-emerald-600/5" : "border-border hover:border-emerald-600/30"}`}>
          {photoUploaded ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto size-8 text-emerald-600" />
              <div className="mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">Photo uploaded — AI scanning...</div>
              <div className="mt-1 text-[10px] text-muted-foreground">Analyzing leaf patterns for diagnosis</div>
            </div>
          ) : (
            <>
              <Camera className="size-8 text-muted-foreground" />
              <div className="mt-2 text-xs font-semibold text-muted-foreground">Upload leaf photo for AI diagnosis</div>
              <div className="mt-1 text-[10px] text-muted-foreground">Or take a photo with device camera</div>
              <button onClick={() => setPhotoUploaded(true)} className="mt-3 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600">
                <Upload className="mr-1.5 inline size-3" /> Upload Photo
              </button>
            </>
          )}
        </div>

        {/* Crop selector */}
        <div>
          <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Affected Crop</label>
          <select value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50">
            <option>Maize</option><option>Teff</option><option>Coffee (Arabica)</option><option>Cassava</option><option>Sorghum</option><option>Wheat</option><option>Beans</option>
          </select>
        </div>

        {/* Severity */}
        <div>
          <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Severity Level</label>
          <div className="flex gap-2">
            {(["low", "medium", "high"] as const).map((s) => (
              <button key={s} onClick={() => setSeverity(s)} className={`flex-1 rounded-xl border px-3 py-2 text-xs font-bold capitalize transition-all ${severity === s ? `border-${s === "high" ? "red" : s === "medium" ? "amber" : "sky"}-700/40 bg-${s === "high" ? "red" : s === "medium" ? "amber" : "sky"}-700 text-white` : "border-border bg-background/50 text-muted-foreground"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Symptoms checklist */}
        <div>
          <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Observed Symptoms (select all that apply)</label>
          <div className="grid grid-cols-2 gap-1.5">
            {symptomOptions.map((s) => (
              <button key={s} onClick={() => toggleSymptom(s)} className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-left text-[10px] transition-all ${symptoms.includes(s) ? "border-emerald-600/40 bg-emerald-600/10 text-emerald-700 dark:text-emerald-300" : "border-border bg-background/50 text-muted-foreground hover:border-emerald-600/30"}`}>
                <Check className={`size-3 ${symptoms.includes(s) ? "text-emerald-600" : "text-transparent"}`} />
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Zone */}
        <div>
          <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Field Zone / Location</label>
          <input type="text" placeholder="e.g. Nakuru Parcel A, North field" value={zone} onChange={(e) => setZone(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50" />
        </div>

        <button onClick={submit} disabled={submitted || !zone} className={`w-full rounded-xl py-2.5 text-xs font-bold text-white transition-all ${submitted ? "bg-green-600" : !zone ? "bg-gray-400" : "bg-emerald-700 hover:bg-emerald-600"}`}>
          {submitted ? <><Check className="mr-1.5 inline size-3" /> Report Submitted!</> : <><Send className="mr-1.5 inline size-3" /> Submit Report</>}
        </button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Market Crop Listing / Buyer RFQ Creator                              */
/* ------------------------------------------------------------------ */
export function MarketListingForm({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const [listingType, setListingType] = useState<"sell" | "buy">("sell");
  const [crop, setCrop] = useState("Maize");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [quality, setQuality] = useState("Grade 1");
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (!quantity || !price || !location || !contact) return;
    const entry = { type: listingType, crop, quantity: parseFloat(quantity), price: parseFloat(price), location, contact, quality, date: new Date().toISOString(), timestamp: Date.now() };
    const existing = JSON.parse(localStorage.getItem("crais_market_listings") || "[]");
    localStorage.setItem("crais_market_listings", JSON.stringify([...existing, entry]));
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <PanelHeader icon={ShoppingBag} title={t(T.module6, lang)} sub="Market listing" />
        <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted"><X className="size-4" /></button>
      </div>

      <div className="space-y-4">
        {/* Sell / Buy toggle */}
        <div className="flex gap-2 rounded-xl border border-border p-1">
          {(["sell", "buy"] as const).map((lt) => (
            <button key={lt} onClick={() => setListingType(lt)} className={`flex-1 rounded-lg py-2 text-xs font-bold capitalize transition-all ${listingType === lt ? "bg-emerald-700 text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`}>
              {lt === "sell" ? "Sell Offer" : "Buy RFQ"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Commodity</label>
            <select value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50">
              <option>Maize</option><option>Teff</option><option>Coffee (Arabica)</option><option>Cassava</option><option>Sorghum</option><option>Wheat</option><option>Beans</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Quality Grade</label>
            <select value={quality} onChange={(e) => setQuality(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50">
              <option>Grade 1</option><option>Grade 2</option><option>Grade 3</option><option>Standard</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Quantity (bags)</label>
            <input type="number" placeholder="50" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50" />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Target Price (KSh/bag)</label>
            <input type="number" placeholder="3800" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Pickup / Delivery Location</label>
          <input type="text" placeholder="e.g. Karatina hub, Kiambu County" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50" />
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Contact Phone</label>
          <input type="tel" placeholder="+254 7XX XXX XXX" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50" />
        </div>

        <button onClick={submit} disabled={submitted} className={`w-full rounded-xl py-2.5 text-xs font-bold text-white transition-all ${submitted ? "bg-green-600" : "bg-emerald-700 hover:bg-emerald-600"}`}>
          {submitted ? <><Check className="mr-1.5 inline size-3" /> Listing Published!</> : <><Send className="mr-1.5 inline size-3" /> Publish {listingType === "sell" ? "Sell Offer" : "RFQ"}</>}
        </button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Financial Loan / Insurance Simulator                                 */
/* ------------------------------------------------------------------ */
export function FinancialSimulator({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [termMonths, setTermMonths] = useState(12);
  const [interestRate, setInterestRate] = useState(12.5);
  const [insuranceCoverage, setInsuranceCoverage] = useState(120000);
  const [cropType, setCropType] = useState("Maize");
  const [hectares, setHectares] = useState(2.4);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [premium, setPremium] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const calculate = () => {
    const monthlyRate = interestRate / 100 / 12;
    const mp = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    setMonthlyPayment(mp);
    setTotalInterest(mp * termMonths - loanAmount);
    setPremium(Math.round(hectares * (cropType === "Maize" ? 1750 : cropType === "Teff" ? 1550 : 2250)));
    setCalculated(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <PanelHeader icon={Coins} title={t(T.module8, lang)} sub="Financial simulator" />
        <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted"><X className="size-4" /></button>
      </div>

      <div className="space-y-4">
        {/* Loan section */}
        <div className="rounded-xl border border-border bg-background/50 p-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <Landmark className="size-4" /> Input Credit Calculator
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Loan Amount (KSh)</label>
            <input type="range" min="10000" max="500000" step="5000" value={loanAmount} onChange={(e) => setLoanAmount(parseInt(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-emerald-700" />
            <div className="mt-1 tabular text-center text-sm font-black text-emerald-700 dark:text-emerald-300">KSh {loanAmount.toLocaleString()}</div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Term (months)</label>
              <select value={termMonths} onChange={(e) => setTermMonths(parseInt(e.target.value))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50">
                <option value={6}>6 months</option><option value={12}>12 months</option><option value={18}>18 months</option><option value={24}>24 months</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Interest Rate (%/yr)</label>
              <input type="number" step="0.5" value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50" />
            </div>
          </div>
        </div>

        {/* Insurance section */}
        <div className="rounded-xl border border-border bg-background/50 p-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <ShieldCheck className="size-4" /> Parametric Insurance
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Crop</label>
              <select value={cropType} onChange={(e) => setCropType(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50">
                <option>Maize</option><option>Teff</option><option>Coffee (Arabica)</option><option>Cassava</option><option>Sorghum</option><option>Wheat</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Area (ha)</label>
              <input type="number" step="0.1" value={hectares} onChange={(e) => setHectares(parseFloat(e.target.value))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50" />
            </div>
          </div>
        </div>

        <button onClick={calculate} className="w-full rounded-xl bg-emerald-700 py-2.5 text-xs font-bold text-white hover:bg-emerald-600">
          <Calculator className="mr-1.5 inline size-3" /> Calculate
        </button>

        {calculated && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
            <div className="rounded-xl border border-emerald-600/30 bg-emerald-600/5 p-3">
              <div className="text-[11px] font-bold text-muted-foreground">Monthly Payment</div>
              <div className="tabular text-2xl font-black text-emerald-700 dark:text-emerald-300">KSh {Math.round(monthlyPayment).toLocaleString()}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-border bg-background/50 p-2">
                <div className="text-[10px] font-bold text-muted-foreground">Total Interest</div>
                <div className="tabular text-sm font-bold text-red-500">KSh {Math.round(totalInterest).toLocaleString()}</div>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-2">
                <div className="text-[10px] font-bold text-muted-foreground">Insurance Premium</div>
                <div className="tabular text-sm font-bold text-amber-600">KSh {premium.toLocaleString()}/season</div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background/50 p-2">
              <div className="text-[10px] font-bold text-muted-foreground">Coverage Amount</div>
              <div className="tabular text-sm font-bold text-emerald-700 dark:text-emerald-300">KSh {insuranceCoverage.toLocaleString()}</div>
              <div className="mt-0.5 text-[9px] text-muted-foreground">Trigger: Rainfall index &lt; 240mm in 3-month window</div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Crop Season Planning Logger                                          */
/* ------------------------------------------------------------------ */
export function CropSeasonLogger({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const [crop, setCrop] = useState("Maize");
  const [plantDate, setPlantDate] = useState("");
  const [variety, setVariety] = useState("");
  const [spacing, setSpacing] = useState("75");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (!plantDate) return;
    const entry = { crop, plantDate, variety, spacing: parseInt(spacing), notes, date: new Date().toISOString(), timestamp: Date.now() };
    const existing = JSON.parse(localStorage.getItem("crais_season_plans") || "[]");
    localStorage.setItem("crais_season_plans", JSON.stringify([...existing, entry]));
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <PanelHeader icon={Sprout} title={t(T.module4, lang)} sub="Season planning" />
        <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted"><X className="size-4" /></button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Crop</label>
          <select value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50">
            <option>Maize</option><option>Teff</option><option>Coffee (Arabica)</option><option>Cassava</option><option>Sorghum</option><option>Wheat</option><option>Beans</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Planting Date</label>
          <input type="date" value={plantDate} onChange={(e) => setPlantDate(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Variety / Hybrid</label>
            <input type="text" placeholder="DK8031, Quncho..." value={variety} onChange={(e) => setVariety(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50" />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Row Spacing (cm)</label>
            <input type="number" value={spacing} onChange={(e) => setSpacing(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-semibold text-muted-foreground">Notes</label>
          <textarea rows={3} placeholder="Soil prep, seed treatment, expected yield..." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-emerald-600/50 resize-none" />
        </div>
        <button onClick={submit} disabled={submitted} className={`w-full rounded-xl py-2.5 text-xs font-bold text-white transition-all ${submitted ? "bg-green-600" : "bg-emerald-700 hover:bg-emerald-600"}`}>
          {submitted ? <><Check className="mr-1.5 inline size-3" /> Plan Saved!</> : <><Save className="mr-1.5 inline size-3" /> Save Season Plan</>}
        </button>
      </div>
    </motion.div>
  );
}