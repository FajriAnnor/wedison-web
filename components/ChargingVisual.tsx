import Image from "next/image";
import { superchargeClaim } from "../lib/mockData";

/** Compact presentation of WEDISON's published 10%-to-80% SuperCharge claim. */
export default function ChargingVisual() {
  const timeline = superchargeClaim.demoTimeline;
  const first = timeline[0];
  const last = timeline[timeline.length - 1];

  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-wedison-charcoal p-6 text-white sm:p-8"
      role="img"
      aria-label={`WEDISON Victory using SuperCharge, charging from ${first.percent}% to ${last.percent}% in ${last.minute} minutes`}
    >
      <Image
        src="/images/wedison/supercharge/victory-supercharging.webp"
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-wedison-charcoal/85" />
      <div className="relative flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">SuperCharge</p>
          <p className="mt-1 text-5xl font-extrabold tabular-nums text-wedison-green sm:text-6xl">{last.percent}%</p>
        </div>
        <p className="text-right text-sm text-white/60">
          from {first.percent}%<br />in {last.minute} min
        </p>
      </div>

      <div aria-hidden className="relative mt-6 flex items-center gap-1.5">
        <div className="relative h-12 flex-1 overflow-hidden rounded-lg border border-white/25 bg-white/5 p-1 sm:h-14">
          <div
            className="absolute inset-y-1 rounded-md bg-wedison-green"
            style={{ left: `${first.percent}%`, width: `${last.percent - first.percent}%` }}
          />
        </div>
        <div className="h-5 w-1.5 rounded-r bg-white/25" />
      </div>

      <dl className="relative mt-6 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-white/5 px-2 py-3">
          <dt className="text-[11px] uppercase tracking-wider text-white/50">Start</dt>
          <dd className="mt-1 text-lg font-bold tabular-nums">{first.percent}%</dd>
        </div>
        <div className="rounded-lg bg-white/5 px-2 py-3">
          <dt className="text-[11px] uppercase tracking-wider text-white/50">Time</dt>
          <dd className="mt-1 text-lg font-bold tabular-nums">{last.minute} min</dd>
        </div>
        <div className="rounded-lg bg-white/5 px-2 py-3">
          <dt className="text-[11px] uppercase tracking-wider text-white/50">Ready</dt>
          <dd className="mt-1 text-lg font-bold tabular-nums">{last.percent}%</dd>
        </div>
      </dl>

      <p className="relative mt-5 text-[11px] text-white/40">
        Official WEDISON claim for compatible motorcycles.
      </p>
    </div>
  );
}
