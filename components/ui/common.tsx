import Link from "next/link";
import {
  DATA_REQUIRED_LABEL,
  hasValue,
  type DataPoint,
  type Money,
} from "../../lib/mockData";

/** Standard brand action: WEDISON green. */
export const ctaClass =
  "inline-flex items-center justify-center rounded-full bg-wedison-green px-7 py-3.5 text-sm font-semibold tracking-wide text-wedison-ink transition hover:-translate-y-0.5 hover:bg-wedison-dark-green hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wedison-green";

/** Reserved for conversion actions such as booking a test ride or purchasing. */
export const conversionCtaClass =
  "inline-flex items-center justify-center rounded-full bg-wedison-orange px-7 py-3.5 text-sm font-semibold tracking-wide text-wedison-ink transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wedison-orange";

export const ghostClass =
  "inline-flex items-center justify-center rounded-full border border-current px-7 py-3.5 text-sm font-semibold tracking-wide transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2";

export function CtaButton({
  href,
  children,
  className = "",
  conversion = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  conversion?: boolean;
}) {
  return (
    <Link href={href} className={`${conversion ? conversionCtaClass : ctaClass} ${className}`}>
      {children}
    </Link>
  );
}

export function GhostButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${ghostClass} ${className}`}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${light ? "text-white/60" : "text-foreground/50"}`}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl">{title}</h2>
      {body && <p className={`mt-5 text-base sm:text-lg ${light ? "text-white/70" : "text-foreground/70"}`}>{body}</p>}
    </div>
  );
}

/** Small tag that marks sample/mock numbers so nobody mistakes them for verified data. */
export function SampleTag() {
  return (
    <span
      title="Sample value for the local prototype. Not verified by WEDISON."
      className="ml-1.5 inline-block rounded bg-foreground/10 px-1.5 py-0.5 align-middle text-[9px] font-bold uppercase tracking-wider text-foreground/50"
    >
      Sample
    </span>
  );
}

/** Renders a DataPoint honestly: verified as-is, mock with Sample tag, required as [DATA REQUIRED]. */
export function DataValue({
  point,
  unit = "",
  format,
}: {
  point: DataPoint<string | number | boolean>;
  unit?: string;
  format?: (v: string | number | boolean) => string;
}) {
  if (!hasValue(point)) {
    return <span className="text-foreground/40">{DATA_REQUIRED_LABEL}</span>;
  }
  const raw = point.value;
  const text = format
    ? format(raw)
    : typeof raw === "boolean"
      ? raw
        ? "Yes"
        : "No"
      : `${raw}${unit ? ` ${unit}` : ""}`;
  return (
    <>
      {text}
      {point.status === "mock" && <SampleTag />}
    </>
  );
}

export function formatMoney(m: Money): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: m.currency,
    maximumFractionDigits: 0,
  }).format(m.amount);
}

export function PriceValue({ point }: { point: DataPoint<Money> }) {
  if (!hasValue(point)) return <span className="text-foreground/40">{DATA_REQUIRED_LABEL}</span>;
  return (
    <>
      {formatMoney(point.value)}
      {point.status === "mock" && <SampleTag />}
    </>
  );
}
