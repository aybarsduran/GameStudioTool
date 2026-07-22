"use client";

import {
  useCallback,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  formatAge,
  platformLabels,
  severityLabels,
  statusLabels,
} from "@/lib/filters";
import type { FeedbackItem } from "@/lib/types";

type FeedbackTableProps = {
  items: FeedbackItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function FeedbackTable({
  items,
  selectedId,
  onSelect,
}: FeedbackTableProps) {
  const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map());

  const focusRow = useCallback((id: string) => {
    rowRefs.current.get(id)?.focus();
  }, []);

  const handleRowKeyDown = (
    event: ReactKeyboardEvent<HTMLTableRowElement>,
    index: number,
    id: string,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(id);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = items[index + 1];
      if (next) focusRow(next.id);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const previous = items[index - 1];
      if (previous) focusRow(previous.id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm">
        <caption className="sr-only">
          Playtest feedback inbox. Use arrow keys to move between rows, Enter
          to open details.
        </caption>
        <thead className="border-b border-border bg-surface-muted text-xs uppercase tracking-[0.06em] text-muted">
          <tr>
            <th scope="col" className="px-3 py-2.5 font-medium md:px-4">
              Severity
            </th>
            <th scope="col" className="px-3 py-2.5 font-medium md:px-4">
              Title
            </th>
            <th scope="col" className="px-3 py-2.5 font-medium md:px-4">
              Build
            </th>
            <th scope="col" className="px-3 py-2.5 font-medium md:px-4">
              Platform
            </th>
            <th scope="col" className="px-3 py-2.5 font-medium md:px-4">
              Status
            </th>
            <th scope="col" className="px-3 py-2.5 font-medium md:px-4">
              Reporter
            </th>
            <th scope="col" className="px-3 py-2.5 font-medium md:px-4">
              Age
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const selected = item.id === selectedId;

            return (
              <tr
                key={item.id}
                ref={(node) => {
                  if (node) rowRefs.current.set(item.id, node);
                  else rowRefs.current.delete(item.id);
                }}
                data-feedback-id={item.id}
                tabIndex={0}
                aria-selected={selected}
                onClick={() => onSelect(item.id)}
                onKeyDown={(event) => handleRowKeyDown(event, index, item.id)}
                className={[
                  "cursor-pointer border-b border-border last:border-b-0 transition-colors",
                  selected
                    ? "bg-accent-soft/70"
                    : "hover:bg-surface-muted/70",
                ].join(" ")}
              >
                <td className="whitespace-nowrap px-3 py-2.5 md:px-4">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={`severity-dot severity-dot--${item.severity}`}
                      aria-hidden
                    />
                    <span className="font-medium">
                      {severityLabels[item.severity]}
                    </span>
                  </span>
                </td>
                <td className="max-w-[18rem] px-3 py-2.5 md:max-w-[24rem] md:px-4">
                  <span className="line-clamp-2 font-medium text-foreground">
                    {item.title}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 font-mono text-xs md:px-4">
                  {item.build}
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 md:px-4">
                  {platformLabels[item.platform]}
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 md:px-4">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={`status-dot status-dot--${item.status}`}
                      aria-hidden
                    />
                    <span>{statusLabels[item.status]}</span>
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 md:px-4">
                  {item.reporter}
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 font-mono text-xs text-muted md:px-4">
                  <time dateTime={item.createdAt}>
                    {formatAge(item.createdAt)}
                  </time>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
