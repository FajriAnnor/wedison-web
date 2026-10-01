"use client";

import { useMemo, useState } from "react";
import { tcoDefaults } from "../lib/mockData";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: tcoDefaults.currency, maximumFractionDigits: 0 }).format(
    Math.round(n),
  );

function Slider({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  display,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  display: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        <output htmlFor={id} className="text-sm font-bold tabular-nums">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-wedison-green"
      />
    </div>
  );
}

export default function TcoCalculator({ compact = false }: { compact?: boolean }) {
  const d = tcoDefaults;
  const [km, setKm] = useState(d.dailyDistanceKm.value ?? 30);
  const [fuel, setFuel] = useState(d.ice.fuelPricePerLiter.value ?? 10000);
  const [power, setPower] = useState(d.ev.electricityPricePerKwh.value ?? 1700);

  const r = useMemo(() => {
    const days = d.daysPerMonth.value ?? 26;
    const monthlyKm = km * days;
    const evEnergy = monthlyKm * ((d.ev.energyConsumptionKwhPer100Km.value ?? 0) / 100) * power;
    const iceEnergy = (monthlyKm / (d.ice.fuelEfficiencyKmPerLiter.value ?? 1)) * fuel;
    const evMaint = d.ev.maintenancePerMonth.value ?? 0;
    const iceMaint = d.ice.maintenancePerMonth.value ?? 0;
    const evMonthly = evEnergy + evMaint;
    const iceMonthly = iceEnergy + iceMaint;
    const saving = iceMonthly - evMonthly;
    const priceGap = (d.ev.vehiclePrice.value ?? 0) - (d.ice.vehiclePrice.value ?? 0);
    const payback = saving > 0 ? (priceGap <= 0 ? 0 : priceGap / saving) : null;
    return { monthlyKm, evEnergy, iceEnergy, evMaint, iceMaint, evMonthly, iceMonthly, saving, payback };
  }, [d, km, fuel, power]);

  const maxBar = Math.max(r.evMonthly, r.iceMonthly, 1);

  return (
    <div className={`grid gap-8 ${compact ? "lg:grid-cols-2" : "lg:grid-cols-5"}`}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`space-y-6 rounded-3xl border border-black/10 p-6 dark:border-white/10 ${compact ? "" : "lg:col-span-2"}`}
        aria-label="Cost assumptions"
      >
        <Slider
          id="tco-km"
          label="Daily distance"
          value={km}
          onChange={setKm}
          {...d.sliderRanges.dailyDistanceKm}
          display={`${km} km`}
        />
        <Slider
          id="tco-fuel"
          label="Fuel price per litre"
          value={fuel}
          onChange={setFuel}
          {...d.sliderRanges.fuelPricePerLiter}
          display={fmt(fuel)}
        />
        <Slider
          id="tco-power"
          label="Electricity price per kWh"
          value={power}
          onChange={setPower}
          {...d.sliderRanges.electricityPricePerKwh}
          display={fmt(power)}
        />
        <p className="text-xs text-foreground/50">
          Sample assumptions for the local prototype: {d.daysPerMonth.value} riding days a month, energy use, service costs
          and vehicle prices are placeholders until WEDISON supplies verified figures.
        </p>
      </form>

      <div className={`space-y-5 rounded-3xl bg-wedison-charcoal p-6 text-white sm:p-8 ${compact ? "" : "lg:col-span-3"}`} aria-live="polite">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">Estimated monthly running cost</p>

        {[
          { label: "WEDISON (sample assumptions)", value: r.evMonthly, color: "bg-wedison-green" },
          { label: "Petrol motorcycle", value: r.iceMonthly, color: "bg-white/40" },
        ].map((row) => (
          <div key={row.label}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-white/70">{row.label}</span>
              <span className="font-bold tabular-nums">{fmt(row.value)}</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
              <div className={`h-full rounded-full ${row.color}`} style={{ width: `${(row.value / maxBar) * 100}%` }} />
            </div>
          </div>
        ))}

        <dl className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-white/50">Monthly saving</dt>
            <dd className="mt-1 text-xl font-bold tabular-nums text-wedison-green">{fmt(Math.max(r.saving, 0))}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-white/50">Annual saving</dt>
            <dd className="mt-1 text-xl font-bold tabular-nums text-wedison-green">{fmt(Math.max(r.saving, 0) * 12)}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-[11px] uppercase tracking-wider text-white/50">Estimated payback</dt>
            <dd className="mt-1 text-xl font-bold tabular-nums">
              {r.payback === null ? "Not reached" : r.payback === 0 ? "Immediate" : `${r.payback.toFixed(1)} months`}
            </dd>
          </div>
        </dl>

        <dl className="grid grid-cols-2 gap-4 text-sm text-white/70">
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-white/40">Energy saving / month</dt>
            <dd className="tabular-nums">{fmt(r.iceEnergy - r.evEnergy)}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-white/40">Maintenance saving / month</dt>
            <dd className="tabular-nums">{fmt(r.iceMaint - r.evMaint)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
