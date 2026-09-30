import Link from "next/link";
import {
  DEFAULT_LOCALE,
  getAuthorById,
  hasValue,
  cities,
  products,
  type Article,
  type CustomerStory,
  type Product,
} from "../lib/mockData";
import Visual from "./ui/Visual";
import { CtaButton, DataValue, PriceValue, SampleTag } from "./ui/common";

const locale = DEFAULT_LOCALE;

export function ProductCard({ product }: { product: Product }) {
  const s = product.specs;
  const sc = hasValue(s.superchargeSupported) && s.superchargeSupported.value === true;
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-background transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10">
      <Link href={`/motorcycles/${product.slug}`} className="relative block" aria-label={`${product.name} details`}>
        <Visual
          kind="motorcycle"
          src={product.heroImage.src}
          alt={product.heroImage.alt[locale]}
          className="aspect-[4/3]"
          caption={false}
        />
        <span className="absolute left-4 top-4 flex gap-2">
          {product.isNew && (
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black">New</span>
          )}
          {sc && (
            <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-wedison-green ring-1 ring-wedison-green/50">
              Supercharge*
            </span>
          )}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs uppercase tracking-widest text-foreground/50">{product.category}</p>
        <h3 className="mt-1 text-xl font-bold">{product.name}</h3>
        <p className="mt-1 text-sm text-foreground/60">{product.positioning[locale]}</p>

        <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-black/10 pt-5 text-sm dark:border-white/10">
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-foreground/50">Range</dt>
            <dd className="mt-0.5 font-semibold">
              <DataValue point={s.rangeClaimed} unit="km" />
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-foreground/50">Top speed</dt>
            <dd className="mt-0.5 font-semibold">
              <DataValue point={s.topSpeed} unit="km/h" />
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[11px] uppercase tracking-wider text-foreground/50">Price</dt>
            <dd className="mt-0.5 font-semibold">
              <PriceValue point={product.price} />
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <CtaButton href={`/motorcycles/${product.slug}`}>Explore Model</CtaButton>
          <Link href={`/compare?models=${product.slug}`} className="text-sm font-semibold underline-offset-4 hover:underline">
            Compare
          </Link>
          <Link href={`/test-ride?model=${product.slug}`} className="text-sm font-semibold text-wedison-orange underline-offset-4 hover:underline">
            Test Ride
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  const author = getAuthorById(article.authorId);
  return (
    <article className="overflow-hidden rounded-3xl border border-black/10 transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10">
      <Link href={`/articles/${article.slug}`} className="block">
        <Visual
          kind="article"
          src={article.featuredImage.src}
          alt={article.featuredImage.alt[locale]}
          className="aspect-[16/9]"
          caption={false}
        />
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-wedison-green">
            {article.category.replace(/-/g, " ")}
          </p>
          <h3 className="mt-2 text-lg font-bold leading-snug">{article.title[locale]}</h3>
          <p className="mt-2 text-sm text-foreground/65">{article.excerpt[locale]}</p>
          <p className="mt-4 text-xs text-foreground/50">
            {article.publishedAt} · {article.readingMinutes} min read
            {author ? ` · ${author.name}` : ""}
          </p>
        </div>
      </Link>
    </article>
  );
}

export function StoryCard({ story }: { story: CustomerStory }) {
  const city = cities.find((c) => c.slug === story.citySlug)?.name[locale];
  const model = products.find((p) => p.slug === story.productSlug)?.name;
  return (
    <article className="overflow-hidden rounded-3xl border border-black/10 dark:border-white/10">
      <Visual
        kind="rider"
        src={story.portrait.src}
        alt={story.portrait.alt[locale]}
        className="aspect-[4/3]"
        caption={false}
      />
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
          {story.persona.replace(/_/g, " ")} · {city}
        </p>
        <h3 className="mt-2 text-lg font-bold">
          {story.riderName}
          <SampleTag />
        </h3>
        <p className="mt-1 text-sm text-foreground/60">
          {story.profession[locale]} · {model}
        </p>
        <p className="mt-4 text-sm italic text-foreground/60">[PLACEHOLDER] Real rider quote with written consent goes here.</p>
        <p className="mt-4 text-xs text-foreground/50">Fictional sample profile. Not a real testimonial.</p>
      </div>
    </article>
  );
}
