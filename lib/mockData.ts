/**
 * lib/mockData.ts
 *
 * WEDISON Website: Mock Data Layer (LOCALHOST ONLY)
 *
 * ATURAN DATA INTEGRITY (brief section 54):
 * Angka, harga, spesifikasi, lokasi, dan testimoni disimpan bersama status sumbernya.
 * Setiap nilai faktual dibungkus DataPoint dengan status:
 *   - "verified" : dipublikasikan oleh WEDISON pada kanal resminya
 *   - "mock"     : angka dummy untuk kebutuhan UI dev, TIDAK BOLEH tayang di production
 *   - "required" : sengaja dikosongkan, UI wajib render "[DATA REQUIRED]"
 *
 * Saat pindah ke CMS/DB, bentuk type di bawah dipertahankan supaya komponen tidak perlu diubah.
 */

/* ========================================================================== */
/* 1. CORE TYPES                                                              */
/* ========================================================================== */

export const IS_MOCK_DATA = true as const;

export type Locale = "en" | "id";
export const LOCALES: Locale[] = ["en", "id"];
export const DEFAULT_LOCALE: Locale = "en";

export type Localized<T = string> = Record<Locale, T>;

export type DataStatus = "verified" | "mock" | "required";

export interface DataPoint<T> {
  value: T | null;
  status: DataStatus;
  /** Catatan untuk tim WEDISON: data apa yang dibutuhkan / asumsi mock */
  note?: string;
}

export const DATA_REQUIRED_LABEL = "[DATA REQUIRED]";
export const PLACEHOLDER_LABEL = "[PLACEHOLDER]";

// Helper constructors supaya penulisan data konsisten
const mock = <T>(value: T, note?: string): DataPoint<T> => ({ value, status: "mock", note });
const required = <T = never>(note: string): DataPoint<T> => ({ value: null, status: "required", note });
const verified = <T>(value: T, note?: string): DataPoint<T> => ({ value, status: "verified", note });

/** true kalau nilai boleh dirender sebagai angka/teks biasa */
export const hasValue = <T>(dp: DataPoint<T>): dp is DataPoint<T> & { value: T } =>
  dp.value !== null && dp.status !== "required";

export type CurrencyCode = "IDR" | "USD" | "SGD" | "AUD";

export interface Money {
  amount: number;
  currency: CurrencyCode;
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface ImageAsset {
  src: string;
  alt: Localized;
  width: number;
  height: number;
}

/* ========================================================================== */
/* 2. BRAND & SITE CONFIG                                                     */
/* ========================================================================== */

export const siteConfig = {
  name: "WEDISON",
  /** Entity definition (section 26). Harus identik di semua halaman & schema */
  entityDefinition: {
    en: "WEDISON is an electric motorcycle and electric mobility company.",
    id: "WEDISON adalah perusahaan sepeda motor listrik dan mobilitas listrik.",
  } satisfies Localized,
  tagline: {
    en: "Electric mobility, without the wait.",
    id: "Mobilitas listrik, tanpa menunggu.",
  } satisfies Localized,
  supportingLine: { en: "Charge. Ride. Repeat.", id: "Charge. Ride. Repeat." } satisfies Localized,
  /**
   * Absolute site URL used for sitemap, robots and structured data.
   * Priority: NEXT_PUBLIC_SITE_URL, then the Vercel production domain, then localhost for `npm run dev`.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    "http://localhost:3000"
  ).replace(/\/$/, ""),
  contact: {
    email: "hello@example.com", // MOCK
    phone: "+62 000 0000 0000", // MOCK
    whatsapp: "620000000000", // MOCK, format wa.me tanpa "+"
  },
  social: [
    // URL placeholder. Ganti dengan akun resmi yang sudah diverifikasi
    { platform: "instagram", url: "#", handle: PLACEHOLDER_LABEL },
    { platform: "tiktok", url: "#", handle: PLACEHOLDER_LABEL },
    { platform: "youtube", url: "#", handle: PLACEHOLDER_LABEL },
    { platform: "linkedin", url: "#", handle: PLACEHOLDER_LABEL },
  ],
  /**
   * Brief punya 2 aturan warna yang harus dibedakan:
   * - Tombol KONVERSI (Test Ride, Buy, Book) = orange #FF7400
   * - Brand accent, active state, indikator charging = green
   */
  colors: {
    cta: "#FF7400",
    brandGreen: "#00A86B", // sementara, sampai ada brand guideline resmi
    darkGreen: "#006B45",
    charcoal: "#1A1F1C",
    darkGrey: "#282D2A",
    lightGrey: "#E5E7E7",
    white: "#FFFFFF",
  },
} as const;

/* ========================================================================== */
/* 3. NAVIGATION (section 16)                                                 */
/* href TANPA prefix locale. Prefix /en atau /id ditambahkan oleh LocaleLink. */
/* ========================================================================== */

export interface NavLink {
  label: Localized;
  href: string;
}

export interface NavSection {
  id: string;
  label?: Localized;
  links: NavLink[];
}

export interface NavGroup {
  id: string;
  label: Localized;
  sections: NavSection[];
}

export const mainNavigation: NavGroup[] = [
  {
    id: "motorcycles",
    label: { en: "Motorcycles", id: "Motor" },
    sections: [
      {
        id: "lineup",
        label: { en: "The lineup", id: "Pilihan motor" },
        links: [
          { label: { en: "Motorcycle Overview", id: "Semua Motor" }, href: "/motorcycles" },
          { label: { en: "EDPower", id: "EDPower" }, href: "/motorcycles/ed-power" },
          { label: { en: "Athena", id: "Athena" }, href: "/motorcycles/athena" },
          { label: { en: "Victory", id: "Victory" }, href: "/motorcycles/victory" },
          { label: { en: "Bees Pro", id: "Bees Pro" }, href: "/motorcycles/bees-pro" },
          { label: { en: "Compare Models", id: "Bandingkan Model" }, href: "/compare" },
        ],
      },
    ],
  },
  {
    id: "supercharge",
    label: { en: "SuperCharge", id: "SuperCharge" },
    sections: [
      {
        id: "charging",
        links: [
          { label: { en: "WEDISON SuperCharge", id: "WEDISON SuperCharge" }, href: "/supercharge" },
          { label: { en: "Find a Station", id: "Cari Stasiun" }, href: "/supercharger" },
          { label: { en: "SuperCharge Network", id: "Jaringan SuperCharge" }, href: "/supercharger-network" },
          { label: { en: "Charging Guide", id: "Panduan Charging" }, href: "/charging-guide" },
          { label: { en: "Charging Partnership", id: "Kemitraan Charging" }, href: "/charging-partnership" },
        ],
      },
    ],
  },
  {
    id: "technology",
    label: { en: "Technology", id: "Teknologi" },
    sections: [
      {
        id: "engineering",
        links: [
          { label: { en: "WEDISON Technology", id: "Teknologi WEDISON" }, href: "/technology" },
          { label: { en: "Battery & BMS", id: "Baterai & BMS" }, href: "/battery" },
          { label: { en: "Performance", id: "Performa" }, href: "/performance" },
          { label: { en: "Safety", id: "Keamanan" }, href: "/safety" },
          { label: { en: "Battery Guide", id: "Panduan Baterai" }, href: "/battery-guide" },
        ],
      },
    ],
  },
  {
    id: "ownership",
    label: { en: "Ownership", id: "Kepemilikan" },
    sections: [
      {
        id: "get-started",
        label: { en: "Get started", id: "Mulai" },
        links: [
          { label: { en: "Book a Test Ride", id: "Booking Test Ride" }, href: "/test-ride" },
          { label: { en: "Find a Dealer", id: "Cari Dealer" }, href: "/dealer" },
        ],
      },
      {
        id: "support",
        label: { en: "Ownership & support", id: "Kepemilikan & dukungan" },
        links: [
          { label: { en: "Ownership Guide", id: "Panduan Kepemilikan" }, href: "/ownership-guide" },
          { label: { en: "Ownership Cost", id: "Biaya Kepemilikan" }, href: "/ownership-cost" },
          { label: { en: "Service & Support", id: "Servis & Dukungan" }, href: "/service-support" },
          { label: { en: "FAQ", id: "FAQ" }, href: "/faq" },
        ],
      },
      {
        id: "community",
        label: { en: "Community", id: "Komunitas" },
        links: [
          { label: { en: "WEDISON Riders", id: "WEDISON Riders" }, href: "/riders" },
          { label: { en: "Customer Stories", id: "Cerita Pelanggan" }, href: "/customer-stories" },
        ],
      },
    ],
  },
  {
    id: "discover",
    label: { en: "Discover", id: "Jelajahi" },
    sections: [
      {
        id: "learn",
        label: { en: "Learn", id: "Pelajari" },
        links: [
          { label: { en: "Why Electric", id: "Kenapa Listrik" }, href: "/why-electric" },
          { label: { en: "Articles", id: "Artikel" }, href: "/articles" },
          { label: { en: "Buying Guide", id: "Panduan Membeli" }, href: "/buying-guide" },
          { label: { en: "Sustainability", id: "Keberlanjutan" }, href: "/sustainability" },
        ],
      },
      {
        id: "company",
        label: { en: "Company", id: "Perusahaan" },
        links: [
          { label: { en: "About WEDISON", id: "Tentang WEDISON" }, href: "/about" },
          { label: { en: "Our Story", id: "Cerita Kami" }, href: "/our-story" },
          { label: { en: "Careers", id: "Karier" }, href: "/careers" },
          { label: { en: "Media / Press", id: "Media / Pers" }, href: "/media" },
          { label: { en: "Contact", id: "Kontak" }, href: "/contact" },
        ],
      },
      {
        id: "business",
        label: { en: "Business", id: "Bisnis" },
        links: [
          { label: { en: "Business Solutions", id: "Solusi Bisnis" }, href: "/business" },
          { label: { en: "Fleet Solutions", id: "Solusi Armada" }, href: "/fleet" },
          { label: { en: "Rental Business", id: "Bisnis Rental" }, href: "/rental" },
          { label: { en: "Hospitality Solutions", id: "Solusi Hospitality" }, href: "/hospitality" },
          { label: { en: "Corporate Solutions", id: "Solusi Korporat" }, href: "/corporate" },
          { label: { en: "Become a Dealer", id: "Menjadi Dealer" }, href: "/dealer-partnership" },
        ],
      },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: { en: "Privacy", id: "Privasi" }, href: "/legal/privacy" },
  { label: { en: "Terms", id: "Syarat & Ketentuan" }, href: "/legal/terms" },
  { label: { en: "Cookie Policy", id: "Kebijakan Cookie" }, href: "/legal/cookies" },
];

/* ========================================================================== */
/* 4. MARKETS: COUNTRIES & CITIES (section 21 & 23)                           */
/* ========================================================================== */

export interface Country {
  code: string; // ISO 3166-1 alpha-2
  name: Localized;
  currency: CurrencyCode;
  status: "active" | "planned";
  /** Negara "planned" jangan tampil ke publik sebelum ada konfirmasi resmi */
  showPublicly: boolean;
}

export const countries: Country[] = [
  { code: "ID", name: { en: "Indonesia", id: "Indonesia" }, currency: "IDR", status: "active", showPublicly: true },
  { code: "SG", name: { en: "Singapore", id: "Singapura" }, currency: "SGD", status: "planned", showPublicly: false },
  { code: "AU", name: { en: "Australia", id: "Australia" }, currency: "AUD", status: "planned", showPublicly: false },
];

export interface City {
  slug: string;
  name: Localized;
  countryCode: string;
  center: GeoPoint;
}

export const cities: City[] = [
  { slug: "jakarta", name: { en: "Jakarta", id: "Jakarta" }, countryCode: "ID", center: { lat: -6.2088, lng: 106.8456 } },
  { slug: "bandung", name: { en: "Bandung", id: "Bandung" }, countryCode: "ID", center: { lat: -6.9175, lng: 107.6191 } },
  { slug: "bali", name: { en: "Bali", id: "Bali" }, countryCode: "ID", center: { lat: -8.6705, lng: 115.2126 } },
  { slug: "surabaya", name: { en: "Surabaya", id: "Surabaya" }, countryCode: "ID", center: { lat: -7.2575, lng: 112.7521 } },
];

/* ========================================================================== */
/* 5. PRODUCTS & SPECIFICATIONS (section 18 & 19)                             */
/* ========================================================================== */

export type ProductCategory = "urban" | "performance" | "commuter" | "lifestyle";

export type SpecKey =
  | "motorType"
  | "motorPowerRated"
  | "motorPowerPeak"
  | "torque"
  | "topSpeed"
  | "rangeClaimed"
  | "rangeRealWorld"
  | "batteryChemistry"
  | "batteryCapacity"
  | "batteryVoltage"
  | "chargingTimeStandard"
  | "superchargeSupported"
  | "superchargeTime"
  | "weight"
  | "dimensions"
  | "seatHeight"
  | "brakes"
  | "warrantyVehicle"
  | "warrantyBattery"
  | "connectivity";

export type SpecGroup = "performance" | "battery" | "charging" | "dimensions" | "safety" | "technology" | "warranty";

export interface SpecDefinition {
  key: SpecKey;
  label: Localized;
  unit?: string;
  group: SpecGroup;
  /** Tampil di card produk (key specs) */
  isKeySpec?: boolean;
}

/** Urutan di sini = urutan baris di tabel compare */
export const specDefinitions: SpecDefinition[] = [
  { key: "motorType", label: { en: "Motor", id: "Motor" }, group: "performance" },
  { key: "motorPowerRated", label: { en: "Rated Power", id: "Daya Nominal" }, unit: "W", group: "performance" },
  { key: "motorPowerPeak", label: { en: "Peak Power", id: "Daya Puncak" }, unit: "W", group: "performance", isKeySpec: true },
  { key: "torque", label: { en: "Torque", id: "Torsi" }, unit: "Nm", group: "performance" },
  { key: "topSpeed", label: { en: "Top Speed", id: "Kecepatan Maks." }, unit: "km/h", group: "performance", isKeySpec: true },
  { key: "rangeClaimed", label: { en: "Claimed Range", id: "Jarak Tempuh (Klaim)" }, unit: "km", group: "performance", isKeySpec: true },
  { key: "rangeRealWorld", label: { en: "Expected Real-World Range", id: "Jarak Tempuh Riil" }, unit: "km", group: "performance" },
  { key: "batteryChemistry", label: { en: "Battery Chemistry", id: "Jenis Baterai" }, group: "battery" },
  { key: "batteryCapacity", label: { en: "Battery Capacity", id: "Kapasitas Baterai" }, unit: "kWh", group: "battery" },
  { key: "batteryVoltage", label: { en: "System Voltage", id: "Tegangan Sistem" }, unit: "V", group: "battery" },
  { key: "chargingTimeStandard", label: { en: "Standard Charging (0-100%)", id: "Charging Standar (0-100%)" }, unit: "h", group: "charging" },
  { key: "superchargeSupported", label: { en: "15-Minute Supercharge", id: "15-Minute Supercharge" }, group: "charging", isKeySpec: true },
  { key: "superchargeTime", label: { en: "Supercharge Time", id: "Waktu Supercharge" }, unit: "min", group: "charging" },
  { key: "weight", label: { en: "Weight", id: "Berat" }, unit: "kg", group: "dimensions" },
  { key: "dimensions", label: { en: "Dimensions (L x W x H)", id: "Dimensi (P x L x T)" }, unit: "mm", group: "dimensions" },
  { key: "seatHeight", label: { en: "Seat Height", id: "Tinggi Jok" }, unit: "mm", group: "dimensions" },
  { key: "brakes", label: { en: "Brakes", id: "Rem" }, group: "safety" },
  { key: "connectivity", label: { en: "Connectivity", id: "Konektivitas" }, group: "technology" },
  { key: "warrantyVehicle", label: { en: "Vehicle Warranty", id: "Garansi Kendaraan" }, group: "warranty" },
  { key: "warrantyBattery", label: { en: "Battery Warranty", id: "Garansi Baterai" }, group: "warranty" },
];

export type SpecValue = string | number | boolean;
export type ProductSpecs = Record<SpecKey, DataPoint<SpecValue>>;

export interface ProductColor {
  name: Localized;
  hex: string;
  image?: ImageAsset;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  isNew: boolean;
  positioning: Localized;
  description: Localized;
  price: DataPoint<Money>;
  specs: ProductSpecs;
  colors: ProductColor[];
  heroImage: ImageAsset;
  gallery: ImageAsset[];
  highlights: Localized<string[]>;
  faqIds: string[];
}

/** Path gambar placeholder. Komponen image nanti fallback ke SVG kalau file belum ada */
const img = (name: string, alt: string, w = 1600, h = 1000): ImageAsset => ({
  src: `/images/mock/${name}.webp`,
  alt: { en: alt, id: alt },
  width: w,
  height: h,
});

const officialImg = (path: string, alt: string, w = 1600, h = 1000): ImageAsset => ({
  src: `/images/wedison/${path}`,
  alt: { en: alt, id: alt },
  width: w,
  height: h,
});

/**
 * Default semua spec = "required". Tiap produk hanya override sebagian dengan mock,
 * sehingga state [DATA REQUIRED] juga ikut teruji di UI (khususnya real-world range
 * dan waktu supercharge, yang paling rawan jadi klaim menyesatkan).
 */
const baseSpecs = (overrides: Partial<ProductSpecs>): ProductSpecs => ({
  motorType: required("Motor type (hub / mid-drive, brand)"),
  motorPowerRated: required("Rated power in W"),
  motorPowerPeak: required("Peak power in W"),
  torque: required("Torque in Nm"),
  topSpeed: required("Top speed in km/h + test condition"),
  rangeClaimed: required("Claimed range + test method"),
  rangeRealWorld: required("Real-world range: rider weight, traffic, riding mode"),
  batteryChemistry: required("LFP / NMC / other"),
  batteryCapacity: required("kWh or V/Ah"),
  batteryVoltage: required("System voltage"),
  chargingTimeStandard: required("Standard charger 0-100% time"),
  superchargeSupported: required("Is this model Supercharge compatible?"),
  superchargeTime: required("Start %, end %, charger kW, conditions"),
  weight: required("Curb weight incl. battery"),
  dimensions: required("L x W x H in mm"),
  seatHeight: required("Seat height in mm"),
  brakes: required("Front/rear brake type, CBS/ABS"),
  connectivity: required("App, GPS, anti-theft: only verified features"),
  warrantyVehicle: required("Vehicle warranty terms"),
  warrantyBattery: required("Battery warranty terms"),
  ...overrides,
});

const MOCK_DESC: Localized = {
  en: "Mock description. Replace with approved product copy from the WEDISON team.",
  id: "Deskripsi dummy. Ganti dengan copy produk resmi dari tim WEDISON.",
};

export const products: Product[] = [
  {
    id: "p-ed-power",
    slug: "ed-power",
    name: "WEDISON ED Power",
    category: "performance", // MOCK: kategori belum dikonfirmasi
    isNew: false,
    positioning: { en: "Built for riders who want more pull.", id: "Untuk rider yang butuh tenaga lebih." },
    description: MOCK_DESC,
    price: mock({ amount: 29_900_000, currency: "IDR" }, "Dummy OTR price"),
    specs: baseSpecs({
      motorType: mock("Hub motor"),
      motorPowerPeak: mock(3000),
      topSpeed: mock(80),
      rangeClaimed: mock(100),
      batteryChemistry: mock("LFP"),
      batteryCapacity: mock(2.9),
      batteryVoltage: mock(72),
      superchargeSupported: mock(true),
      weight: mock(110),
      brakes: mock("Front disc / Rear disc"),
    }),
    colors: [
      { name: { en: "Midnight Black", id: "Hitam" }, hex: "#1C1F22" },
      { name: { en: "Arctic White", id: "Putih" }, hex: "#F5F5F5" },
    ],
    heroImage: officialImg("motorcycles/edpower/edpower-hero.webp", "WEDISON EDPower electric motorcycle", 1000, 1000),
    gallery: [
      officialImg("motorcycles/edpower/edpower-overview.webp", "WEDISON EDPower electric motorcycle side profile", 1000, 1000),
      officialImg("motorcycles/edpower/edpower-dashboard.webp", "WEDISON EDPower cockpit and digital display", 1000, 500),
    ],
    highlights: {
      en: ["Supercharge compatible (mock)", "Instant torque", "Low running cost"],
      id: ["Kompatibel Supercharge (mock)", "Torsi instan", "Biaya operasional rendah"],
    },
    faqIds: ["faq-supercharge", "faq-range", "faq-price"],
  },
  {
    id: "p-athena",
    slug: "athena",
    name: "WEDISON Athena",
    category: "lifestyle", // MOCK
    isNew: true,
    positioning: { en: "Style that fits everyday life.", id: "Gaya yang pas untuk harian." },
    description: MOCK_DESC,
    price: mock({ amount: 24_500_000, currency: "IDR" }, "Dummy OTR price"),
    specs: baseSpecs({
      motorType: mock("Hub motor"),
      motorPowerPeak: mock(2000),
      topSpeed: mock(65),
      rangeClaimed: mock(80),
      batteryChemistry: mock("LFP"),
      batteryCapacity: mock(2.2),
      superchargeSupported: mock(true),
      weight: mock(95),
      brakes: mock("Front disc / Rear drum"),
    }),
    colors: [
      { name: { en: "Sage Green", id: "Hijau Sage" }, hex: "#9CAF88" },
      { name: { en: "Cream", id: "Krem" }, hex: "#EFE6D2" },
    ],
    heroImage: officialImg("motorcycles/athena/athena-hero.webp", "WEDISON Athena electric motorcycles", 1000, 1000),
    gallery: [officialImg("motorcycles/athena/athena-overview.webp", "WEDISON Athena electric motorcycle", 1000, 1000)],
    highlights: {
      en: ["Lightweight (mock)", "Easy to ride", "Supercharge compatible (mock)"],
      id: ["Ringan (mock)", "Mudah dikendarai", "Kompatibel Supercharge (mock)"],
    },
    faqIds: ["faq-range", "faq-price"],
  },
  {
    id: "p-victory",
    slug: "victory",
    name: "WEDISON Victory",
    category: "commuter", // MOCK
    isNew: false,
    positioning: { en: "The daily commute, simplified.", id: "Perjalanan harian jadi lebih simpel." },
    description: MOCK_DESC,
    price: mock({ amount: 21_000_000, currency: "IDR" }, "Dummy OTR price"),
    specs: baseSpecs({
      motorType: mock("Hub motor"),
      motorPowerPeak: mock(1500),
      topSpeed: mock(60),
      rangeClaimed: mock(70),
      batteryChemistry: mock("LFP"),
      superchargeSupported: mock(false),
      weight: mock(90),
    }),
    colors: [{ name: { en: "Graphite", id: "Grafit" }, hex: "#3A3F44" }],
    heroImage: officialImg("motorcycles/victory/victory-hero.webp", "WEDISON Victory electric motorcycle", 1000, 1000),
    gallery: [officialImg("motorcycles/victory/victory-overview.webp", "WEDISON Victory electric motorcycle side profile", 1000, 1000)],
    highlights: {
      en: ["Built for daily commuting", "Low maintenance", "Compact"],
      id: ["Untuk harian", "Perawatan minim", "Ringkas"],
    },
    faqIds: ["faq-range", "faq-price"],
  },
  {
    id: "p-bees-pro",
    slug: "bees-pro",
    name: "WEDISON Bees Pro",
    category: "urban", // MOCK
    isNew: false,
    positioning: { en: "Made for the city.", id: "Dibuat untuk kota." },
    description: MOCK_DESC,
    // Sengaja "required" agar state harga kosong ikut teruji di UI
    price: required("Official OTR price per city"),
    specs: baseSpecs({
      motorType: mock("Hub motor"),
      topSpeed: mock(55),
      rangeClaimed: mock(60),
      superchargeSupported: mock(false),
    }),
    colors: [
      { name: { en: "Honey Yellow", id: "Kuning" }, hex: "#F2B705" },
      { name: { en: "Black", id: "Hitam" }, hex: "#1C1F22" },
    ],
    heroImage: img("bees-pro-hero", "WEDISON Bees Pro electric motorcycle, side view"),
    gallery: [],
    highlights: {
      en: ["Nimble in traffic", "Easy parking", "Everyday practical"],
      id: ["Lincah di kemacetan", "Mudah parkir", "Praktis harian"],
    },
    faqIds: ["faq-price"],
  },
];

/* ========================================================================== */
/* 6. 15-MINUTE SUPERCHARGE CLAIM (section 4 & 5)                             */
/* Fakta resmi ditandai verified; kondisi teknis yang belum dipublikasikan     */
/* tetap berstatus required.                                                   */
/* ========================================================================== */

export const superchargeClaim = {
  headline: { en: "15 minutes. Ready to move.", id: "15 menit. Siap melaju." } satisfies Localized,
  subline: {
    en: "Fast, practical charging for compatible WEDISON motorcycles.",
    id: "Pengisian cepat dan praktis untuk motor WEDISON yang kompatibel.",
  } satisfies Localized,
  claimLabel: "WEDISON SuperCharge",
  sourceUrl: "https://wedison.co/super-charge/",
  conditions: {
    startBatteryPercent: verified(10, "Official WEDISON SuperCharge page"),
    endBatteryPercent: verified(80, "Official WEDISON SuperCharge page"),
    chargerPowerKw: required<number>("Charger output kW"),
    batteryCapacityKwh: required<number>("Battery capacity tested"),
    compatibleModelSlugs: verified(["ed-power", "athena", "victory"], "Current WEDISON model and specification pages"),
    ambientTemperature: required<string>("Temperature range of test"),
    testType: required<"laboratory" | "real-world">("Lab or real-world tested"),
  },
  networkLocations: verified("100+", "Official WEDISON SuperCharge page"),
  chargingType: verified("DC fast charging", "Official WEDISON SuperCharge page"),
  appFeatures: [
    "Find nearby stations on an interactive map",
    "Check real-time availability, queue status and estimated wait time",
    "Start and monitor charging sessions",
    "Review session history and analytics",
  ],
  demoTimeline: [
    { minute: 0, percent: 10 },
    { minute: 15, percent: 80 },
  ],
  demoTimelineStatus: "verified" as DataStatus,
  storySteps: [
    { id: "ride", label: { en: "Ride", id: "Berkendara" } },
    { id: "plug", label: { en: "Supercharge", id: "Supercharge" } },
    { id: "wait", label: { en: "15 Minutes*", id: "15 Menit*" } },
    { id: "go", label: { en: "Back on the Road", id: "Kembali ke Jalan" } },
  ],
};

/* ========================================================================== */
/* 7. SUPERCHARGER NETWORK (section 6 & 22)                                   */
/* ========================================================================== */

export type StationStatus = "operational" | "coming_soon" | "maintenance";

export interface SuperchargerStation {
  id: string;
  slug: string;
  name: string;
  citySlug: string;
  address: string;
  location: GeoPoint;
  status: StationStatus;
  chargingPowerKw: DataPoint<number>;
  connectorCount: DataPoint<number>;
  supportedModelSlugs: string[];
  operatingHours: string;
  cost: DataPoint<string>;
  landmarks: string[];
  photos: ImageAsset[];
  isMock: true;
}

export const superchargerStations: SuperchargerStation[] = [
  {
    id: "sc-jkt-01",
    slug: "jakarta-selatan-01",
    name: "[MOCK] Supercharger Jakarta Selatan 01",
    citySlug: "jakarta",
    address: "Jl. Contoh No. 1, Jakarta Selatan (dummy address)",
    location: { lat: -6.2615, lng: 106.781 },
    status: "operational",
    chargingPowerKw: mock(7),
    connectorCount: mock(4),
    supportedModelSlugs: ["ed-power", "athena"],
    operatingHours: "08:00 - 22:00",
    cost: required("Charging tariff / free for owners?"),
    landmarks: ["Dummy landmark A"],
    photos: [],
    isMock: true,
  },
  {
    id: "sc-jkt-02",
    slug: "jakarta-pusat-01",
    name: "[MOCK] Supercharger Jakarta Pusat 01",
    citySlug: "jakarta",
    address: "Jl. Contoh No. 2, Jakarta Pusat (dummy address)",
    location: { lat: -6.1865, lng: 106.8342 },
    status: "operational",
    chargingPowerKw: mock(7),
    connectorCount: mock(2),
    supportedModelSlugs: ["ed-power", "athena"],
    operatingHours: "24 hours",
    cost: required("Charging tariff"),
    landmarks: ["Dummy landmark B"],
    photos: [],
    isMock: true,
  },
  {
    id: "sc-bdg-01",
    slug: "bandung-01",
    name: "[MOCK] Supercharger Bandung 01",
    citySlug: "bandung",
    address: "Jl. Contoh No. 3, Bandung (dummy address)",
    location: { lat: -6.9039, lng: 107.6186 },
    status: "maintenance",
    chargingPowerKw: mock(7),
    connectorCount: mock(2),
    supportedModelSlugs: ["ed-power"],
    operatingHours: "09:00 - 21:00",
    cost: required("Charging tariff"),
    landmarks: ["Dummy landmark C"],
    photos: [],
    isMock: true,
  },
  {
    id: "sc-bali-01",
    slug: "bali-denpasar-01",
    name: "[MOCK] Supercharger Denpasar 01",
    citySlug: "bali",
    address: "Jl. Contoh No. 4, Denpasar (dummy address)",
    location: { lat: -8.6705, lng: 115.2126 },
    status: "operational",
    chargingPowerKw: mock(7),
    connectorCount: mock(3),
    supportedModelSlugs: ["ed-power", "athena"],
    operatingHours: "08:00 - 22:00",
    cost: required("Charging tariff"),
    landmarks: ["Dummy landmark D"],
    photos: [],
    isMock: true,
  },
  {
    id: "sc-bali-02",
    slug: "bali-canggu-01",
    name: "[MOCK] Supercharger Canggu 01",
    citySlug: "bali",
    address: "Jl. Contoh No. 5, Canggu (dummy address)",
    location: { lat: -8.6478, lng: 115.1385 },
    status: "coming_soon",
    chargingPowerKw: required("Planned output kW"),
    connectorCount: required("Planned connectors"),
    supportedModelSlugs: [],
    operatingHours: "-",
    cost: required("Charging tariff"),
    landmarks: [],
    photos: [],
    isMock: true,
  },
  {
    id: "sc-sby-01",
    slug: "surabaya-01",
    name: "[MOCK] Supercharger Surabaya 01",
    citySlug: "surabaya",
    address: "Jl. Contoh No. 6, Surabaya (dummy address)",
    location: { lat: -7.2575, lng: 112.7521 },
    status: "coming_soon",
    chargingPowerKw: required("Planned output kW"),
    connectorCount: required("Planned connectors"),
    supportedModelSlugs: [],
    operatingHours: "-",
    cost: required("Charging tariff"),
    landmarks: [],
    photos: [],
    isMock: true,
  },
];

/* ========================================================================== */
/* 8. DEALERS / SHOWROOMS (section 21)                                        */
/* ========================================================================== */

export type DealerService = "sales" | "test_ride" | "service" | "spare_parts" | "battery_check";

export interface Dealer {
  id: string;
  slug: string;
  name: string;
  citySlug: string;
  address: string;
  location: GeoPoint;
  phone: string;
  whatsapp: string;
  openingHours: { days: Localized; hours: string }[];
  availableModelSlugs: string[];
  services: DealerService[];
  hasSupercharger: boolean;
  testRideAvailable: boolean;
  isMock: true;
}

const defaultHours: Dealer["openingHours"] = [
  { days: { en: "Mon - Sat", id: "Sen - Sab" }, hours: "09:00 - 18:00" },
  { days: { en: "Sunday", id: "Minggu" }, hours: "10:00 - 17:00" },
];

export const dealers: Dealer[] = [
  {
    id: "d-jkt-01",
    slug: "jakarta-arteri",
    name: "[MOCK] WEDISON Jakarta Arteri",
    citySlug: "jakarta",
    address: "Jl. Arteri (dummy address), Jakarta Selatan",
    location: { lat: -6.2446, lng: 106.7836 },
    phone: "+62 21 0000 0001",
    whatsapp: "620000000001",
    openingHours: defaultHours,
    availableModelSlugs: ["ed-power", "athena", "victory", "bees-pro"],
    services: ["sales", "test_ride", "service", "spare_parts", "battery_check"],
    hasSupercharger: true,
    testRideAvailable: true,
    isMock: true,
  },
  {
    id: "d-bdg-01",
    slug: "bandung",
    name: "[MOCK] WEDISON Bandung",
    citySlug: "bandung",
    address: "Jl. Contoh (dummy address), Bandung",
    location: { lat: -6.9147, lng: 107.6098 },
    phone: "+62 22 0000 0002",
    whatsapp: "620000000002",
    openingHours: defaultHours,
    availableModelSlugs: ["ed-power", "athena", "victory"],
    services: ["sales", "test_ride", "service"],
    hasSupercharger: true,
    testRideAvailable: true,
    isMock: true,
  },
  {
    id: "d-bali-01",
    slug: "bali",
    name: "[MOCK] WEDISON Bali",
    citySlug: "bali",
    address: "Jl. Contoh (dummy address), Bali",
    location: { lat: -8.6725, lng: 115.2091 },
    phone: "+62 361 0000 003",
    whatsapp: "620000000003",
    openingHours: defaultHours,
    availableModelSlugs: ["ed-power", "athena", "bees-pro"],
    services: ["sales", "test_ride", "service", "battery_check"],
    hasSupercharger: true,
    testRideAvailable: true,
    isMock: true,
  },
];

/* ========================================================================== */
/* 9. RIDERS / CUSTOMER STORIES (section 11)                                  */
/* SEMUA orang di bawah FIKTIF. Jangan pernah dipublish sebagai testimoni.     */
/* ========================================================================== */

export type RiderPersona =
  | "daily_commuter"
  | "entrepreneur"
  | "rental_owner"
  | "delivery_rider"
  | "professional"
  | "family"
  | "lifestyle"
  | "fleet"
  | "hospitality";

export interface CustomerStory {
  id: string;
  slug: string;
  riderName: string;
  citySlug: string;
  productSlug: string;
  profession: Localized;
  persona: RiderPersona;
  previousVehicle: Localized;
  dailyDistanceKm: DataPoint<number>;
  quote: Localized;
  whyChose: Localized;
  chargingExperience: Localized;
  costExperience: Localized;
  portrait: ImageAsset;
  videoUrl: string | null;
  isMock: true;
}

const DUMMY_QUOTE: Localized = {
  en: "Dummy quote. Replace with a real customer statement that has written consent.",
  id: "Kutipan dummy. Ganti dengan pernyataan pelanggan asli yang sudah ada izin tertulis.",
};
const DUMMY_TEXT: Localized = { en: "Dummy text.", id: "Teks dummy." };

export const customerStories: CustomerStory[] = [
  {
    id: "cs-01",
    slug: "dummy-commuter-jakarta",
    riderName: "Rider A (Dummy)",
    citySlug: "jakarta",
    productSlug: "ed-power",
    profession: { en: "Office worker", id: "Karyawan kantor" },
    persona: "daily_commuter",
    previousVehicle: { en: "125cc petrol scooter", id: "Skuter bensin 125cc" },
    dailyDistanceKm: mock(40),
    quote: DUMMY_QUOTE,
    whyChose: DUMMY_TEXT,
    chargingExperience: DUMMY_TEXT,
    costExperience: DUMMY_TEXT,
    portrait: img("rider-a", "Portrait of rider (placeholder)", 800, 1000),
    videoUrl: null,
    isMock: true,
  },
  {
    id: "cs-02",
    slug: "dummy-rental-bali",
    riderName: "Rider B (Dummy)",
    citySlug: "bali",
    productSlug: "athena",
    profession: { en: "Rental business owner", id: "Pemilik usaha rental" },
    persona: "rental_owner",
    previousVehicle: { en: "Petrol rental fleet", id: "Armada rental bensin" },
    dailyDistanceKm: mock(60),
    quote: DUMMY_QUOTE,
    whyChose: DUMMY_TEXT,
    chargingExperience: DUMMY_TEXT,
    costExperience: DUMMY_TEXT,
    portrait: img("rider-b", "Portrait of rider (placeholder)", 800, 1000),
    videoUrl: null,
    isMock: true,
  },
  {
    id: "cs-03",
    slug: "dummy-delivery-bandung",
    riderName: "Rider C (Dummy)",
    citySlug: "bandung",
    productSlug: "victory",
    profession: { en: "Delivery rider", id: "Kurir" },
    persona: "delivery_rider",
    previousVehicle: { en: "110cc petrol motorcycle", id: "Motor bensin 110cc" },
    dailyDistanceKm: mock(90),
    quote: DUMMY_QUOTE,
    whyChose: DUMMY_TEXT,
    chargingExperience: DUMMY_TEXT,
    costExperience: DUMMY_TEXT,
    portrait: img("rider-c", "Portrait of rider (placeholder)", 800, 1000),
    videoUrl: null,
    isMock: true,
  },
];

/* ========================================================================== */
/* 10. TECHNOLOGY & ECOSYSTEM (section 7, 8, 15)                              */
/* ========================================================================== */

export interface TechPillar {
  id: "battery" | "motor" | "bms" | "controller" | "supercharger" | "infrastructure" | "connectivity";
  title: Localized;
  summary: Localized;
  /** Poin teknis yang HARUS disuplai tim WEDISON sebelum halaman teknologi final */
  dataRequired: string[];
}

export const techPillars: TechPillar[] = [
  {
    id: "battery",
    title: { en: "Battery", id: "Baterai" },
    summary: {
      en: "The energy source of every ride, designed around safety and long life.",
      id: "Sumber energi setiap perjalanan, dirancang untuk aman dan tahan lama.",
    },
    dataRequired: ["Chemistry", "Capacity", "Cycle life", "Thermal protection", "Warranty terms"],
  },
  {
    id: "motor",
    title: { en: "Motor", id: "Motor" },
    summary: { en: "Delivers instant torque from a standstill.", id: "Memberi torsi instan sejak awal jalan." },
    dataRequired: ["Motor type", "Rated/peak power", "Torque", "Efficiency"],
  },
  {
    id: "bms",
    title: { en: "Battery Management System", id: "Battery Management System" },
    summary: {
      en: "Monitors the battery to keep it healthy and protected.",
      id: "Memantau baterai agar tetap sehat dan terlindungi.",
    },
    dataRequired: ["Protections covered (over-charge, over-temp, short circuit)", "Cell balancing method"],
  },
  {
    id: "controller",
    title: { en: "Controller", id: "Controller" },
    summary: {
      en: "Manages power delivery, efficiency and safety limits.",
      id: "Mengatur penyaluran daya, efisiensi, dan batas keamanan.",
    },
    dataRequired: ["Riding modes", "Regenerative braking (if any)"],
  },
  {
    id: "supercharger",
    title: { en: "Supercharger", id: "Supercharger" },
    summary: {
      en: "DC fast charging that takes compatible WEDISON motorcycles from 10% to 80% in 15 minutes.",
      id: "Pengisian cepat DC dari 10% ke 80% dalam 15 menit untuk motor WEDISON yang kompatibel.",
    },
    dataRequired: ["Charger output", "Detailed charging curve"],
  },
  {
    id: "infrastructure",
    title: { en: "Infrastructure", id: "Infrastruktur" },
    summary: {
      en: "More than 100 strategic SuperCharge locations across Indonesia.",
      id: "Lebih dari 100 lokasi strategis SuperCharge di Indonesia.",
    },
    dataRequired: ["Published station directory", "Expansion plan approved for publication"],
  },
  {
    id: "connectivity",
    title: { en: "Connectivity", id: "Konektivitas" },
    summary: {
      en: "Find stations, check live availability and monitor charging sessions through the WEDISON app.",
      id: "Temukan stasiun, cek ketersediaan langsung, dan pantau sesi pengisian melalui aplikasi WEDISON.",
    },
    dataRequired: ["Availability of the app by platform and region"],
  },
];

export const ecosystemFlow: { id: string; label: Localized }[] = [
  { id: "motorcycle", label: { en: "Motorcycle", id: "Motor" } },
  { id: "battery", label: { en: "Battery", id: "Baterai" } },
  { id: "supercharging", label: { en: "Supercharging", id: "Supercharging" } },
  { id: "infrastructure", label: { en: "Infrastructure", id: "Infrastruktur" } },
  { id: "technology", label: { en: "Technology", id: "Teknologi" } },
  { id: "service", label: { en: "Service", id: "Servis" } },
  { id: "dealers", label: { en: "Dealers", id: "Dealer" } },
  { id: "riders", label: { en: "Riders", id: "Rider" } },
  { id: "partners", label: { en: "Business Partners", id: "Mitra Bisnis" } },
  { id: "ecosystem", label: { en: "Mobility Ecosystem", id: "Ekosistem Mobilitas" } },
];

export const whyElectricPoints: { id: string; title: Localized; body: Localized }[] = [
  {
    id: "cost",
    title: { en: "Lower running cost", id: "Biaya operasional lebih rendah" },
    body: {
      en: "Electricity per km typically costs less than fuel. Use the calculator with your own numbers.",
      id: "Biaya listrik per km umumnya lebih rendah dari bensin. Coba kalkulator dengan angkamu sendiri.",
    },
  },
  {
    id: "maintenance",
    title: { en: "Less maintenance", id: "Perawatan lebih sedikit" },
    body: { en: "No oil changes, no spark plugs, fewer moving parts.", id: "Tanpa ganti oli, tanpa busi, komponen bergerak lebih sedikit." },
  },
  {
    id: "quiet",
    title: { en: "Quiet riding", id: "Berkendara senyap" },
    body: { en: "Less noise for you and the streets around you.", id: "Lebih tenang untukmu dan lingkungan sekitar." },
  },
  {
    id: "torque",
    title: { en: "Instant torque", id: "Torsi instan" },
    body: { en: "Electric motors deliver torque from zero rpm.", id: "Motor listrik memberi torsi sejak 0 rpm." },
  },
  {
    id: "charging",
    title: { en: "Charging convenience", id: "Charging praktis" },
    body: { en: "Charge at home or at a WEDISON Supercharger.", id: "Charge di rumah atau di WEDISON Supercharger." },
  },
];

/* ========================================================================== */
/* 11. TCO CALCULATOR DEFAULTS (section 10)                                   */
/* SEMUA angka default = MOCK. Wajib dicek manual sebelum dipublish.           */
/* ========================================================================== */

export const tcoDefaults = {
  currency: "IDR" as CurrencyCode,
  dailyDistanceKm: mock(30),
  daysPerMonth: mock(26),
  ev: {
    energyConsumptionKwhPer100Km: mock(3.5, "Must be measured per model"),
    electricityPricePerKwh: mock(1_700, "Check current PLN tariff for the rider's power class"),
    maintenancePerMonth: mock(50_000),
    vehiclePrice: mock(29_900_000),
  },
  ice: {
    fuelEfficiencyKmPerLiter: mock(40, "Typical 110-125cc scooter, varies widely"),
    fuelPricePerLiter: mock(10_000, "Check current fuel price, changes periodically"),
    maintenancePerMonth: mock(150_000, "Oil, spark plug, CVT service averaged monthly"),
    vehiclePrice: mock(20_000_000),
  },
  sliderRanges: {
    dailyDistanceKm: { min: 5, max: 200, step: 5 },
    fuelPricePerLiter: { min: 8_000, max: 20_000, step: 500 },
    electricityPricePerKwh: { min: 1_000, max: 3_000, step: 50 },
  },
};

/* ========================================================================== */
/* 12. OWNERSHIP / SERVICE (section 13)                                       */
/* ========================================================================== */

export const ownershipPillars: { id: string; title: Localized; body: Localized; status: DataStatus }[] = [
  { id: "warranty", title: { en: "Warranty", id: "Garansi" }, body: { en: DATA_REQUIRED_LABEL, id: DATA_REQUIRED_LABEL }, status: "required" },
  { id: "service", title: { en: "Service", id: "Servis" }, body: { en: "Service at WEDISON locations.", id: "Servis di lokasi WEDISON." }, status: "mock" },
  { id: "support", title: { en: "Support", id: "Dukungan" }, body: { en: "Reach us by WhatsApp, phone or email.", id: "Hubungi kami via WhatsApp, telepon, atau email." }, status: "mock" },
  { id: "battery", title: { en: "Battery", id: "Baterai" }, body: { en: DATA_REQUIRED_LABEL, id: DATA_REQUIRED_LABEL }, status: "required" },
  { id: "network", title: { en: "Network", id: "Jaringan" }, body: { en: "Dealers and Superchargers near you.", id: "Dealer dan Supercharger di dekatmu." }, status: "mock" },
];

/* ========================================================================== */
/* 13. BUSINESS SOLUTIONS (section 45)                                        */
/* ========================================================================== */

export interface BusinessSolution {
  id: "fleet" | "rental" | "hospitality" | "corporate" | "dealer" | "charging-partner";
  slug: string;
  title: Localized;
  summary: Localized;
  audiences: Localized<string[]>;
  image: ImageAsset;
}

export const businessSolutions: BusinessSolution[] = [
  {
    id: "fleet",
    slug: "fleet",
    title: { en: "Fleet", id: "Armada" },
    summary: { en: "Electric motorcycles for delivery and mobility operations.", id: "Motor listrik untuk operasional delivery dan mobilitas." },
    audiences: { en: ["Corporate fleet", "Delivery", "Mobility companies"], id: ["Armada korporat", "Delivery", "Perusahaan mobilitas"] },
    image: img("biz-fleet", "Fleet of electric motorcycles (placeholder)"),
  },
  {
    id: "rental",
    slug: "rental",
    title: { en: "Rental", id: "Rental" },
    summary: { en: "Lower running costs for rental and tourism businesses.", id: "Biaya operasional lebih rendah untuk bisnis rental dan wisata." },
    audiences: { en: ["Motorcycle rental", "Tourism"], id: ["Rental motor", "Pariwisata"] },
    image: img("biz-rental", "Rental motorcycles (placeholder)"),
  },
  {
    id: "hospitality",
    slug: "hospitality",
    title: { en: "Hospitality", id: "Hospitality" },
    summary: { en: "Quiet electric mobility for hotels, resorts and villas.", id: "Mobilitas listrik senyap untuk hotel, resort, dan villa." },
    audiences: { en: ["Hotels", "Resorts", "Villas"], id: ["Hotel", "Resort", "Villa"] },
    image: img("biz-hospitality", "Resort with electric motorcycles (placeholder)"),
  },
  {
    id: "corporate",
    slug: "corporate",
    title: { en: "Corporate", id: "Korporat" },
    summary: { en: "Employee mobility and operational transport.", id: "Mobilitas karyawan dan transportasi operasional." },
    audiences: { en: ["Employee mobility", "ESG programs"], id: ["Mobilitas karyawan", "Program ESG"] },
    image: img("biz-corporate", "Corporate mobility (placeholder)"),
  },
  {
    id: "dealer",
    slug: "dealer",
    title: { en: "Dealer Partnership", id: "Kemitraan Dealer" },
    summary: { en: "Bring WEDISON to your city.", id: "Hadirkan WEDISON di kotamu." },
    audiences: { en: ["Dealer opportunities"], id: ["Peluang dealer"] },
    image: officialImg("showroom/showroom-reception.webp", "WEDISON showroom reception", 600, 600),
  },
  {
    id: "charging-partner",
    slug: "charging-partner",
    title: { en: "Charging Partner", id: "Mitra Charging" },
    summary: { en: "Host a Supercharger at your location.", id: "Jadi tuan rumah Supercharger di lokasimu." },
    audiences: { en: ["Retail", "Restaurants", "Hotels"], id: ["Ritel", "Restoran", "Hotel"] },
    image: officialImg("supercharge/supercharge-network.webp", "WEDISON motorcycles and SuperCharge network", 800, 450),
  },
];

/* ========================================================================== */
/* 14. ARTICLES & AUTHORS (section 28 & 29)                                   */
/* ========================================================================== */

export type ArticleCategory =
  | "electric-mobility"
  | "technology"
  | "battery"
  | "charging"
  | "supercharging"
  | "maintenance"
  | "buying-guide"
  | "sustainability"
  | "industry"
  | "wedison-news"
  | "customer-stories";

export type FunnelStage = "tofu" | "mofu" | "bofu" | "post_purchase";

export interface Author {
  id: string;
  name: string;
  role: Localized;
  avatar: ImageAsset;
}

export const authors: Author[] = [
  {
    id: "a-01",
    name: "Editorial Team (Dummy)",
    role: { en: "WEDISON Editorial", id: "Redaksi WEDISON" },
    avatar: img("author-01", "Author avatar (placeholder)", 200, 200),
  },
];

export interface Article {
  id: string;
  slug: string;
  title: Localized;
  excerpt: Localized;
  category: ArticleCategory;
  funnelStage: FunnelStage;
  authorId: string;
  publishedAt: string; // ISO date
  updatedAt: string;
  readingMinutes: number;
  featuredImage: ImageAsset;
  relatedSlugs: string[];
  isMock: true;
}

export const articles: Article[] = [
  {
    id: "ar-01",
    slug: "what-is-an-electric-motorcycle",
    title: { en: "What Is an Electric Motorcycle?", id: "Apa Itu Motor Listrik?" },
    excerpt: { en: "The basics of how electric motorcycles work, explained simply.", id: "Dasar cara kerja motor listrik, dijelaskan dengan sederhana." },
    category: "electric-mobility",
    funnelStage: "tofu",
    authorId: "a-01",
    publishedAt: "2026-08-01",
    updatedAt: "2026-08-15",
    readingMinutes: 5,
    featuredImage: img("article-01", "Electric motorcycle on a city street (placeholder)"),
    relatedSlugs: ["ev-vs-petrol-motorcycle"],
    isMock: true,
  },
  {
    id: "ar-02",
    slug: "ev-vs-petrol-motorcycle",
    title: { en: "Electric vs Petrol Motorcycle: The Real Costs", id: "Motor Listrik vs Bensin: Biaya Sebenarnya" },
    excerpt: { en: "Running costs, maintenance and what actually changes day to day.", id: "Biaya operasional, perawatan, dan apa yang berubah sehari-hari." },
    category: "buying-guide",
    funnelStage: "mofu",
    authorId: "a-01",
    publishedAt: "2026-08-10",
    updatedAt: "2026-08-10",
    readingMinutes: 7,
    featuredImage: img("article-02", "Motorcycle cost comparison (placeholder)"),
    relatedSlugs: ["what-is-an-electric-motorcycle"],
    isMock: true,
  },
  {
    id: "ar-03",
    slug: "battery-care-guide",
    title: { en: "Battery Care: A Simple Guide", id: "Panduan Sederhana Merawat Baterai" },
    excerpt: { en: "Everyday habits that help your battery stay healthy.", id: "Kebiasaan harian yang membantu baterai tetap sehat." },
    category: "battery",
    funnelStage: "post_purchase",
    authorId: "a-01",
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    readingMinutes: 6,
    featuredImage: img("article-03", "Battery pack illustration (placeholder)"),
    relatedSlugs: ["how-supercharging-works"],
    isMock: true,
  },
  {
    id: "ar-04",
    slug: "how-supercharging-works",
    title: { en: "How Supercharging Works", id: "Cara Kerja Supercharging" },
    excerpt: {
      en: "A concise guide to WEDISON's official charging speed, compatible models and SuperCharge app features.",
      id: "Panduan singkat mengenai kecepatan pengisian resmi WEDISON, model kompatibel, dan fitur aplikasi SuperCharge.",
    },
    category: "supercharging",
    funnelStage: "mofu",
    authorId: "a-01",
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-05",
    readingMinutes: 6,
    featuredImage: officialImg("supercharge/victory-supercharging.webp", "WEDISON Victory electric motorcycle using SuperCharge", 800, 450),
    relatedSlugs: ["battery-care-guide"],
    isMock: true,
  },
];

/* ========================================================================== */
/* 15. FAQ / AEO (section 25)                                                 */
/* Jawaban berbasis fakta yang belum ada = [DATA REQUIRED].                    */
/* ========================================================================== */

export interface FaqItem {
  id: string;
  question: Localized;
  answer: Localized;
  status: DataStatus;
  relatedHref?: string;
}

const REQ_ANSWER: Localized = { en: DATA_REQUIRED_LABEL, id: DATA_REQUIRED_LABEL };

export const faqs: FaqItem[] = [
  {
    id: "faq-what-is",
    question: { en: "What is WEDISON?", id: "Apa itu WEDISON?" },
    answer: {
      en: "WEDISON is an electric motorcycle and electric mobility company building motorcycles, charging infrastructure and service in one ecosystem.",
      id: "WEDISON adalah perusahaan sepeda motor listrik dan mobilitas listrik yang membangun motor, infrastruktur charging, dan layanan dalam satu ekosistem.",
    },
    status: "mock",
    relatedHref: "/about",
  },
  {
    id: "faq-models",
    question: { en: "What electric motorcycles does WEDISON offer?", id: "Motor listrik apa saja yang ditawarkan WEDISON?" },
    answer: {
      en: "The lineup includes ED Power, Athena, Victory and Bees Pro. Lineup to be confirmed by WEDISON.",
      id: "Lini produk mencakup ED Power, Athena, Victory, dan Bees Pro. Menunggu konfirmasi WEDISON.",
    },
    status: "mock",
    relatedHref: "/motorcycles",
  },
  {
    id: "faq-supercharge",
    question: { en: "What is WEDISON 15-Minute Supercharge?", id: "Apa itu WEDISON 15-Minute Supercharge?" },
    answer: {
      en: "WEDISON SuperCharge is a DC fast-charging system that takes compatible WEDISON motorcycles from 10% to 80% in 15 minutes.",
      id: "WEDISON SuperCharge adalah sistem pengisian cepat DC yang mengisi motor WEDISON yang kompatibel dari 10% ke 80% dalam 15 menit.",
    },
    status: "verified",
    relatedHref: "/supercharge",
  },
  { id: "faq-range", question: { en: "How far can a WEDISON electric motorcycle travel?", id: "Berapa jauh jarak tempuh motor listrik WEDISON?" }, answer: REQ_ANSWER, status: "required", relatedHref: "/compare" },
  { id: "faq-price", question: { en: "How much does a WEDISON electric motorcycle cost?", id: "Berapa harga motor listrik WEDISON?" }, answer: REQ_ANSWER, status: "required", relatedHref: "/motorcycles" },
  {
    id: "faq-test-ride",
    question: { en: "Where can I test ride WEDISON?", id: "Di mana saya bisa test ride WEDISON?" },
    answer: { en: "Book a test ride online and choose your nearest WEDISON location.", id: "Booking test ride online dan pilih lokasi WEDISON terdekat." },
    status: "mock",
    relatedHref: "/test-ride",
  },
  {
    id: "faq-superchargers",
    question: { en: "Where are WEDISON Superchargers?", id: "Di mana lokasi WEDISON Supercharger?" },
    answer: {
      en: "WEDISON states that SuperCharge is available at more than 100 strategic locations across Indonesia. Use the WEDISON app to find nearby stations and check live availability.",
      id: "WEDISON menyatakan bahwa SuperCharge tersedia di lebih dari 100 lokasi strategis di Indonesia. Gunakan aplikasi WEDISON untuk menemukan stasiun terdekat dan memeriksa ketersediaan langsung.",
    },
    status: "verified",
    relatedHref: "/supercharger-network",
  },
  { id: "faq-battery-life", question: { en: "How long does a WEDISON battery last?", id: "Berapa lama umur baterai WEDISON?" }, answer: REQ_ANSWER, status: "required", relatedHref: "/battery" },
  { id: "faq-international", question: { en: "Is WEDISON available outside Indonesia?", id: "Apakah WEDISON tersedia di luar Indonesia?" }, answer: REQ_ANSWER, status: "required" },
];

/* ========================================================================== */
/* 16. TEST RIDE & LEADS (section 20 & 42), bentuk CRM-ready                   */
/* ========================================================================== */

export type ContactMethod = "whatsapp" | "phone" | "email";

export const testRideConfig = {
  timeSlots: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"],
  maxDaysAhead: 30,
  contactMethods: ["whatsapp", "phone", "email"] as ContactMethod[],
};

export interface UtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export type LeadStatus = "new" | "contacted" | "scheduled" | "completed" | "no_show" | "cancelled";

/** Payload form test ride. Di tahap localhost cukup disimpan di state / console.log */
export interface TestRideLead {
  productSlug: string;
  citySlug: string;
  dealerSlug: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  name: string;
  phone: string;
  email: string;
  preferredContact: ContactMethod;
  locale: Locale;
  landingPage: string;
  utm: UtmParams;
  createdAt: string;
  status: LeadStatus;
}

/* ========================================================================== */
/* 17. HOMEPAGE CONTENT (section 17)                                          */
/* ========================================================================== */

export const homeContent = {
  hero: {
    headline: { en: "Electric mobility, without the wait.", id: "Mobilitas listrik, tanpa menunggu." } satisfies Localized,
    subheadline: {
      en: "Electric motorcycles powered by smart technology and 15-Minute Supercharge*.",
      id: "Motor listrik dengan teknologi pintar dan 15-Minute Supercharge*.",
    } satisfies Localized,
    media: officialImg("motorcycles/edpower/edpower-landing-hero.webp", "WEDISON EDPower electric motorcycle", 2400, 1350),
    ctas: {
      primary: { label: { en: "Book a Test Ride", id: "Booking Test Ride" }, href: "/test-ride" },
      secondary: { label: { en: "Explore Models", id: "Lihat Model" }, href: "/motorcycles" },
      tertiary: { label: { en: "Discover Supercharge", id: "Kenali Supercharge" }, href: "/supercharge" },
    },
  },
  finalStatement: {
    headline: { en: "The future of mobility is already moving.", id: "Masa depan mobilitas sudah bergerak." } satisfies Localized,
    cta: { label: { en: "Ride WEDISON", id: "Ride WEDISON" }, href: "/test-ride" },
  },
};

/* ========================================================================== */
/* 18. SELECTORS (nanti diganti fetch ke CMS/API tanpa ubah pemanggil)         */
/* ========================================================================== */

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (category: ProductCategory) => products.filter((p) => p.category === category);
export const getCityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
export const getDealersByCity = (citySlug: string) => dealers.filter((d) => d.citySlug === citySlug);
export const getDealerBySlug = (slug: string) => dealers.find((d) => d.slug === slug);
export const getStationsByStatus = (status: StationStatus) => superchargerStations.filter((s) => s.status === status);
export const getStationBySlug = (slug: string) => superchargerStations.find((s) => s.slug === slug);
export const getStoriesByProduct = (productSlug: string) => customerStories.filter((s) => s.productSlug === productSlug);
export const getArticleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
export const getAuthorById = (id: string) => authors.find((a) => a.id === id);
export const getFaqsByIds = (ids: string[]) => faqs.filter((f) => ids.includes(f.id));
export const getKeySpecDefinitions = () => specDefinitions.filter((d) => d.isKeySpec);

/** Kumpulkan semua data berstatus "required". Dipakai untuk halaman /dev/data-audit */
export const collectRequiredData = () => {
  const items: { entity: string; field: string; note?: string }[] = [];
  for (const p of products) {
    if (p.price.status === "required") items.push({ entity: p.name, field: "price", note: p.price.note });
    for (const [key, dp] of Object.entries(p.specs)) {
      if (dp.status === "required") items.push({ entity: p.name, field: key, note: dp.note });
    }
  }
  for (const [key, dp] of Object.entries(superchargeClaim.conditions)) {
    const point = dp as DataPoint<unknown>;
    if (point.status === "required") items.push({ entity: "15-Minute Supercharge", field: key, note: point.note });
  }
  for (const f of faqs) {
    if (f.status === "required") items.push({ entity: "FAQ", field: f.question.en });
  }
  return items;
};
