import Link from "next/link";
import { CtaButton } from "./ui/common";

/** Mobile-only sticky bar (brief section 35): primary Test Ride, secondary Dealer. */
export default function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-black/10 bg-background/95 px-4 py-3 backdrop-blur lg:hidden dark:border-white/10">
      <CtaButton href="/test-ride" className="flex-1 py-3">
        Test Ride
      </CtaButton>
      <Link href="/dealer" className="px-3 py-3 text-sm font-semibold">
        Find a Dealer
      </Link>
    </div>
  );
}
