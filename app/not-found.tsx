import Link from "next/link";
import { CtaButton } from "@/components/ui/common";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center bg-wedison-ink text-white">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Error 404</p>
        <h1 className="mt-4 text-4xl font-extrabold uppercase leading-none sm:text-6xl">This road does not exist.</h1>
        <p className="mt-6 text-white/70">The page you are looking for has moved or was never here.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CtaButton href="/">Back to Home</CtaButton>
          <Link href="/motorcycles" className="text-sm font-semibold underline-offset-4 hover:underline">
            Explore Models
          </Link>
        </div>
      </div>
    </section>
  );
}
