import Link from "next/link";

type Props = {
  /** Target locale URL (e.g. "/tr/blog/foo"). */
  fallbackHref: string;
  /** Language label shown in the CTA. */
  fallbackLabel?: string;
};

export function MissingTranslationNotice({
  fallbackHref,
  fallbackLabel = "Türkçe sürümü görüntüle",
}: Props) {
  return (
    <section
      className="rounded-2xl border border-black/[.08] bg-black/[.02] p-5 text-zinc-900 dark:border-white/[.12] dark:bg-white/[.06] dark:text-zinc-50"
      aria-label="Translation notice"
    >
      <h2 className="text-base font-semibold">
        Bu içerik şimdilik sadece Türkçe.
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
        İngilizce çevirisi hazır olduğunda bu sayfada yayınlanacak.
      </p>
      <div className="mt-4">
        <Link
          href={fallbackHref}
          className="inline-flex h-10 items-center justify-center rounded-full bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {fallbackLabel}
        </Link>
      </div>
    </section>
  );
}


