import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InfoPage from "@/components/InfoPage";
import { getLegalPage, legalPages } from "@/lib/pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getLegalPage(slug);
  if (!page) return {};
  return { title: `${page.title} | WEDISON`, description: page.intro };
}

export default async function Page(props: PageProps<"/legal/[slug]">) {
  const { slug } = await props.params;
  const page = getLegalPage(slug);
  if (!page) notFound();
  return <InfoPage page={page} />;
}
