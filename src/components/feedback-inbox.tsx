"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterBar } from "@/components/filter-bar";
import { FeedbackTable } from "@/components/feedback-table";
import { feedbackItems } from "@/lib/data/feedback";
import {
  filterFeedback,
  filtersToSearchParams,
  parseFilters,
} from "@/lib/filters";
import type { FeedbackFilters } from "@/lib/types";

export function FeedbackInbox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseFilters(searchParams),
    [searchParams],
  );

  const filteredItems = useMemo(
    () => filterFeedback(feedbackItems, filters),
    [filters],
  );

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

  return (
    <>
      <FilterBar
        filters={filters}
        resultCount={filteredItems.length}
        totalCount={feedbackItems.length}
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
            <FeedbackTable items={filteredItems} />
          )}
        </div>
      </section>
    </>
  );
}
