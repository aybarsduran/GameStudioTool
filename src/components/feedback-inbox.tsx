"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DetailDrawer } from "@/components/detail-drawer";
import { FilterBar } from "@/components/filter-bar";
import { FeedbackTable } from "@/components/feedback-table";
import { Toast, type ToastMessage } from "@/components/toast";
import { feedbackItems as initialFeedbackItems } from "@/lib/data/feedback";
import {
  filterFeedback,
  filtersToSearchParams,
  parseFilters,
  statusLabels,
} from "@/lib/filters";
import type { FeedbackFilters, FeedbackItem, Status } from "@/lib/types";

export function FeedbackInbox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [items, setItems] = useState<FeedbackItem[]>(initialFeedbackItems);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

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

  const showToast = useCallback((text: string) => {
    setToast({ id: Date.now(), text });
  }, []);

  const closeDrawer = useCallback(() => {
    setSelectedId(null);
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
        resultCount={filteredItems.length}
        totalCount={items.length}
        onChange={updateFilters}
      />

      <section className="flex flex-1 flex-col px-5 py-5 md:px-8">
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface shadow-[var(--shadow-panel)]">
          {filteredItems.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm font-semibold text-foreground">
                No feedback matches these filters
              </p>
              <p className="mt-2 text-sm text-muted">
                Clear a chip or broaden search to see more reports.
              </p>
            </div>
          ) : (
            <FeedbackTable
              items={filteredItems}
              selectedId={selectedId}
              onSelect={setSelectedId}
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
