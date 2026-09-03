import type { MsgCmd, NetworkMode, QueueItem, SMAction, UsdsNode } from "../types/crais";

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
    options: [{ label: { en: "Back", sw: "Rudi", am: "ተመለስ", ti: "ተመለስ" }, next: "root" }],
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

export const IVR_PROMPTS: Record<string, string>[] = [
  {
    en: "Hello! This is the CRAIS voice service. Press 1 for today's weather, 2 for maize prices, 3 to report pests, or 4 to speak with an agronomist.",
    sw: "Habari! Hii ni huduma ya sauti ya CRAIS. Bonyeza 1 kwa hali ya hewa, 2 kwa bei ya mahindi, 3 kwa wadudu, 4 kwa mtaalamu.",
    am: "ሰላም! ይህ የCRAIS የድምጽ አገልግሎት ነው። 1 ለአየር ሁኔታ፣ 2 ለበቆሎ ዋጋ፣ 3 ለተባይ ሪፖርት፣ 4 ለባለሙያ ይጫኑ።",
    ti: "ሰላም! እዚ ናይ CRAIS ናይ ድምለይ ኣገልግሎት እዩ። 1 ንኩነታት ኣየር፣ 2 ንዋጋ በቆሎ፣ 3 ንሕሽሽ፣ 4 ንሞያዊ ጸንቁ።" },
  {
    en: "Today's weather: light rain this morning, clearing by noon. High 24, low 13 degrees. Sowing window opens Saturday.",
    sw: "Hali ya leo: mvua kidogo asubuhi. Panda Jumamosi.",
    am: "የዛሬ ሁኔታ: ጠዋት ዝናብ፣ ቅዳሜ ይዝራ።",
    ti: "ናይ ሎሚ ኩነታት: ንግሆ ዝናብ፣ ቅዳሜ ተኽል።" },
];

export const IVR_PROMPT_KEYS = ["welcome", "weather"] as const;

export const OFFLINE_QUEUE: QueueItem[] = [
  { id: "q1", op: "USSD", target: "*384*55#", summary: "Pest report - Armyworm (AW-2214)", ts: "06:58" },
  { id: "q2", op: "SMS", target: "+255 754 118 220", summary: "Advisory: top-dress CAN 50kg/ha", ts: "07:10" },
  { id: "q3", op: "VC", target: "IVR call session", summary: "Weather prompt playback (SW)", ts: "07:15" },
];

export const OFFLINE_STATS = {
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