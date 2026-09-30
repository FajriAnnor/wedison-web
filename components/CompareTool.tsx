"use client";

import { useState } from "react";
import { DEFAULT_LOCALE, products, specDefinitions } from "../lib/mockData";
import { CtaButton, DataValue, PriceValue } from "./ui/common";
import PlaceholderArt from "./ui/PlaceholderArt";

const locale = DEFAULT_LOCALE;
const MAX = 4;

export default function CompareTool({ initial = [] }: { initial?: string[] }) {
  const [selected, setSelected] = useState<string[]>(
    initial.length ? initial.slice(0, MAX) : products.slice(0, 2).map((p) => p.slug),
  );

  const toggle = (slug: string) =>
    setSelected((cur) => (cur.includes(slug) ? cur.filter((s) => s !== slug) : cur.length >= MAX ? cur : [...cur, slug]));

  const chosen = products.filter((p) => selected.includes(p.slug));

  return (
    <div>
      <fieldset>
        <legend className="text-sm font-medium">Choose 2 to {MAX} models</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {products.map((p) => {
            const on = selected.includes(p.slug);
            const locked = !on && selected.length >= MAX;
            return (
              <label
                key={p.id}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition ${
                  on ? "border-wedison-green bg-wedison-green/10 font-semibold" : "border-black/15 dark:border-white/20"
                } ${locked ? "opacity-40" : ""}`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={on}
                  disabled={locked}
                  onChange={() => toggle(p.slug)}
                />
                {p.name}
              </label>
            );
          })}
        </div>
      </fieldset>

      {chosen.length < 2 ? (
        <p className="mt-8 text-foreground/60">Select at least two models to compare.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-3xl border border-black/10 dark:border-white/10">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">Model comparison</caption>
            <thead>
              <tr>
                <th scope="col" className="w-44 p-4" />
                {chosen.map((p) => (
                  <th key={p.id} scope="col" className="p-4 align-top">
                    <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                      <PlaceholderArt kind="motorcycle" caption={false} />
                    </div>
                    <p className="mt-3 text-base font-bold">{p.name}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-black/10 dark:border-white/10">
                <th scope="row" className="p-4 font-medium text-foreground/60">
                  Price
                </th>
                {chosen.map((p) => (
                  <td key={p.id} className="p-4 font-semibold">
                    <PriceValue point={p.price} />
                  </td>
                ))}
              </tr>
              {specDefinitions.map((s) => (
                <tr key={s.key} className="border-t border-black/10 dark:border-white/10">
                  <th scope="row" className="p-4 font-medium text-foreground/60">
                    {s.label[locale]}
                  </th>
                  {chosen.map((p) => (
                    <td key={p.id} className="p-4">
                      <DataValue point={p.specs[s.key]} unit={s.unit} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-black/10 dark:border-white/10">
                <th scope="row" className="p-4 font-medium text-foreground/60">
                  Colors
                </th>
                {chosen.map((p) => (
                  <td key={p.id} className="p-4">
                    <span className="flex gap-2">
                      {p.colors.map((c) => (
                        <span
                          key={c.hex}
                          title={c.name[locale]}
                          className="h-5 w-5 rounded-full border border-black/20"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-black/10 dark:border-white/10">
                <th scope="row" className="p-4" />
                {chosen.map((p) => (
                  <td key={p.id} className="p-4">
                    <CtaButton href={`/test-ride?model=${p.slug}`}>Test Ride</CtaButton>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
