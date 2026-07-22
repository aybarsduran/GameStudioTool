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
} from "@/lib/filters";
import { useLocale } from "@/lib/i18n/provider";
import { loadSettings } from "@/lib/settings";
import type { FeedbackFilters, FeedbackItem, Status } from "@/lib/types";

const INITIAL_LOAD_MS = 500;

export function FeedbackInbox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t, format } = useLocale();

  const [items, setItems] = useState<FeedbackItem[]>(initialFeedbackItems);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageSize, setPageSize] = useState(25);
  const returnFocusIdRef = useRef<string | null>(null);
  const appliedDefaultPlatform = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), INITIAL_LOAD_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const settings = loadSettings();
    setPageSize(settings.pageSize);

    if (appliedDefaultPlatform.current) return;
    if (searchParams.toString().length > 0) {
      appliedDefaultPlatform.current = true;
      return;
    }

    appliedDefaultPlatform.current = true;
    if (settings.defaultPlatform === "all") return;

    router.replace(`${pathname}?platform=${settings.defaultPlatform}`, {
      scroll: false,
    });
  }, [pathname, router, searchParams]);

  const filters = useMemo(
    () => parseFilters(searchParams),
    [searchParams],
  );

  const filteredItems = useMemo(
    () => filterFeedback(items, filters),
    [filters, items],
  );

  const visibleItems = useMemo(
    () => filteredItems.slice(0, pageSize),
    [filteredItems, pageSize],
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
      showToast(
        format(t.drawer.statusUpdated, { status: t.status[status] }),
      );
    },
    [format, showToast, t.drawer.statusUpdated, t.status],
  );

  const handleAssigneeChange = useCallback(
    (id: string, assignee: string | null) => {
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, assignee } : item,
        ),
      );
      showToast(
        assignee
          ? format(t.drawer.assignedTo, { name: assignee })
          : t.drawer.assigneeCleared,
      );
    },
    [format, showToast, t.drawer.assignedTo, t.drawer.assigneeCleared],
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
          {t.inbox.resultsHeading}
        </h2>
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface shadow-[var(--shadow-panel)]">
          {isLoading ? (
            <SkeletonTable />
          ) : filteredItems.length === 0 ? (
            <EmptyState
              title={t.inbox.emptyTitle}
              description={t.inbox.emptyDescription}
              actionLabel={t.inbox.clearFilters}
              onAction={clearFilters}
            />
          ) : (
            <FeedbackTable
              items={visibleItems}
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
