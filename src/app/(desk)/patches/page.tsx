"use client";

import { PageHeader } from "@/components/page-header";
import { patchNotes } from "@/lib/data/patches";
import { useLocale } from "@/lib/i18n/provider";

export default function PatchesPage() {
  const { t, locale } = useLocale();

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex flex-1 flex-col outline-none"
    >
      <PageHeader
        eyebrow={t.patches.eyebrow}
        title={t.patches.title}
        description={t.patches.description}
      />

      <section className="flex flex-1 flex-col gap-4 px-5 py-5 md:px-8">
        {patchNotes.map((patch) => (
          <article
            key={patch.id}
            className="rounded-[var(--radius-md)] border border-border bg-surface p-5 shadow-[var(--shadow-panel)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs font-medium text-accent">
                  {patch.version}
                </p>
                <h2 className="mt-1 text-base font-semibold tracking-tight">
                  {patch.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={[
                    "rounded-full border px-2.5 py-1 text-xs font-medium",
                    patch.status === "published"
                      ? "border-border bg-surface-muted text-foreground"
                      : "border-accent/30 bg-accent-soft text-accent-ink",
                  ].join(" ")}
                >
                  {patch.status === "published"
                    ? t.patches.published
                    : t.patches.draft}
                </span>
                <time
                  dateTime={patch.publishedAt}
                  className="font-mono text-xs text-muted"
                >
                  {new Date(patch.publishedAt).toLocaleDateString(
                    locale === "tr" ? "tr-TR" : "en-US",
                  )}
                </time>
              </div>
            </div>

            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground">
              {patch.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
