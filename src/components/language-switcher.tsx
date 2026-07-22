"use client";

import { useLocale } from "@/lib/i18n/provider";
import type { Locale } from "@/lib/i18n/messages";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] border border-border bg-surface-muted p-0.5"
      role="group"
      aria-label={t.language.label}
    >
      {(["en", "tr"] as Locale[]).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            onClick={() => setLocale(code)}
            className={[
              "rounded-[calc(var(--radius-sm)-1px)] px-2 py-1 font-mono text-[0.6875rem] font-semibold transition-colors",
              active
                ? "bg-surface text-accent-ink shadow-[var(--shadow-panel)]"
                : "text-muted hover:text-foreground",
            ].join(" ")}
          >
            {t.language[code]}
          </button>
        );
      })}
    </div>
  );
}
