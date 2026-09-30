import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import PlaceholderArt, { type VisualKind } from "./PlaceholderArt";

/** True only when the file really exists in /public, so we never request a missing image. */
function publicFileExists(src: string): boolean {
  if (!src.startsWith("/")) return false;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

interface VisualProps {
  kind: VisualKind;
  src?: string;
  alt: string;
  /** Tailwind classes for the wrapper, e.g. "aspect-[4/3] rounded-3xl" */
  className?: string;
  priority?: boolean;
  caption?: boolean;
}

/**
 * Reusable image with a built-in fallback.
 * Real file present in /public -> next/image. Otherwise -> intentional line-art placeholder.
 */
export default function Visual({ kind, src, alt, className = "", priority = false, caption = true }: VisualProps) {
  const hasFile = src ? publicFileExists(src) : false;
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {hasFile && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <PlaceholderArt kind={kind} caption={caption} />
      )}
    </div>
  );
}
