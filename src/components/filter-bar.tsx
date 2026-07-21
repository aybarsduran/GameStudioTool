"use client";

import type { ReactNode } from "react";
import {
  platformLabels,
  severityLabels,
  statusLabels,
  toggleInList,
} from "@/lib/filters";
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
  return (
    <div className="space-y-3 border-b border-border bg-surface px-5 py-4 md:px-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 flex-1">
          <label
            htmlFor="feedback-search"
            className="text-xs font-medium text-muted"
          >
            Search
          </label>
          <input
            id="feedback-search"
            type="search"
            value={filters.q}
            onChange={(event) =>
              onChange({ ...filters, q: event.target.value })
            }
            placeholder="Title or description…"
            className="mt-1 w-full rounded-[var(--radius-sm)] border border-border bg-surface-muted px-3 py-2 text-sm text-foreground placeholder:text-muted"
          />
        </div>

        <div className="w-full lg:w-44">
          <label
            htmlFor="feedback-platform"
            className="text-xs font-medium text-muted"
          >
            Platform
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
            <option value="all">All platforms</option>
            {PLATFORMS.map((platform) => (
              <option key={platform} value={platform}>
                {platformLabels[platform]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted">Status</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Status">
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
              {statusLabels[status]}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-muted">Severity</p>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Severity"
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
                {severityLabels[severity]}
              </Chip>
            ))}
          </div>
        </div>

        <p className="font-mono text-xs text-muted" aria-live="polite">
          {resultCount} of {totalCount} items
        </p>
      </div>
    </div>
  );
}
