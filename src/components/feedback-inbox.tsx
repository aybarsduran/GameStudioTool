"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DetailDrawer } from "@/components/detail-drawer";
import { EmptyState } from "@/components/empty-state";
import { FilterBar } from "@/components/filter-bar";
import { FeedbackTable } from "@/components/feedback-table";
import { SkeletonTable } from "@/components/skeleton-table";
import { Toast, type ToastMessage } from "@/components/toast";
import { feedbackItems as initialFeedbackItems } from "@/lib/data/feedback";
import { focusElementBySelector } from "@/lib/focus";
import {
  filterFeedback,
  filtersToSearchParams,
  parseFilters,
  statusLabels,
} from "@/lib/filters";
import type { FeedbackFilters, FeedbackItem, Status } from "@/lib/types";

const INITIAL_LOAD_MS = 500;

export function FeedbackInbox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [items, setItems] = useState<FeedbackItem[]>(initialFeedbackItems);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const returnFocusIdRef = useRef<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), INITIAL_LOAD_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const filters = useMemo(
    () => parseFilters(searchParams),
    [searchParams],
  );

  const filteredItems = useMemo(
    () => filterFeedback(items, filters),
    [filters, items],
  );

  const selectedItem =
    filteredItems.find((item) => item.id === selectedId) ??
    items.find((item) => item.id === selectedId) ??
    null;

  const updateFilters = useCallback(
    (next: FeedbackFilters) => {
      const params = filtersToSearchParams(next);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router],
  );

  const clearFilters = useCallback(() => {
    updateFilters({
      q: "",
      status: [],
      severity: [],
      platform: "all",
    });
  }, [updateFilters]);

  const showToast = useCallback((text: string) => {
    setToast({ id: Date.now(), text });
  }, []);

  const handleSelect = useCallback((id: string) => {
    returnFocusIdRef.current = id;
    setSelectedId(id);
  }, []);

  const closeDrawer = useCallback(() => {
    const returnId = returnFocusIdRef.current;
    setSelectedId(null);

    window.requestAnimationFrame(() => {
      if (returnId) {
        focusElementBySelector(`[data-feedback-id="${returnId}"]`);
      }
    });
  }, []);

  const handleStatusChange = useCallback(
    (id: string, status: Status) => {
      setItems((current) =>
        current.map((item) => (item.id === id ? { ...item, status } : item)),
      );
      showToast(`Status updated to ${statusLabels[status]}`);
    },
    [showToast],
  );

  const handleAssigneeChange = useCallback(
    (id: string, assignee: string | null) => {
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, assignee } : item,
        ),
      );
      showToast(
        assignee ? `Assigned to ${assignee}` : "Assignee cleared",
      );
    },
    [showToast],
  );

  return (
    <>
      <FilterBar
        filters={filters}
        resultCount={isLoading ? 0 : filteredItems.length}
        totalCount={items.length}
        onChange={updateFilters}
      />

      <section
        className="flex flex-1 flex-col px-5 py-5 md:px-8"
        aria-labelledby="inbox-results-heading"
      >
        <h2 id="inbox-results-heading" className="sr-only">
          Feedback results
        </h2>
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface shadow-[var(--shadow-panel)]">
          {isLoading ? (
            <SkeletonTable />
          ) : filteredItems.length === 0 ? (
            <EmptyState
              title="No feedback matches these filters"
              description="Clear a chip or broaden search to see more playtest reports."
              actionLabel="Clear filters"
              onAction={clearFilters}
            />
          ) : (
            <FeedbackTable
              items={filteredItems}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          )}
        </div>
      </section>

      <DetailDrawer
        item={selectedItem}
        onClose={closeDrawer}
        onStatusChange={handleStatusChange}
        onAssigneeChange={handleAssigneeChange}
      />

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </>
  );
}
