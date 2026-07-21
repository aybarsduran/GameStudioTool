"use client";

import {
  formatAge,
  platformLabels,
  severityLabels,
  statusLabels,
} from "@/lib/filters";
import type { FeedbackItem } from "@/lib/types";

type FeedbackTableProps = {
  items: FeedbackItem[];
};

export function FeedbackTable({ items }: FeedbackTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm">
        <caption className="sr-only">Playtest feedback inbox</caption>
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
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-b border-border last:border-b-0 hover:bg-surface-muted/70"
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
