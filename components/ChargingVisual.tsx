import Image from "next/image";
import { superchargeClaim } from "../lib/mockData";

/** Illustrative charging timeline. Numbers come from superchargeClaim.demoTimeline (mock). */
export default function ChargingVisual() {
  const timeline = superchargeClaim.demoTimeline;
  const first = timeline[0];
  const last = timeline[timeline.length - 1];

  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-wedison-charcoal p-6 text-white sm:p-8"
      role="img"
      aria-label={`WEDISON Victory using SuperCharge with an illustrative charging timeline from ${first.percent}% to ${last.percent}% in ${last.minute} minutes`}
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
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Charging</p>
          <p className="mt-1 text-5xl font-extrabold tabular-nums text-wedison-green sm:text-6xl">{last.percent}%</p>
        </div>
        <p className="text-right text-sm text-white/60">in {last.minute} min*</p>
      </div>

      <div className="relative mt-6 flex items-center gap-1.5">
        <div className="h-12 flex-1 overflow-hidden rounded-lg border border-white/25 p-1 sm:h-14">
          <div className="h-full rounded-md bg-wedison-green motion-safe:animate-pulse" style={{ width: `${last.percent}%` }} />
        </div>
        <div aria-hidden className="h-5 w-1.5 rounded-r bg-white/25" />
      </div>

      <ol className="relative mt-6 grid grid-cols-4 gap-2 text-center">
        {timeline.map((t) => (
          <li key={t.minute} className="rounded-lg bg-white/5 px-1 py-3">
            <p className="text-base font-bold tabular-nums sm:text-lg">{t.percent}%</p>
            <p className="mt-0.5 text-[11px] text-white/50">{t.minute} min</p>
          </li>
        ))}
      </ol>

      <ul className="relative mt-6 grid grid-cols-4 gap-2 text-center text-[11px] text-white/60">
        {superchargeClaim.storySteps.map((s) => (
          <li key={s.id}>{s.label.en}</li>
        ))}
      </ul>

      <p className="relative mt-5 text-[11px] text-white/40">
        *Illustrative visual only. Verified charging conditions will be published before launch.
      </p>
    </div>
  );
}
