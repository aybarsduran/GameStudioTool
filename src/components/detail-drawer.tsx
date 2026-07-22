"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  platformLabels,
  severityLabels,
  statusLabels,
} from "@/lib/filters";
import { getFocusableElements } from "@/lib/focus";
import { STATUSES, type FeedbackItem, type Status } from "@/lib/types";

export const ASSIGNEES = [
  "Leila Okonkwo",
  "Sam Ortiz",
  "Tomás Silva",
  "Elena Voss",
] as const;

type DetailDrawerProps = {
  item: FeedbackItem | null;
  onClose: () => void;
  onStatusChange: (id: string, status: Status) => void;
  onAssigneeChange: (id: string, assignee: string | null) => void;
};

export function DetailDrawer({
  item,
  onClose,
  onStatusChange,
  onAssigneeChange,
}: DetailDrawerProps) {
  const open = item !== null;
  const titleId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [displayItem, setDisplayItem] = useState<FeedbackItem | null>(item);

  useEffect(() => {
    if (item) setDisplayItem(item);
  }, [item]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = getFocusableElements(panelRef.current);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const active = displayItem;

  return (
    <div
      className={[
        "fixed inset-0 z-40 flex justify-end",
        open ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
      aria-hidden={!open}
    >
      <div
        className={[
          "absolute inset-0 bg-[rgba(18,22,28,0.32)] transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={active ? titleId : undefined}
        className={[
          "relative flex h-full w-full max-w-md flex-col border-l border-border bg-surface shadow-[-12px_0_32px_rgba(18,22,28,0.08)] transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {active ? (
          <>
            <header className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
              <div className="min-w-0">
                <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted">
                  {active.id}
                </p>
                <h2
                  id={titleId}
                  className="mt-1 text-lg font-semibold tracking-tight text-foreground"
                >
                  {active.title}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="rounded-[var(--radius-sm)] border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-surface-muted"
              >
                Close
              </button>
            </header>

            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs font-medium">
                  <span
                    className={`severity-dot severity-dot--${active.severity}`}
                    aria-hidden
                  />
                  {severityLabels[active.severity]}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs font-medium">
                  <span
                    className={`status-dot status-dot--${active.status}`}
                    aria-hidden
                  />
                  {statusLabels[active.status]}
                </span>
                <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 font-mono text-xs font-medium text-accent-ink">
                  Build {active.build}
                </span>
                <span className="inline-flex items-center rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs font-medium">
                  {platformLabels[active.platform]}
                </span>
              </div>

              <section>
                <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  Description
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {active.body}
                </p>
              </section>

              <section>
                <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  Steps to reproduce
                </h3>
                <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-sm leading-relaxed text-foreground">
                  {active.stepsToReproduce.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>

              <section className="grid gap-4 rounded-[var(--radius-md)] border border-border bg-surface-muted p-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-muted">Reporter</p>
                  <p className="mt-1 text-sm font-medium">{active.reporter}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted">Created</p>
                  <p className="mt-1 font-mono text-sm">
                    {new Date(active.createdAt).toLocaleString()}
                  </p>
                </div>
              </section>

              <section className="space-y-4 border-t border-border pt-5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  Triage
                </h3>

                <div>
                  <label
                    htmlFor="feedback-status"
                    className="text-xs font-medium text-muted"
                  >
                    Status
                  </label>
                  <select
                    id="feedback-status"
                    value={active.status}
                    onChange={(event) =>
                      onStatusChange(active.id, event.target.value as Status)
                    }
                    className="mt-1 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-2 text-sm"
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {statusLabels[status]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="feedback-assignee"
                    className="text-xs font-medium text-muted"
                  >
                    Assignee
                  </label>
                  <select
                    id="feedback-assignee"
                    value={active.assignee ?? ""}
                    onChange={(event) =>
                      onAssigneeChange(
                        active.id,
                        event.target.value === "" ? null : event.target.value,
                      )
                    }
                    className="mt-1 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-2 text-sm"
                  >
                    <option value="">Unassigned</option>
                    {ASSIGNEES.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </section>
            </div>
          </>
        ) : null}
      </aside>
    </div>
  );
}
