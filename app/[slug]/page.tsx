import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InfoPage from "@/components/InfoPage";
import { getSitePage, sitePages } from "@/lib/pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return sitePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getSitePage(slug);
  if (!page) return {};
  return { title: `${page.title} | WEDISON`, description: page.intro };
}

export default async function Page(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const page = getSitePage(slug);
  if (!page) notFound();
  return <InfoPage page={page} />;
}
