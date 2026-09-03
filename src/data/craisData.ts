import type {
  Alert, BuyerDeal, CreditProfile, CropStage, Dealer, Dict, Farmer,
  InsurancePolicy, MarketQuote, MsgCmd, NBAAction, NDVIReading, NetworkMode,
  OfflineStats, Parcel, PestDiagnosis, PromptChip, QueueItem, SeasonEntry,
  SMAction, SoilProfile, UsdsNode, WeatherDay, WisdomRecord, YieldDriver, Zone,
} from "../types/crais";

/* ------------------------------------------------------------------ */
/* i18n dictionaries (EN, SW, AM, TI)                                  */
/* ------------------------------------------------------------------ */
export const T: Record<string, Dict> = {
  brand: { en: "CRAIS", sw: "CRAIS", am: "ክሬይስ", ti: "ክሬይስ" },
  brandFull: {
    en: "Contextually Relevant Agricultural Intelligence System",
    sw: "Mfumo wa Taarifa za Kilimo wa Muktadha",
    am: "የግብርና እውቀት ስርዓት በአውድ የተመሰረተ",
    ti: "ናይ ግብርና ፍልጠት ስርዓት ብኣውድ ተመስሪቱ",
  },
  tagline: {
    en: "Decisions rooted in the field",
    sw: "Maamuzi yanayotokana na shambani",
    am: "ውሳኔዎች ከእርሻ ተግባራዊ የተመሰረቱ",
    ti: "ውሳነታት ካብ ግራት ዝተመስረቱ",
  },
  navOverview: { en: "Dashboard", sw: "Dashibodi", am: "ዳሽቦርድ", ti: "ዳሽቦርድ" },
  navModules: { en: "Core Modules", sw: "Moduli za Msingi", am: "መሰረታዊ ሞዱሎች", ti: "መሰረታዊ ሞዱላት" },
  navAI: { en: "AI & Decision Hub", sw: "Kituo cha AI", am: "የAI ማዕከል", ti: "ማእከል AI" },
  navOffline: { en: "Offline & Field Tech", sw: "Teknolojia ya Shamba", am: "የመስክ ቴክኖሎጂ", ti: "ቴክኖሎጂ ግራት" },
  tabModules: { en: "Farmer · Weather · Soil", sw: "Mkulima · Hali · Udongo", am: "ገበሬ · የአየር · አፈር", ti: "ሓረስታይ · ኩነታት · ሓመድ" },
  tabAI: { en: "AI Copilot · Credit · Wisdom", sw: "Copilot · Mikopo · Hekima", am: "AI · ብድር · እውቀት", ti: "AI · ብድሪ · ፍልጠት" },
  tabOffline: { en: "USSD · SMS · Voice · Sync", sw: "USSD · SMS · Sauti · Sync", am: "USSD · SMS · ድምጽ · Sync", ti: "USSD · SMS · ድምለይ · Sync" },
  connectivity: { en: "Connectivity", sw: "Muunganisho", am: "ግንኙነት", ti: "ምትእስሳር" },
  net4g: { en: "High-Speed 4G/5G", sw: "4G/5G ya Kasi", am: "ፈጣን 4G/5G", ti: "ቀልጢፍ 4G/5G" },
  net2g: { en: "2G Edge (Low)", sw: "2G (Ndogo)", am: "2G (ዝቅተኛ)", ti: "2G (ዝቑል)" },
  netOffline: { en: "Offline Field Mode", sw: "Hali ya Nje", am: "ከመስመር ውጭ", ti: "ካብ መስመር ወጻኢ" },
  queueCount: { en: "queued", sw: "kwenye foleni", am: "በወረፋ", ti: "ኣብ ወራፍ" },
  zoneLabel: { en: "Agro-Zone", sw: "Kanda", am: "አግሮ-ዞን", ti: "ኣግሮ-ዞን" },
  langLabel: { en: "Language", sw: "Lugha", am: "ቋንቋ", ti: "ቋንቋ" },
  kpiFarms: { en: "Farms Monitored", sw: "Mashamba", am: "እርሻዎች", ti: "ግራታት" },
  kpiAlerts: { en: "Critical Alerts", sw: "Tahadhari", am: "ማስጠንቀቂያዎች", ti: "መጠንቀቕታታት" },
  kpiResilience: { en: "Zone Resilience", sw: "Ustahimili", am: "መቋቋም", ti: "ጽንዓት" },
  kpiSync: { en: "Sync Health", sw: "Afya ya Sync", am: "የSync ሁኔታ", ti: "ጥዕና Sync" },
  module1: { en: "Farmer & Farm Data", sw: "Mkulima na Shamba", am: "ገበሬ እና እርሻ", ti: "ሓረስታይን ግራትን" },
  module2: { en: "Weather Intelligence", sw: "Hali ya Hewa", am: "የአየር እውቀት", ti: "ኩነታት ኣየር" },
  module3: { en: "Soil Intelligence", sw: "Udongo", am: "አፈር", ti: "ሓመድ" },
  module4: { en: "Crop Intelligence", sw: "Mazao", am: "ሰብል", ti: "ምህርቲ ተኽሊ" },
  module5: { en: "Pest & Disease", sw: "Wadudu na Magonjwa", am: "ተባዮች እና በሽታ", ti: "ሓሽሽን ሕማማትን" },
  module6: { en: "Market Intelligence", sw: "Soko", am: "ገበያ", ti: "ሱቕ" },
  module7: { en: "AI Farmer Copilot", sw: "Copilot ya Mkulima", am: "የገበሬ AI አጋር", ti: "AI ሓጋዚ ሓረስታይ" },
  module8: { en: "Financial & Inputs", sw: "Fedha na Pembejeo", am: "ፋይናንስ እና ግብዓት", ti: "ገንዘብን ግብኣትን" },
  module9: { en: "Indigenous Wisdom", sw: "Hekima ya Jadi", am: "ባህላዊ እውቀት", ti: "ባህላዊ ፍልጠት" },
  module10: { en: "Decision Engine", sw: "Mfumo wa Maamuzi", am: "የውሳኔ ሞተር", ti: "ሞተር ውሳነ" },
  module11: { en: "Offline Gateway", sw: "Lango la Nje", am: "ከመስመር ውጭ መግቢያ", ti: "መብጽሒ ካብ መስመር ወጻኢ" },
  aqEmergence: { en: "Emergence", sw: "Kuota", am: "ብቅ ማለት", ti: "ምብቃዕ" },
  aqVegetative: { en: "Vegetative", sw: "Ukuaji", am: "እድገት", ti: "ዕብየት" },
  aqFlowering: { en: "Flowering", sw: "Kuchanua", am: "አበባ", ti: "ዕምባባ" },
  aqMaturity: { en: "Maturity", sw: "Kukomaa", am: "መብሰል", ti: "ምብሳል" },
  aqHarvest: { en: "Harvest", sw: "Mavuno", am: "መኸር", ti: "ዓጸደ" },
  coYes: { en: "Yes", sw: "Ndiyo", am: "አዎ", ti: "እወ" },
  coNo: { en: "No", sw: "Hapana", am: "አይ", ti: "ኣይ" },
  coBack: { en: "Back", sw: "Rudi", am: "ተመለስ", ti: "ተመለስ" },
  coSend: { en: "Send", sw: "Tuma", am: "ላክ", ti: "ስደድ" },
  coPrice: { en: "Prices", sw: "Bei", am: "ዋጋዎች", ti: "ዋጋታት" },
  coWeather: { en: "Weather", sw: "Hali", am: "የአየር", ti: "ኩነታት" },
  coReport: { en: "Report Pest", sw: "Ripoti Wadudu", am: "ተባይ ሪፖርት", ti: "ሕሽሽ ሪፖርት" },
  coCallback: { en: "Agent Callback", sw: "Wito wa Afisa", am: "የአገልግሎት ጥሪ", ti: "ጽውዒት ወኪል" },
  coExit: { en: "Exit", sw: "Ondoka", am: "ውጣ", ti: "ውጻእ" },
  coSel: { en: "Select", sw: "Chagua", am: "ምረጥ", ti: "ምረጽ" },
  aqDrought: { en: "Drought risk window", sw: "Dirisha la ukame", am: "የድርቅ አደጋ", ti: "እዋን ምዉቕ ዓመት" },
  aqSow: { en: "Sowing window open", sw: "Dirisha la kupanda", am: "የመዝራት መስኮት", ti: "እዋን ምዝራእ ክፉት" },
  aqFert: { en: "Top-dress fertilizer due", sw: "Mbolea inahitajika", am: "ማዳበሪያ ጊዜው አሁን", ti: "እዋን ማዳበሪ" },
  aqHar: { en: "Harvest advisory active", sw: "Ushauri wa mavuno", am: "የመኸር ምክር", ti: "ምኽሪ ዓጸደ" },
  aqReport: { en: "Pest report received", sw: "Ripoti ya wadudu", am: "የተባይ ሪፖርት", ti: "ሪፖርት ሕሽሽ" },
  aqSms: { en: "SMS advisory sent", sw: "Ujumbe wa SMS", am: "የSMS ምክር", ti: "SMS ምኽሪ" },
};

export const t = (d: Dict, lang: string): string => d[lang as keyof Dict] ?? d.en;

/* ------------------------------------------------------------------ */
/* Agro-ecological zones                                               */
/* ------------------------------------------------------------------ */
export const ZONES: Zone[] = [
  { id: "rv", name: "Rift Valley - Zone 4B", country: "Kenya", altM: 1800, rainfall: { wet: "Mar-May", dry: "Jun-Sep" }, crops: ["Maize", "Wheat", "Beans"], risk: "medium" },
  { id: "eh", name: "Ethiopian Central Highlands", country: "Ethiopia", altM: 2500, rainfall: { wet: "Jun-Sep", dry: "Oct-Feb" }, crops: ["Teff", "Wheat", "Barley"], risk: "medium" },
  { id: "lv", name: "Lake Victoria Basin", country: "Tanzania", altM: 1150, rainfall: { wet: "Mar-Jun", dry: "Jul-Oct" }, crops: ["Cassava", "Maize", "Coffee"], risk: "low" },
  { id: "tp", name: "Tigray Plateau", country: "Ethiopia", altM: 2050, rainfall: { wet: "Jun-Aug", dry: "Sep-May" }, crops: ["Sorghum", "Teff", "Wheat"], risk: "high" },
];

export const FARMERS: Farmer[] = [
  { id: "f1", name: "Grace Wanjiru", phone: "+254 712 445 908", coop: "Rift Agro Co-op", zoneId: "rv", age: 41, gender: "F", score: 82 },
  { id: "f2", name: "Tadesse Alemu", phone: "+251 911 223 344", coop: "Debre Birhan Union", zoneId: "eh", age: 52, gender: "M", score: 74 },
  { id: "f3", name: "Neema Mushi", phone: "+255 754 118 220", coop: "Mwanza Growers", zoneId: "lv", age: 34, gender: "F", score: 66 },
  { id: "f4", name: "Berhane Tesfay", phone: "+251 912 880 771", coop: "Mekelle Farmers Union", zoneId: "tp", age: 47, gender: "M", score: 58 },
];

export const PARCELS: Parcel[] = [
  { id: "p1", name: "Nakuru Parcel A", farmerId: "f1", sizeHa: 2.4, elevationM: 1950, soilType: "Nitisol", currentCrop: "Maize", irrigation: false, lat: "-0.303", lng: "36.080" },
  { id: "p2", name: "Nakuru Parcel B", farmerId: "f1", sizeHa: 1.1, elevationM: 1880, soilType: "Nitisol", currentCrop: "Beans", irrigation: false, lat: "-0.318", lng: "36.112" },
  { id: "p3", name: "Debre Birhan Plot", farmerId: "f2", sizeHa: 1.8, elevationM: 2620, soilType: "Vertisol", currentCrop: "Teff", irrigation: false, lat: "9.664", lng: "39.534" },
  { id: "p4", name: "Mwanza Lakeside", farmerId: "f3", sizeHa: 3.2, elevationM: 1140, soilType: "Ferralsol", currentCrop: "Cassava", irrigation: true, lat: "-2.517", lng: "32.900" },
  { id: "p5", name: "Mekelle Plateau", farmerId: "f4", sizeHa: 2.0, elevationM: 2100, soilType: "Vertisol", currentCrop: "Sorghum", irrigation: false, lat: "13.490", lng: "39.470" },
];

export const CROP_VARIANTS = ["Maize", "Teff", "Coffee (Arabica)", "Cassava", "Sorghum", "Wheat"];

/* ------------------------------------------------------------------ */
/* Weather & alerts                                                    */
/* ------------------------------------------------------------------ */
export const WEEK_FORECAST: WeatherDay[] = [
  { day: "Mon", label: "Mon", icon: "sun", hi: 28, lo: 13, rainPct: 10, risk: null },
  { day: "Tue", label: "Tue", icon: "rain", hi: 24, lo: 14, rainPct: 70, risk: "flood" },
  { day: "Wed", label: "Wed", icon: "rain", hi: 22, lo: 13, rainPct: 80, risk: null },
  { day: "Thu", label: "Thu", icon: "cloud", hi: 25, lo: 12, rainPct: 40, risk: null },
  { day: "Fri", label: "Fri", icon: "storm", hi: 21, lo: 12, rainPct: 90, risk: "storm" },
  { day: "Sat", label: "Sat", icon: "drizzle", hi: 23, lo: 11, rainPct: 55, risk: null },
  { day: "Sun", label: "Sun", icon: "sun", hi: 27, lo: 12, rainPct: 15, risk: null },
];

export const REGIONAL_ALERTS: Alert[] = [
  { id: "a1", type: "flood", scope: "regional", titleKey: "alertFlood", level: "critical", zoneId: "rv" },
  { id: "a2", type: "pest", scope: "regional", titleKey: "alertLocust", level: "warning", zoneId: "tp" },
  { id: "a3", type: "drought", scope: "zone", titleKey: "alertDry", level: "warning", zoneId: "eh" },
  { id: "a4", type: "storm", scope: "farm", titleKey: "alertStorm", level: "critical", zoneId: "lv" },
];

export const ALERT_TITLES: Record<string, Dict> = {
  alertFlood: { en: "Flash flood watch - highlands", sw: "Tahadhari ya mafuriko", am: "የጎርፍ ማስጠንቀቂያ", ti: "መጠንቀቕታ ማዕበል ማይ" },
  alertLocust: { en: "Desert locust swarm sighted NE", sw: "Nzige wa jangwa waonekana", am: "የበረሃ አንበጣ ታይቷል", ti: "መሬት ሓሰር ተሪኡ" },
  alertDry: { en: "Delayed rains - 12% rainfall deficit", sw: "Mvua umechelewa 12%", am: "ዝናብ 12% መዘግየት", ti: "ዝናብ 12% ምድንጓይ" },
  alertStorm: { en: "Severe thunderstorm - Lake basin", sw: "Dhoruba kali - ziwa", am: "ከባድ ነጎድጓድ", ti: "ከባድ ነጎድጓድ" },
};

/* ------------------------------------------------------------------ */
/* Soil, crop, pest                                                    */
/* ------------------------------------------------------------------ */
export const SOIL_SAMPLES: Record<string, SoilProfile> = {
  "Maize": { n: 34, p: 12, k: 28, ph: 5.6, organicMatter: 2.1, moisture: 42, minerals: [{ name: "Zinc", level: 18 }, { name: "Boron", level: 34 }, { name: "Calcium", level: 62 }] },
  "Teff": { n: 41, p: 22, k: 35, ph: 6.1, organicMatter: 3.0, moisture: 38, minerals: [{ name: "Zinc", level: 41 }, { name: "Boron", level: 28 }, { name: "Calcium", level: 71 }] },
  "Coffee (Arabica)": { n: 66, p: 31, k: 48, ph: 5.9, organicMatter: 4.2, moisture: 51, minerals: [{ name: "Zinc", level: 60 }, { name: "Boron", level: 45 }, { name: "Calcium", level: 58 }] },
  "Cassava": { n: 29, p: 15, k: 44, ph: 5.4, organicMatter: 1.8, moisture: 47, minerals: [{ name: "Zinc", level: 22 }, { name: "Boron", level: 30 }, { name: "Calcium", level: 44 }] },
  "Sorghum": { n: 22, p: 18, k: 26, ph: 6.4, organicMatter: 1.6, moisture: 30, minerals: [{ name: "Zinc", level: 26 }, { name: "Boron", level: 20 }, { name: "Calcium", level: 50 }] },
  "Wheat": { n: 45, p: 26, k: 30, ph: 6.8, organicMatter: 2.6, moisture: 35, minerals: [{ name: "Zinc", level: 44 }, { name: "Boron", level: 38 }, { name: "Calcium", level: 66 }] },
};

export const FERT_BLEND = [
  { name: "DAP (18-46-0)", qtyKg: 50, npk: "18-46-0", priceKsh: 3650 },
  { name: "CAN (27-0-0)", qtyKg: 50, npk: "27-0-0", priceKsh: 3100 },
  { name: "Urea (46-0-0)", qtyKg: 25, npk: "46-0-0", priceKsh: 1850 },
  { name: "Bio-organic compost", qtyKg: 100, npk: "3-1.5-2", priceKsh: 900 },
];

export const CROP_STAGES: Record<string, CropStage[]> = {
  "Maize": [
    { key: "e", label: "Emergence", bbch: "10-13", from: "Apr 4", to: "Apr 18", active: false },
    { key: "v", label: "Vegetative", bbch: "14-19", from: "Apr 19", to: "Jun 10", active: true },
    { key: "f", label: "Flowering", bbch: "51-65", from: "Jun 11", to: "Jul 5" },
    { key: "m", label: "Maturity", bbch: "71-87", from: "Jul 6", to: "Aug 20" },
    { key: "h", label: "Harvest", bbch: "90-99", from: "Aug 21", to: "Sep 15" },
  ],
  "Coffee (Arabica)": [
    { key: "e", label: "Blooming", bbch: "51-60", from: "Mar 1", to: "Apr 15", active: true },
    { key: "v", label: "Fruit set", bbch: "71-75", from: "Apr 16", to: "Jun 20" },
    { key: "f", label: "Berry expansion", bbch: "76-78", from: "Jun 21", to: "Sep 30" },
    { key: "m", label: "Berry ripening", bbch: "79-89", from: "Oct 1", to: "Dec 10" },
    { key: "h", label: "Harvest", bbch: "90-99", from: "Dec 11", to: "Feb 28" },
  ],
};

export const NDVI_SERIES: Record<string, NDVIReading[]> = {
  "Maize": [
    { label: "Mar", value: 0.12 }, { label: "Apr", value: 0.24 }, { label: "May", value: 0.42 },
    { label: "Jun", value: 0.61 }, { label: "Jul", value: 0.58 }, { label: "Aug", value: 0.48 },
  ],
  "Coffee (Arabica)": [
    { label: "Mar", value: 0.30 }, { label: "Apr", value: 0.38 }, { label: "May", value: 0.44 },
    { label: "Jun", value: 0.52 }, { label: "Jul", value: 0.56 }, { label: "Aug", value: 0.60 },
  ],
  "Cassava": [
    { label: "Mar", value: 0.18 }, { label: "Apr", value: 0.29 }, { label: "May", value: 0.44 },
    { label: "Jun", value: 0.57 }, { label: "Jul", value: 0.63 }, { label: "Aug", value: 0.67 },
  ],
};

export const YIELD_DRIVERS: YieldDriver[] = [
  { name: "Fertilizer (N) applied on time", impact: +22, good: true },
  { name: "Moisture deficit at flowering", impact: -14, good: false },
  { name: "Fall armyworm pressure", impact: -18, good: false },
  { name: "Legume rotation history", impact: +9, good: true },
  { name: "Weed interference (late weeding)", impact: -6, good: false },
];

export const PESTS: PestDiagnosis[] = [
  {
    id: "p1", name: "Fall Armyworm", crop: "Maize", confidence: 94, severity: "high",
    symptoms: ["Window-pane leaf damage", "Frass in leaf whorl", "Ragged defoliation", "Hole-punched grain"],
    chemical: "Emamectin benzoate 5% SG @ 150 g/ha at dusk",
    bio: "Neem extract 30 ml/L + Beauveria bassiana 2 g/L",
    prevention: "Early scouting Mon-Thu, intercropping with desmodium, push-pull strategy",
  },
  {
    id: "p2", name: "Maize Lethal Necrosis (MLN)", crop: "Maize", confidence: 88, severity: "high",
    symptoms: ["Chlorotic leaf streaks", "Leaf necrosis from edges", "Stunted yellowing plants", "Poor cob fill"],
    chemical: "No cure - rogue and destroy infected plants",
    bio: "None - sanitation focus",
    prevention: "Resistant hybrids (e.g. SJC4H330), control vectors with thiamethoxam seed dressing",
  },
  {
    id: "p3", name: "Cassava Mosaic Disease", crop: "Cassava", confidence: 91, severity: "medium",
    symptoms: ["Yellow-green mosaic leaf pattern", "Leaf distortion", "Stunted growth"],
    chemical: "No direct cure - use clean cuttings",
    bio: "Rogue infected plants, plant tolerant varieties (Nase 4, Nase 14)",
    prevention: "Clean planting material, vector whitefly control with neem oil sprays",
  },
  {
    id: "p4", name: "Coffee Berry Disease", crop: "Coffee (Arabica)", confidence: 82, severity: "medium",
    symptoms: ["Dark sunken lesions on green berries", "Premature berry drop", "Brown spots on twigs"],
    chemical: "Copper oxychloride 50% WP @ 3 kg/ha every 14 days",
    bio: "Trichoderma-based sprays + shade management",
    prevention: "Prune for airflow, harvest ripe berries weekly, avoid wet canopy",
  },
  {
    id: "p5", name: "Desert Locust (foraging)", crop: "Sorghum", confidence: 77, severity: "high",
    symptoms: ["Mass defoliation of standing crop", "Hopper bands in field margins", "Chewed leaf edges"],
    chemical: "Fenitrothion ULV aerial/oil-based spray (government-supervised)",
    bio: "Early band control with Metarhizium acridum biopesticide",
    prevention: "Report bands to district plant health desk immediately",
  },
];

/* ------------------------------------------------------------------ */
/* Market                                                              */
/* ------------------------------------------------------------------ */
export const HUBS = ["Nairobi", "Addis Ababa", "Eldoret", "Dar es Salaam", "Asmara", "Kigali"];

export const MARKET_QUOTES: MarketQuote[] = [
  { id: "m1", crop: "Maize", hub: "Nairobi", country: "Kenya", price: 52, change24: +2.4, trend: [48, 49, 50, 49, 51, 50, 52, 51, 53, 52], season: "mid" },
  { id: "m2", crop: "Maize", hub: "Addis Ababa", country: "Ethiopia", price: 48, change24: +0.8, trend: [46, 47, 46, 48, 47, 49, 48, 49, 48, 48], season: "mid" },
  { id: "m3", crop: "Teff", hub: "Addis Ababa", country: "Ethiopia", price: 190, change24: -1.2, trend: [200, 196, 194, 195, 192, 191, 190, 189, 191, 190], season: "peak" },
  { id: "m4", crop: "Coffee (Arabica)", hub: "Kigali", country: "Rwanda", price: 320, change24: +3.1, trend: [290, 295, 300, 298, 305, 310, 308, 312, 315, 320], season: "peak" },
  { id: "m5", crop: "Cassava", hub: "Dar es Salaam", country: "Tanzania", price: 34, change24: -0.5, trend: [36, 35, 36, 34, 35, 34, 33, 34, 33, 34], season: "off" },
  { id: "m6", crop: "Sorghum", hub: "Asmara", country: "Eritrea", price: 58, change24: +1.6, trend: [54, 55, 56, 55, 57, 56, 57, 58, 57, 58], season: "mid" },
  { id: "m7", crop: "Wheat", hub: "Eldoret", country: "Kenya", price: 61, change24: +0.4, trend: [60, 60, 59, 61, 60, 62, 61, 62, 61, 61], season: "mid" },
  { id: "m8", crop: "Teff", hub: "Mekelle", country: "Ethiopia", price: 182, change24: -0.9, trend: [188, 187, 185, 184, 183, 185, 184, 183, 183, 182], season: "peak" },
];

export const BUYER_DEALS: BuyerDeal[] = [
  { id: "b1", crop: "Maize", qtyT: 12, buyer: "Eastern Grain Millers", hub: "Nairobi", price: 55, validityDays: 6 },
  { id: "b2", crop: "Coffee (Arabica)", qtyT: 3, buyer: "Rwanda Coffee Co.", hub: "Kigali", price: 335, validityDays: 10 },
  { id: "b3", crop: "Sorghum", qtyT: 8, buyer: "Asmara Brewery Ltd", hub: "Asmara", price: 61, validityDays: 4 },
];

/* ------------------------------------------------------------------ */
/* AI Copilot, finance, wisdom                                         */
/* ------------------------------------------------------------------ */
export const PROMPT_CHIPS: PromptChip[] = [
  { key: "maize", text: "My maize leaves have holes and frass. What do I do?" },
  { key: "weather", text: "Should I plant this week in Nakuru?" },
  { key: "fertilizer", text: "My soil N is low. Best fertilizer for maize?" },
  { key: "price", text: "Where is the best maize price today?" },
  { key: "loan", text: "Can I get input credit for next season?" },
  { key: "sw", text: "Nataka ushauri wa mvua ya wiki hii" },
];

export const BOT_FIRST: Dict = {
  en: "Jambo! I am ShambaGPT, your CRAIS agronomy copilot. Ask me about planting windows, pests, soil or markets in English, Kiswahili, Amharic or Tigrinya.",
  sw: "Habari! Mimi ni ShambaGPT, kopiloti yako ya CRAIS. Uliza kuhusu upandaji, wadudu, udongo au soko.",
  am: "ሰላም! እኔ ShambaGPT ነኝ፣ የCRAIS የግብርና አጋርህ። ስለ መዝራት፣ ተባዮች፣ አፈር ወይም ገበያ ጠይቅ።",
  ti: "ሰላም! ኣነ ShambaGPT፣ ሓጋዚ ግብርና CRAIS። ብዛዕባ ምዝራእ፣ ሓሽሽ፣ ሓመድ ወይ ሱቕ ሕተት።",
};

export const BOT_CANNED: Record<string, Dict[]> = {
  maize: [
    { en: "That matches Fall Armyworm (Spodoptera frugiperda). Act in 48 hours: spray Emamectin benzoate 5% SG at 150 g/ha in the evening, or use neem extract 30 ml/L for organic plots.", sw: "Huo ni mchawi wa mahindi. Kagua shamba leo na nyunyizia dawa jioni.", am: "ይህ የአንበጣ ተባይ ነው። በ48 ሰዓት ውስጥ ይታከም።", ti: "እዚ ሓሽሽ ፋል ኣርምዎርም እዩ። ኣብ 48 ሰዓት ኣኽኢልካ ኣኽብ።" },
    { en: "Add Beauveria bassiana 2 g/L for biological control. Scout again in 5 days and report if live larvae remain.", sw: "Ongeza dawa ya kibayolojia. Pigia CRAIS baada ya siku 5.", am: "ባዮሎጂካል ህክምና ጨምር። በ5 ቀናት ውስጥ መልሰህ ተመልከት።", ti: "ጨመር ባዮሎጂካል ሕክምና። ድሕሪ 5 መዓልቲ ተመልከት።" },
  ],
  weather: [
    { en: "Nakuru Zone 4B: heavy rain Tue-Wed (70-90%), dry Thu, storms Friday. Plant on Saturday or Sunday when seedbeds drain. Avoid bare-soil planting before the storm.", sw: "Mvua kubwa Jumanne na Jumatano. Panda Jumamosi baada ya mvua.", am: "በማክሮሰን ዝናብ ይመጣል። ቅዳሜ ላይ ይዝራ።", ti: "ዝናብ ኣብ ሰሉስን ረቡዕን። ቅዳሜ ተኽል።" },
  ],
  fertilizer: [
    { en: "Soil N at 34 ppm is low for maize (target 60+). On the 1.2 ha maize block apply 100 kg/ha DAP at planting or top-dress 50 kg/ha CAN now, split at knee height and tasseling.", sw: "N yako iko chini. Weka CAN 50 kg/ha sasa.", am: "ናይትሮጅን ዝቅተኛ ነው። CAN 50kg ተጠቀም።", ti: "ናይትሮጅን ዝቑል እዩ። CAN 50kg ተጠቀም።" },
  ],
  price: [
    { en: "Best maize today: Nairobi KSh 52/kg (millers), Eldoret KSh 50. Eldoret is 8% below Nairobi. Teff is strong at KSh 190 in Addis, and Arabica coffee peaked at KSh 320 in Kigali.", sw: "Bei bora ya mahindi ni Nairobi na Eldoret. Kahawa ni KSh 320 Kigali.", am: "የበቆሎ ዋጋ ናይሮቢ 52 ብር/ኪግ።", ti: "ዋጋ በቆሎ ናይሮቢ 52።" },
  ],
  loan: [
    { en: "Your resilience score is 82. You qualify for input credit of up to KSh 250,000 at 12.5% through the CRAIS micro-credit window, subject to a maize collateral pledge of 2.4 ha.", sw: "Umestahili mikopo ya pembejeo hadi KSh 250,000.", am: "የብድር ብቁነትህ አረንጓዴ ነው።", ti: "ብቕዓት ብድሪ ጽቡቕ እዩ።" },
  ],
  sw: [
    { en: "Wiki hii: mvua Jumanne-Jumatano (70-90%), kiangazi Alhamisi, radi Ijumaa. Panda Jumamosi asubuhi. Tumia mbegu zilizothibitishwa na dawa ya kuzuia wadudu.", sw: "Wiki hii: mvua Jumanne-Jumatano (70-90%), kiangazi Alhamisi, radi Ijumaa. Panda Jumamosi asubuhi. Tumia mbegu zilizothibitishwa na dawa ya kuzuia wadudu.", am: "በዚህ ሳምንት ዝናብ አለ። ቅዳሜ ይዝራ።", ti: "ኣብዚ ሰሙን ዝናብ ኣሎ። ቅዳሜ ተኽል።" },
  ],
};

export const DEALERS: Dealer[] = [
  { id: "d1", name: "Nakuru Seed & Agro", town: "Nakuru", stock: true, items: [{ name: "DAP 50kg", price: 3700, unit: "bag" }, { name: "Maize seed (DK8031)", price: 4200, unit: "10kg" }, { name: "Emamectin 5% SG", price: 1450, unit: "100g" }] },
  { id: "d2", name: "Addis Agri Supply", town: "Addis Ababa", stock: false, items: [{ name: "Urea 50kg", price: 2150, unit: "bag" }, { name: "Teff seed (Quncho)", price: 5800, unit: "20kg" }, { name: "Copper oxychloride", price: 990, unit: "500g" }] },
  { id: "d3", name: "Mwanza Fertilizer Mart", town: "Mwanza", stock: true, items: [{ name: "CAN 50kg", price: 3220, unit: "bag" }, { name: "NPK 17-17-17", price: 3980, unit: "bag" }, { name: "Neem oil 1L", price: 850, unit: "L" }] },
];

export const INSURANCE: InsurancePolicy[] = [
  { crop: "Maize", premium: 4200, coverage: 120000, trigger: "Rainfall index < 240 mm in 3-month window", status: "active", payoutKsh: 0 },
  { crop: "Sorghum", premium: 3100, coverage: 85000, trigger: "Drought index (SPI-3 < -1.5)", status: "active", payoutKsh: 0 },
  { crop: "Wheat", premium: 5400, coverage: 160000, trigger: "Hail event detected by satellite", status: "claimed", payoutKsh: 48000 },
];

export const CREDIT_PROFILE: CreditProfile = {
  score: 82,
  band: "good",
  maxLoan: 250000,
  rate: 12.5,
  factors: [
    { label: "Yield history (4 seasons)", good: true },
    { label: "Co-op repayment record", good: true },
    { label: "Irrigation access", good: false },
    { label: "DTM savings balance", good: true },
    { label: "Weather-risk exposure", good: false },
  ],
};

export const WISDOM_RECORDS: WisdomRecord[] = [
  { id: "w1", title: "Acacia tortilis flowering", group: "Indicator", text: "When Acacia tortilis blooms early, elders predict a strong short-rains onset within 2-3 weeks. Time land preparation, not planting, at first bloom.", region: "Rift Valley, Kenya", source: "Kisii elders" },
  { id: "w2", title: "Star alignment (Kifunguo)", group: "Indicator", text: "Mangala star cluster visible before dawn signals the main rains of the long season. Farmers broadcast nurseries after the third consecutive morning sighting.", region: "Lake Victoria Basin", source: "Sukuma traditions" },
  { id: "w3", title: "Weaver bird nest height", group: "Indicator", text: "Nests built high in acacia predict an above-normal flood year; low nests predict dry conditions. Adjust maize variety length and drainage accordingly.", region: "Tigray Plateau", source: "Tigrayan herders" },
  { id: "w4", title: "Neem + chili foliar spray", group: "Practice", text: "Crush 100 g neem leaves with 2 hot chilies, steep 24 h in 1 L water, strain, and spray on kale and beans against aphids and whiteflies.", region: "Dodoma corridor", source: "Gogo women groups" },
  { id: "w5", title: "Push-pull with desmodium", group: "Practice", text: "Border maize with desmodium (push) and napier grass (pull) to suppress striga and stem borer while fixing soil nitrogen.", region: "Rift Valley, Kenya", source: "ICIPE-validated" },
  { id: "w6", title: "Moon-phase bean planting", group: "Calendar", text: "Plant climbing beans in the waxing moon after the first soaking rain to align germination with declining pest activity in the wet phase.", region: "Rwanda highlands", source: "Kinyarwanda calendar" },
  { id: "w7", title: "Ash + fishbone furrow trap", group: "Practice", text: "Dust wood ash in a shallow furrow around the nursery to deter cutworms, and refill after every rain event.", region: "Tigray Plateau", source: "Tigrayan farmers" },
  { id: "w8", title: "Wind-shift rule", group: "Indicator", text: "Three consecutive days of dry easterly wind after the long rains signal locust hopper migration; sweep field margins and report bands.", region: "Somali & Afar border", source: "Pastoralist monitors" },
];

export const SEASON_CALENDAR: Record<string, SeasonEntry[]> = {
  "Maize": [
    { month: "Mar", activity: "Land prep + soil test", crop: "Maize" },
    { month: "Apr", activity: "Plant after soaking rain", crop: "Maize" },
    { month: "May", activity: "Top-dress N at knee height", crop: "Maize" },
    { month: "Jun", activity: "Scout armyworm, second weeding", crop: "Maize" },
    { month: "Jul", activity: "Tasseling, moisture watch", crop: "Maize" },
    { month: "Aug", activity: "Harvest + dry, store aerated", crop: "Maize" },
  ],
  "Teff": [
    { month: "Jun", activity: "Seedbed + nursery broadcast", crop: "Teff" },
    { month: "Jul", activity: "Thin stands, weed week 3", crop: "Teff" },
    { month: "Aug", activity: "Top-dress urea 50 kg/ha", crop: "Teff" },
    { month: "Sep", activity: "Booting, rust watch", crop: "Teff" },
    { month: "Oct", activity: "Harvest at straw yellow", crop: "Teff" },
    { month: "Nov", activity: "Thresh, market via union", crop: "Teff" },
  ],
  "Coffee (Arabica)": [
    { month: "Mar", activity: "Prune + copper spray", crop: "Coffee (Arabica)" },
    { month: "May", activity: "Mulch and manure ring", crop: "Coffee (Arabica)" },
    { month: "Jul", activity: "Berry expansion, shade check", crop: "Coffee (Arabica)" },
    { month: "Sep", activity: "Leaf rust scouting", crop: "Coffee (Arabica)" },
    { month: "Nov", activity: "First ripe pick, cherry sorting", crop: "Coffee (Arabica)" },
    { month: "Jan", activity: "Main harvest, wet mill", crop: "Coffee (Arabica)" },
  ],
};

/* ------------------------------------------------------------------ */
/* Decision engine                                                     */
/* ------------------------------------------------------------------ */
export const NBA_ACTIONS: NBAAction[] = [
  { id: "n1", titleKey: "nbaFert", urgency: 1, impact: 22, roi: 18400, reasons: ["Maize N at 34 ppm vs 60 target", "Zinc 18 ppm deficient", "Top-dress window closes in 9 days"], tag: "soil" },
  { id: "n2", titleKey: "nbaPest", urgency: 2, impact: 18, roi: 12100, reasons: ["Armyworm damage pattern detected", "Rain forecast 80% Tue-Wed", "Spray window pre-rain"], tag: "pest" },
  { id: "n3", titleKey: "nbaMarket", urgency: 3, impact: 9, roi: 9600, reasons: ["Nairobi maize up 2.4% today", "Grain miller bid KSh 55/kg", "Offer valid 6 days"], tag: "market" },
];

/* ------------------------------------------------------------------ */
/* USSD, SMS, IVR                                                      */
/* ------------------------------------------------------------------ */
export const USSD_TREE: UsdsNode[] = [
  {
    id: "root",
    title: { en: "Welcome to CRAIS Agri-Service", sw: "Karibu CRAIS Kilimo", am: "እንኳን ደህና መጡ ወደ CRAIS", ti: "እንቋዕ ብደሓን መጻእኩም CRAIS" },
    options: [
      { label: { en: "Prices", sw: "Bei", am: "ዋጋ", ti: "ዋጋ" }, next: "prices" },
      { label: { en: "Weather", sw: "Hali", am: "የአየር", ti: "ኩነታት" }, next: "weather" },
      { label: { en: "Report pest", sw: "Ripoti wadudu", am: "ተባይ ሪፖርት", ti: "ሕሽሽ ሪፖርት" }, next: "report" },
      { label: { en: "Agent callback", sw: "Wito wa afisa", am: "የባለሙያ ጥሪ", ti: "ጽውዒት" }, next: "callback" },
    ],
  },
  {
    id: "prices",
    title: { en: "Price service - select crop", sw: "Bei - chagua zao", am: "ዋጋ - ሰብል ምረጥ", ti: "ዋጋ - ምረጽ" },
    options: [
      { label: { en: "Maize", sw: "Mahindi", am: "በቆሎ", ti: "በቆሎ" }, next: "priceMaize" },
      { label: { en: "Teff", sw: "Ulezi", am: "ጤፍ", ti: "ጤፍ" }, next: "priceTeff" },
      { label: { en: "Coffee", sw: "Kahawa", am: "ቡና", ti: "ቡን" }, next: "priceCoffee" },
      { label: { en: "Back", sw: "Rudi", am: "ተመለስ", ti: "ተመለስ" }, next: "root" },
    ],
  },
  {
    id: "priceMaize",
    title: { en: "Maize prices (KSh/kg)", sw: "Bei ya mahindi", am: "የበቆሎ ዋጋ", ti: "ዋጋ በቆሎ" },
    options: [{ label: { en: "Back", sw: "Rudi", am: "ተመለስ", ti: "ተመለስ" }, next: "prices" }],
    sms: { en: "Maize: Nairobi KSh 52/kg (+2.4%), Eldoret KSh 50. Millers bid 55 for 12T.", sw: "Mahindi: Nairobi 52, Eldoret 50. Mnunuzi 55.", am: "በቆሎ: ናይሮቢ 52, ኤልዶረት 50.", ti: "በቆሎ: ናይሮቢ 52, ኤልዶረት 50." },
  },
  {
    id: "priceTeff",
    title: { en: "Teff prices (KSh/kg)", sw: "Bei ya ulezi", am: "የጤፍ ዋጋ", ti: "ዋጋ ጤፍ" },
    options: [{ label: { en: "Back", sw: "Rudi", am: "ተመለስ", ti: "ተመለስ" }, next: "prices" }],
    sms: { en: "Teff: Addis Ababa KSh 190/kg, Mekelle 182. White teff premium +8%.", sw: "Ulezi: Addis 190, Mekelle 182.", am: "ጤፍ: አዲስ 190, መቀለ 182.", ti: "ጤፍ: ኣዲስ 190, መቐለ 182." },
  },
  {
    id: "priceCoffee",
    title: { en: "Coffee price (KSh/kg)", sw: "Bei ya kahawa", am: "የቡና ዋጋ", ti: "ዋጋ ቡን" },
    options: [{ label: { en: "Back", sw: "Rudi", am: "ተመለስ", ti: "ተመለስ" }, next: "prices" }],
    sms: { en: "Arabica cherry: Kigali KSh 320/kg (+3.1%), peak season. Use union auction.", sw: "Kahawa: Kigali 320.", am: "ቡና: ኪጋሊ 320.", ti: "ቡን: ኪጋሊ 320." },
  },
  {
    id: "weather",
    title: { en: "7-day outlook", sw: "Hali ya siku 7", am: "የ7 ቀን ትንበያ", ti: "ናይ 7 መዓልቲ ትንበያ" },
    options: [
      { label: { en: "Back", sw: "Rudi", am: "ተመለስ", ti: "ተመለስ" }, next: "root" },
    ],
    sms: { en: "Tue-Wed heavy rain 70-90%, Fri storms. Plant Sat AM. Flood watch highlands.", sw: "Mvua Jumanne hadi Jumatano. Panda Jumamosi.", am: "ማክሰኞ-ረቡዕ ዝናብ። ቅዳሜ ይዝራ።", ti: "ሰሉስ-ረቡዕ ዝናብ። ቅዳሜ ተኽል።" },
  },
  {
    id: "report",
    title: { en: "Pest report - select type", sw: "Ripoti - chagua", am: "ሪፖርት - ምረጥ", ti: "ሪፖርት - ምረጽ" },
    options: [
      { label: { en: "Armyworm", sw: "Mchawi", am: "አንበጣ ትል", ti: "ሓሽሽ" }, next: "reportArmyworm" },
      { label: { en: "Locust band", sw: "Nzige", am: "አንበጣ", ti: "መሬት ሓሰር" }, next: "reportLocust" },
      { label: { en: "Back", sw: "Rudi", am: "ተመለስ", ti: "ተመለስ" }, next: "root" },
    ],
  },
  {
    id: "reportArmyworm",
    title: { en: "Armyworm report received", sw: "Ripoti imepokelewa", am: "ሪፖርት ተቀብሏል", ti: "ሪፖርት ተቐቢሉ" },
    options: [{ label: { en: "Back", sw: "Rudi", am: "ተመለስ", ti: "ተመለስ" }, next: "root" }],
    sms: { en: "Village scout dispatched. Spray Emamectin 150g/ha at dusk. CRAIS ref: AW-2214.", sw: "Afisa atumwa. Nyunyizia dawa jioni. Ref AW-2214.", am: "ባለሙያ ተልኳል። ማታ ይረጭ። ሪፈረንስ AW-2214.", ti: "ሞያዊ ተላኢኹ። ምሸት ረጭ። መለለዪ AW-2214." },
  },
  {
    id: "reportLocust",
    title: { en: "Locust hopper band logged", sw: "Kundi la nzige limerekodiwa", am: "የአንበጣ ቡድን ተመዝግቧል", ti: "መሬት ሓሰር ተመዝጊቡ" },
    options: [{ label: { en: "Back", sw: "Rudi", am: "ተመለስ", ti: "ተመለስ" }, next: "root" }],
    sms: { en: "District plant health desk alerted. Do not spray ULV yourself. Monitor margins.", sw: "Ofisi ya kilimo imearifiwa. Usinyunyize peke yako.", am: "የግብርና ጽህፈት ቤት ተገልጿል።", ti: "መድረኽ ግብርና ተመላኺቱ።" },
  },
  {
    id: "callback",
    title: { en: "Agent will call within 2 hours", sw: "Afisa atapiga simu baada ya saa 2", am: "ባለሙያ በ2 ሰዓት ይደውላል", ti: "ወኪል ኣብ 2 ሰዓታት ክድውል እዩ" },
    options: [{ label: { en: "Back", sw: "Rudi", am: "ተመለስ", ti: "ተመለስ" }, next: "root" }],
    sms: { en: "Extension officer Mary will call +254 712 445 908 within 2 hours. Have your parcel ID ready.", sw: "Afisa Mary atapiga simu ndani ya saa 2.", am: "ባለሙያ ሜሪ በ2 ሰዓት ይደውላል።", ti: "ሞያዊት ማርያም ኣብ 2 ሰዓታት ክትድውል እያ።" },
  },
];

export const SMS_COMMANDS: MsgCmd[] = [
  { cmd: "PRICE MAIZE", reply: { en: "Maize: Nairobi KSh 52/kg (+2.4%), Eldoret 50. Millers bid 55 for 12T. Use CRAIS deal #B1.", sw: "Mahindi: Nairobi 52, Eldoret 50.", am: "በቆሎ: ናይሮቢ 52.", ti: "በቆሎ: ናይሮቢ 52." } },
  { cmd: "WEATHER", reply: { en: "Nakuru 4B: Tue-Wed rain 70-90%, Thu dry, Fri storms. Plant Sat AM. Flood watch in highlands.", sw: "Mvua Jumanne-Jumatano, panda Jumamosi.", am: "ዝናብ ማክሰኞ-ረቡዕ፣ ቅዳሜ ይዝራ።", ti: "ዝናብ ሰሉስ-ረቡዕ፣ ቅዳሜ ተኽል።" } },
  { cmd: "PEST ARMYWORM", reply: { en: "FAW confirmed pattern. Spray Emamectin 150g/ha at dusk. Scout in 5 days. Ref AW-2214.", sw: "Mchawi. Nyunyiza dawa jioni. Ref AW-2214.", am: "አንበጣ ትል። ማታ ርጭ።", ti: "ሓሽሽ። ምሸት ረጭ።" } },
  { cmd: "SOIL", reply: { en: "Your maize block: N 34 ppm (low), P 12, K 28, pH 5.6. Top-dress CAN 50kg/ha this week.", sw: "Udongo: N chini. Weka CAN 50kg/ha.", am: "አፈር: ናይትሮጅን ዝቅተኛ። CAN 50kg.", ti: "ሓመድ: ናይትሮጅን ዝቑል። CAN 50kg." } },
  { cmd: "INPUT STOCK", reply: { en: "Nakuru Seed & Agro: DAP 3700, seed DK8031 4200, Emamectin 1450. Stock confirmed.", sw: "Duka Nakuru lina bidhaa zote.", am: "መደብር ናኩሩ ሁሉንም አለው።", ti: "መደብር ናኩሩ ኩሉ ኣለዎ።" } },
  { cmd: "HELP", reply: { en: "Commands: PRICE <CROP>, WEATHER, PEST <PEST>, SOIL, INPUT STOCK, TALK (agent callback), HELP.", sw: "Amri: PRICE, WEATHER, PEST, SOIL, HELP.", am: "ትዕዛዞች: PRICE, WEATHER, PEST, SOIL, HELP.", ti: "ትእዛዛት: PRICE, WEATHER, PEST, SOIL, HELP." } },
];

export const SMS_LOG: SMAction[] = [
  { text: "PRICE MAIZE", class: "sent", time: "07:02" },
  { text: "Maize: Nairobi KSh 52/kg (+2.4%), Eldoret 50. Millers bid 55 for 12T. Use CRAIS deal #B1.", class: "received", time: "07:02" },
  { text: "WEATHER", class: "sent", time: "07:04" },
  { text: "Nakuru 4B: Tue-Wed rain 70-90%, Thu dry, Fri storms. Plant Sat AM. Flood watch in highlands.", class: "received", time: "07:04" },
  { text: "PEST ARMYWORM", class: "sent", time: "07:11" },
  { text: "FAW confirmed pattern. Spray Emamectin 150g/ha at dusk. Scout in 5 days. Ref AW-2214.", class: "received", time: "07:11" },
];

export const IVR_PROMPTS: Dict[] = [
  {
    en: "Hello! This is the CRAIS voice service. Press 1 for today's weather, 2 for maize prices, 3 to report pests, or 4 to speak with an agronomist.",
    sw: "Habari! Hii ni huduma ya sauti ya CRAIS. Bonyeza 1 kwa hali ya hewa, 2 kwa bei ya mahindi, 3 kwa wadudu, 4 kwa mtaalamu.",
    am: "ሰላም! ይህ የCRAIS የድምጽ አገልግሎት ነው። 1 ለአየር ሁኔታ፣ 2 ለበቆሎ ዋጋ፣ 3 ለተባይ ሪፖርት፣ 4 ለባለሙያ ይጫኑ።",
    ti: "ሰላም! እዚ ናይ CRAIS ናይ ድምለይ ኣገልግሎት እዩ። 1 ንኩነታት ኣየር፣ 2 ንዋጋ በቆሎ፣ 3 ንሕሽሽ፣ 4 ንሞያዊ ጸንቁ።",
  },
  {
    en: "Today's weather: light rain this morning, clearing by noon. High 24, low 13 degrees. Sowing window opens Saturday.",
    sw: "Hali ya leo: mvua kidogo asubuhi. Panda Jumamosi.",
    am: "የዛሬ ሁኔታ: ጠዋት ዝናብ፣ ቅዳሜ ይዝራ።",
    ti: "ናይ ሎሚ ኩነታት: ንግሆ ዝናብ፣ ቅዳሜ ተኽል።",
  },
];

/* ------------------------------------------------------------------ */
/* Offline queue                                                       */
/* ------------------------------------------------------------------ */
export const OFFLINE_QUEUE: QueueItem[] = [
  { id: "q1", op: "USSD", target: "*384*55#", summary: "Pest report - Armyworm (AW-2214)", ts: "06:58" },
  { id: "q2", op: "SMS", target: "+255 754 118 220", summary: "Advisory: top-dress CAN 50kg/ha", ts: "07:10" },
  { id: "q3", op: "VC", target: "IVR call session", summary: "Weather prompt playback (SW)", ts: "07:15" },
];

export const OFFLINE_STATS: OfflineStats = {
  pending: 3,
  synced: 128,
  conflicts: 1,
  lastSync: "07:12",
};

export const NETWORK_MODES: { id: NetworkMode; labelKey: string; icon: string }[] = [
  { id: "4g", labelKey: "net4g", icon: "4g" },
  { id: "2g", labelKey: "net2g", icon: "2g" },
  { id: "offline", labelKey: "netOffline", icon: "off" },
];

export const STATUS_FEEDS: Record<string, { title: string; body: string; mode: "success" | "info" | "warn" }[]> = {
  sow: [
    { title: "Sowing window", body: "Nakuru 4B: rains taper Saturday; seedbeds drain by Sunday. Plant maize and beans Sunday dawn.", mode: "success" },
    { title: "Sowing advisory", body: "Moisture index at 68% and rising. Use certified DK8031 at 25 kg/ha, 75 cm row spacing.", mode: "info" },
  ],
  fert: [
    { title: "Top-dress reminder", body: "CAN 50 kg/ha applied now lifts grain yield by ~22%. Window closes in 9 days.", mode: "success" },
    { title: "Soil note", body: "Zinc below threshold. Apply 5 kg/ha ZnSO4 with the second weeding.", mode: "info" },
  ],
  harvest: [
    { title: "Harvest readiness", body: "Grain moisture 15.5%; field dry-down accelerates. Start staggered harvest this week.", mode: "success" },
    { title: "Market tie-in", body: "Millers' bid KSh 55/kg beats spot by 6%. Deliver graded maize to Nairobi hub.", mode: "info" },
  ],
  pest: [
    { title: "Scout result", body: "5 of 20 plants show FAW whorl damage. Threshold breached; spray Emamectin 150 g/ha at dusk.", mode: "warn" },
    { title: "Bio option", body: "Organic plots: neem 30 ml/L + Beauveria 2 g/L, repeat in 7 days.", mode: "info" },
  ],
};

export const CREDIT_BANDS = [
  { key: "excellent", label: "Excellent", min: 85 },
  { key: "good", label: "Good", min: 70 },
  { key: "medium", label: "Fair", min: 50 },
  { key: "low", label: "Building", min: 0 },
] as const;