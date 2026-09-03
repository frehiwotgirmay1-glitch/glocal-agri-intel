import type {
  Alert, BuyerDeal, CreditProfile, CropStage, Dealer, Farmer, InsurancePolicy,
  MarketQuote, NBAAction, NDVIReading, Parcel, PestDiagnosis, PromptChip,
  SeasonEntry, SoilProfile, WeatherDay, WisdomRecord, YieldDriver, Zone,
} from "../types/crais";
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
/* Weather                                                             */
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

/* ------------------------------------------------------------------ */
/* Soil & crop                                                         */
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

/* ------------------------------------------------------------------ */
/* Pest & disease                                                      */
/* ------------------------------------------------------------------ */
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
/* AI Copilot & finance                                                */
/* ------------------------------------------------------------------ */
export const PROMPT_CHIPS: PromptChip[] = [
  { key: "maize", text: "My maize leaves have holes and frass. What do I do?" },
  { key: "weather", text: "Should I plant this week in Nakuru?" },
  { key: "fertilizer", text: "My soil N is low. Best fertilizer for maize?" },
  { key: "price", text: "Where is the best maize price today?" },
  { key: "loan", text: "Can I get input credit for next season?" },
  { key: "sw", text: "Nataka ushauri wa mvua ya wiki hii" },
];

export const BOT_FIRST: Record<string, string> = {
  en: "Jambo! I am ShambaGPT, your CRAIS agronomy copilot. Ask me about planting windows, pests, soil or markets in English, Kiswahili, Amharic or Tigrinya.",
  sw: "Habari! Mimi ni ShambaGPT, kopiloti yako ya CRAIS. Uliza kuhusu upandaji, wadudu, udongo au soko.",
  am: "ሰላም! እኔ ShambaGPT ነኝ፣ የCRAIS የግብርና አጋርህ። ስለ መዝራት፣ ተባዮች፣ አፈር ወይም ገበያ ጠይቅ።",
  ti: "ሰላም! ኣነ ShambaGPT፣ ሓጋዚ ግብርና CRAIS። ብዛዕባ ምዝራእ፣ ሓሽሽ፣ ሓመድ ወይ ሱቕ ሕተት።",
};

export const BOT_CANNED: Record<string, Record<string, string>[]> = {
  maize: [
    { en: "That matches Fall Armyworm (Spodoptera frugiperda). Act in 48 hours: spray Emamectin benzoate 5% SG at 150 g/ha in the evening, or use neem extract 30 ml/L for organic plots.", sw: "Huo ni mchawi wa mahindi. Kagua shamba leo na nyunyizia dawa jioni.", am: "ይህ የአንበጣ ተባይ ነው። በ48 ሰዓት ውስጥ ይታከም።", ti: "እዚ ሓሽሽ ፋል ኣርምዎርም እዩ። ኣብ 48 ሰዓት ኣኽኢልካ ኣኽብ።" },
    { en: "Add Beauveria bassiana 2 g/L for biological control. Scout again in 5 days and report if live larvae remain.", sw: "Ongeza dawa ya kibayolojia. Pigia CRAIS baada ya siku 5.", am: "ባዮሎጂካል ህክምና ጨምር። በ5 ቀናት ውስጥ መልሰህ ተመልከት።", ti: "ጨመር ባዮሎጂካል ሕክምና። ድሕሪ 5 መዓልቲ ተመልከት።" },
  ],
  weather: [
    { en: "Nakuru Zone 4B: heavy rain Tue-Wed (70-90%), dry Thu, storms Friday. Plant on Saturday or Sunday when seedbeds drain. Avoid bare-soil planting before the storm.", sw: "Mvua kubwa Jumanne na Jumatano. Panda Jumamosi baada ya mvua.", am: "በማክሰኞ ዝናብ ይመጣል። ቅዳሜ ላይ ይዝራ።", ti: "ዝናብ ኣብ ሰሉስን ረቡዕን። ቅዳሜ ተኽል።" },
  ],
  fertilizer: [
    { en: "Soil N at 34 ppm is low for maize (target 60+). On the 2.4 ha maize block apply 100 kg/ha DAP at planting or top-dress 50 kg/ha CAN now, split at knee height and tasseling.", sw: "N yako iko chini. Weka CAN 50 kg/ha sasa.", am: "ናይትሮጅን ዝቅተኛ ነው። CAN 50kg ተጠቀም።", ti: "ናይትሮጅን ዝቑል እዩ። CAN 50kg ተጠቀም።" },
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

/* ------------------------------------------------------------------ */
/* Wisdom & calendar                                                   */
/* ------------------------------------------------------------------ */
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

export function vFmt(v: number, suffix = ""): string {
  return `${(v < 0 ? "" : "+") + v.toFixed(1)}${suffix}`;
}