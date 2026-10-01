import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { ArticleCard } from "@/components/cards";
import Visual from "@/components/ui/Visual";
import { CtaButton } from "@/components/ui/common";
import { DEFAULT_LOCALE, articles, getArticleBySlug, getAuthorById } from "@/lib/mockData";

const locale = DEFAULT_LOCALE;

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const a = getArticleBySlug(slug);
  if (!a) return {};
  return { title: `${a.title[locale]} | WEDISON`, description: a.excerpt[locale] };
}

export default async function ArticlePage(props: PageProps<"/articles/[slug]">) {
  const { slug } = await props.params;
  const a = getArticleBySlug(slug);
  if (!a) notFound();

  const author = getAuthorById(a.authorId);
  const related = a.relatedSlugs.map((s) => getArticleBySlug(s)).filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <PageHero
        eyebrow={a.category.replace(/-/g, " ")}
        title={a.title[locale]}
        intro={a.excerpt[locale]}
        visual="article"
        crumbs={[{ label: "Articles", href: "/articles" }, { label: a.title[locale] }]}
      />
      <article className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Visual
            kind="article"
            src={a.featuredImage.src}
            alt={a.featuredImage.alt[locale]}
            className="aspect-[16/9] rounded-3xl"
          />
          <p className="mt-6 text-sm text-foreground/60">
            {author?.name} · Published {a.publishedAt} · Updated {a.updatedAt} · {a.readingMinutes} min read
          </p>
          <p className="mt-8 text-lg text-foreground/80">{a.excerpt[locale]}</p>
          <p className="mt-6 rounded-2xl border border-dashed border-black/20 p-5 text-sm text-foreground/60 dark:border-white/20">
            [PLACEHOLDER] The full article text will be written and approved by the WEDISON editorial team. This page shows
            the article layout: author, dates, category, image, reading time, related articles and call to action.
          </p>
          <div className="mt-10">
            <CtaButton href="/test-ride" conversion>Book a Test Ride</CtaButton>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-foreground/[0.03] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold uppercase">Related articles</h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <ArticleCard article={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
