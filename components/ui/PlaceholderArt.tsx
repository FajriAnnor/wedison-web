export type VisualKind =
  | "motorcycle"
  | "charger"
  | "battery"
  | "map"
  | "rider"
  | "article"
  | "tech"
  | "business"
  | "service";

const stroke = "rgba(255,255,255,0.75)";
const dim = "rgba(255,255,255,0.28)";
const green = "#00A86B";

function Motorcycle() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
      <circle cx="95" cy="175" r="48" stroke={stroke} />
      <circle cx="95" cy="175" r="30" stroke={dim} />
      <circle cx="315" cy="175" r="48" stroke={stroke} />
      <circle cx="315" cy="175" r="30" stroke={dim} />
      <path d="M95 175 L150 135 H230" stroke={stroke} />
      <path d="M230 135 L268 100 L292 100" stroke={stroke} />
      <path d="M285 100 L315 175" stroke={stroke} />
      <path d="M110 112 Q160 96 215 108 L238 118" stroke={stroke} />
      <rect x="150" y="138" width="84" height="34" rx="8" stroke={green} />
      <path d="M164 155 H196" stroke={green} strokeWidth="6" />
      <path d="M262 92 L282 74 H306" stroke={stroke} />
      <circle cx="298" cy="92" r="6" stroke={stroke} />
    </g>
  );
}

function Charger() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
      <rect x="150" y="50" width="100" height="150" rx="14" stroke={stroke} />
      <rect x="168" y="72" width="64" height="40" rx="6" stroke={dim} />
      <path d="M205 80 L188 100 H212 L195 122" stroke={green} strokeWidth="5" />
      <path d="M250 150 C300 150 300 110 330 110" stroke={stroke} />
      <rect x="330" y="98" width="30" height="24" rx="5" stroke={stroke} />
      <path d="M130 200 H270" stroke={dim} />
    </g>
  );
}

function Battery() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
      <rect x="90" y="80" width="200" height="100" rx="14" stroke={stroke} />
      <rect x="290" y="112" width="18" height="36" rx="4" stroke={stroke} />
      <rect x="104" y="94" width="52" height="72" rx="6" fill={green} stroke="none" />
      <rect x="164" y="94" width="52" height="72" rx="6" fill={green} stroke="none" opacity="0.7" />
      <rect x="224" y="94" width="52" height="72" rx="6" stroke={dim} />
    </g>
  );
}

function MapArt() {
  return (
    <g fill="none" strokeLinecap="round" strokeWidth="2">
      {Array.from({ length: 9 }).map((_, i) => (
        <path key={`v${i}`} d={`M${40 + i * 40} 20 V220`} stroke="rgba(255,255,255,0.08)" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <path key={`h${i}`} d={`M20 ${30 + i * 36} H380`} stroke="rgba(255,255,255,0.08)" />
      ))}
      <path d="M40 190 C120 150 160 170 220 110 S330 70 370 50" stroke={dim} strokeWidth="4" />
      {[
        [120, 160],
        [220, 110],
        [300, 82],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="14" fill="rgba(0,168,107,0.25)" />
          <circle cx={x} cy={y} r="6" fill={green} />
        </g>
      ))}
    </g>
  );
}

function Rider() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
      <circle cx="200" cy="90" r="34" stroke={stroke} />
      <path d="M130 210 C130 150 270 150 270 210" stroke={stroke} />
      <path d="M170 96 H230" stroke={dim} />
    </g>
  );
}

function Article() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
      <rect x="110" y="50" width="180" height="140" rx="12" stroke={stroke} />
      <path d="M135 84 H265 M135 112 H235 M135 140 H210" stroke={dim} />
      <path d="M135 168 H170" stroke={green} strokeWidth="6" />
    </g>
  );
}

function Tech() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
      <rect x="150" y="80" width="100" height="80" rx="10" stroke={stroke} />
      <rect x="180" y="100" width="40" height="40" rx="6" stroke={green} />
      <path d="M170 80 V60 M200 80 V60 M230 80 V60 M170 160 V180 M200 160 V180 M230 160 V180" stroke={dim} />
    </g>
  );
}

function Business() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
      <rect x="120" y="70" width="70" height="120" rx="6" stroke={stroke} />
      <rect x="200" y="110" width="80" height="80" rx="6" stroke={stroke} />
      <path d="M140 95 H170 M140 120 H170 M140 145 H170 M220 135 H260 M220 160 H260" stroke={dim} />
      <path d="M100 190 H300" stroke={green} />
    </g>
  );
}

function Service() {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
      <circle cx="200" cy="120" r="34" stroke={stroke} />
      <circle cx="200" cy="120" r="12" stroke={green} />
      <path d="M200 70 V86 M200 154 V170 M150 120 H166 M234 120 H250 M165 85 L176 96 M224 144 L235 155 M235 85 L224 96 M176 144 L165 155" stroke={dim} />
    </g>
  );
}

const ART: Record<VisualKind, () => React.JSX.Element> = {
  motorcycle: Motorcycle,
  charger: Charger,
  battery: Battery,
  map: MapArt,
  rider: Rider,
  article: Article,
  tech: Tech,
  business: Business,
  service: Service,
};

/**
 * Non-factual visual placeholder. Used when no real image file exists in /public.
 * It is line art, so it can never be mistaken for an official WEDISON photograph.
 */
export default function PlaceholderArt({
  kind,
  caption = true,
  className = "",
}: {
  kind: VisualKind;
  caption?: boolean;
  className?: string;
}) {
  const Art = ART[kind];
  return (
    <div
      role="img"
      aria-label={`Illustrative placeholder: ${kind}`}
      className={`relative h-full w-full overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,#282d2a_0%,#1a1f1c_55%,#111513_100%)] ${className}`}
    >
      <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <Art />
      </svg>
      {caption && (
        <span className="absolute bottom-2 right-3 rounded bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50">
          Illustrative placeholder
        </span>
      )}
    </div>
  );
}
