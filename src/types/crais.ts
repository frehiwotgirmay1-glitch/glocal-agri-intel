export type Lang = "en" | "sw" | "am" | "ti";

export const LANGS: { code: Lang; native: string; en: string }[] = [
  { code: "en", native: "English", en: "English" },
  { code: "sw", native: "Kiswahili", en: "Swahili" },
  { code: "am", native: "አማርኛ", en: "Amharic" },
  { code: "ti", native: "ትግርኛ", en: "Tigrinya" },
];

export type NetworkMode = "4g" | "2g" | "offline";

export type WeatherIcon =
  | "sun"
  | "cloud"
  | "rain"
  | "storm"
  | "wind"
  | "drizzle";

export interface Zone {
  id: string;
  name: string;
  country: string;
  altM: number;
  rainfall: { wet: string; dry: string };
  crops: string[];
  risk: "low" | "medium" | "high";
}

export interface Farmer {
  id: string;
  name: string;
  phone: string;
  coop: string;
  zoneId: string;
  age: number;
  gender: "F" | "M";
  score: number; // 0-100 farmer resilience score
}

export interface Parcel {
  id: string;
  name: string;
  farmerId: string;
  sizeHa: number;
  elevationM: number;
  soilType: string;
  currentCrop: string;
  irrigation: boolean;
  lat: string;
  lng: string;
}

export interface WeatherDay {
  day: string;
  label: string;
  icon: WeatherIcon;
  hi: number;
  lo: number;
  rainPct: number;
  risk: null | "frost" | "flood" | "drought" | "storm";
}

export interface Alert {
  id: string;
  type: "flood" | "drought" | "pest" | "storm" | "market" | "advisory";
  scope: "regional" | "zone" | "farm";
  titleKey: string; // key into dict.alerts
  level: "info" | "warning" | "critical";
  zoneId?: string;
}

export interface SoilProfile {
  n: number; // ppm
  p: number;
  k: number;
  ph: number;
  organicMatter: number; // %
  moisture: number; // %
  minerals: { name: string; level: number }[];
}

export interface FertilizerRecipe {
  name: string;
  qtyKg: number;
  npk: string;
  priceKsh: number;
}

export interface CropStage {
  key: string;
  labelKey?: string; // falls back to label
  label: string;
  bbch: string;
  from: string;
  to: string;
  active?: boolean;
}

export interface NDVIReading {
  label: string;
  value: number; // -0.2 .. 0.9
}

export interface YieldDriver {
  name: string;
  impact: number; // -25..+25 %
  good: boolean;
}

export interface PestDiagnosis {
  id: string;
  name: string;
  crop: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  symptoms: string[];
  chemical: string;
  bio: string;
  prevention: string;
}

export interface MarketQuote {
  id: string;
  crop: string;
  hub: string;
  country: string;
  price: number; // KSh equivalent per kg
  change24: number; // %
  trend: number[]; // 10 week sparkline
  season: "peak" | "off" | "mid";
}

export interface BuyerDeal {
  id: string;
  crop: string;
  qtyT: number;
  buyer: string;
  hub: string;
  price: number;
  validityDays: number;
}

export interface ChatMsg {
  role: "user" | "bot";
  text: string;
  audio?: boolean;
}

export interface PromptChip {
  key: string;
  text: string;
}

export interface Dealer {
  id: string;
  name: string;
  town: string;
  items: { name: string; price: number; unit: string }[];
  stock: boolean;
}

export interface InsurancePolicy {
  crop: string;
  premium: number;
  coverage: number;
  trigger: string;
  status: "active" | "pending" | "claimed";
  payoutKsh: number;
}

export interface CreditProfile {
  score: number;
  band: "low" | "medium" | "good" | "excellent";
  maxLoan: number;
  rate: number;
  factors: { label: string; good: boolean }[];
}

export interface WisdomRecord {
  id: string;
  title: string;
  group: string;
  text: string;
  region: string;
  source: string;
}

export interface SeasonEntry {
  month: string;
  activity: string;
  crop: string;
}

export interface Delta {
  en: string;
  sw: string;
  am: string;
  ti: string;
}

export type Dict = Partial<Record<Lang, string>> & { en: string };

export interface UsdsNode {
  id: string;
  title: { en: string; sw: string; am: string; ti: string };
  options: { label: { en: string; sw: string; am: string; ti: string }; next: string }[];
  sms?: { en: string; sw: string; am: string; ti: string };
}

export interface MsgCmd {
  cmd: string;
  reply: { en: string; sw: string; am: string; ti: string };
}

export interface SMAction {
  text: string;
  class: "received" | "sent";
  time: string;
}

export interface QueueItem {
  id: string;
  op: "SMS" | "USSD" | "VC";
  target: string;
  summary: string;
  ts: string;
}

export interface OfflineStats {
  pending: number;
  synced: number;
  conflicts: number;
  lastSync: string | null;
}

export interface NBAAction {
  id: string;
  titleKey: string;
  urgency: 1 | 2 | 3;
  impact: number; // %
  roi: number; // KSh/ha
  reasons: string[];
  tag: string;
}