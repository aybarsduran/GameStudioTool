"use client";

import type { ReactNode } from "react";
import { toggleInList } from "@/lib/filters";
import { useLocale } from "@/lib/i18n/provider";
import {
  PLATFORMS,
  SEVERITIES,
  STATUSES,
  type FeedbackFilters,
  type Platform,
  type Severity,
  type Status,
} from "@/lib/types";

type FilterBarProps = {
  filters: FeedbackFilters;
  resultCount: number;
  totalCount: number;
  onChange: (next: FeedbackFilters) => void;
};

function Chip({
  pressed,
  onClick,
  children,
  tone,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
  tone?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
        pressed
          ? "border-accent bg-accent-soft text-accent-ink"
          : "border-border bg-surface text-foreground hover:bg-surface-muted",
      ].join(" ")}
    >
      {tone ? (
        <span className={`h-1.5 w-1.5 rounded-full ${tone}`} aria-hidden />
      ) : null}
      {children}
    </button>
  );
}

export function FilterBar({
  filters,
  resultCount,
  totalCount,
  onChange,
}: FilterBarProps) {
  const { t, format } = useLocale();

  return (
    <div className="space-y-3 border-b border-border bg-surface px-5 py-4 md:px-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 flex-1">
          <label
            htmlFor="feedback-search"
            className="text-xs font-medium text-muted"
          >
            {t.inbox.search}
          </label>
          <input
            id="feedback-search"
            type="search"
            value={filters.q}
            onChange={(event) =>
              onChange({ ...filters, q: event.target.value })
            }
            placeholder={t.inbox.searchPlaceholder}
            className="mt-1 w-full rounded-[var(--radius-sm)] border border-border bg-surface-muted px-3 py-2 text-sm text-foreground placeholder:text-muted"
          />
        </div>

        <div className="w-full lg:w-44">
          <label
            htmlFor="feedback-platform"
            className="text-xs font-medium text-muted"
          >
            {t.inbox.platform}
          </label>
          <select
            id="feedback-platform"
            value={filters.platform}
            onChange={(event) =>
              onChange({
                ...filters,
                platform: event.target.value as Platform | "all",
              })
            }
            className="mt-1 w-full rounded-[var(--radius-sm)] border border-border bg-surface-muted px-3 py-2 text-sm text-foreground"
          >
            <option value="all">{t.inbox.allPlatforms}</option>
            {PLATFORMS.map((platform) => (
              <option key={platform} value={platform}>
                {t.platform[platform]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted">{t.inbox.status}</p>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label={t.inbox.status}
        >
          {STATUSES.map((status: Status) => (
            <Chip
              key={status}
              pressed={filters.status.includes(status)}
              tone={`status-dot status-dot--${status}`}
              onClick={() =>
                onChange({
                  ...filters,
                  status: toggleInList(filters.status, status),
                })
              }
            >
              {t.status[status]}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-muted">{t.inbox.severity}</p>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label={t.inbox.severity}
          >
            {SEVERITIES.map((severity: Severity) => (
              <Chip
                key={severity}
                pressed={filters.severity.includes(severity)}
                tone={`severity-dot severity-dot--${severity}`}
                onClick={() =>
                  onChange({
                    ...filters,
                    severity: toggleInList(filters.severity, severity),
                  })
                }
              >
                {t.severity[severity]}
              </Chip>
            ))}
          </div>
        </div>

        <p className="font-mono text-xs text-muted" aria-live="polite">
          {format(t.inbox.resultCount, {
            count: resultCount,
            total: totalCount,
          })}
        </p>
      </div>
    </div>
  );
}
