import {
  PLATFORMS,
  SEVERITIES,
  STATUSES,
  type FeedbackFilters,
  type FeedbackItem,
  type Platform,
  type Severity,
  type Status,
} from "@/lib/types";

export const severityLabels: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const statusLabels: Record<Status, string> = {
  new: "New",
  triaged: "Triaged",
  in_progress: "In progress",
  done: "Done",
};

export const platformLabels: Record<Platform, string> = {
  pc: "PC",
  ios: "iOS",
  android: "Android",
};

function parseList<T extends string>(
  value: string | null,
  allowed: readonly T[],
): T[] {
  if (!value) return [];
  const allowedSet = new Set<string>(allowed);
  return value
    .split(",")
    .map((part) => part.trim())
    .filter((part): part is T => allowedSet.has(part));
}

export function parseFilters(
  params: URLSearchParams | { get(name: string): string | null },
): FeedbackFilters {
  const platformRaw = params.get("platform");
  const platform =
    platformRaw && (PLATFORMS as readonly string[]).includes(platformRaw)
      ? (platformRaw as Platform)
      : "all";

  return {
    q: params.get("q")?.trim() ?? "",
    status: parseList(params.get("status"), STATUSES),
    severity: parseList(params.get("severity"), SEVERITIES),
    platform,
  };
}

export function filtersToSearchParams(filters: FeedbackFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.status.length > 0) params.set("status", filters.status.join(","));
  if (filters.severity.length > 0) {
    params.set("severity", filters.severity.join(","));
  }
  if (filters.platform !== "all") params.set("platform", filters.platform);

  return params;
}

export function filterFeedback(
  items: FeedbackItem[],
  filters: FeedbackFilters,
): FeedbackItem[] {
  const query = filters.q.toLowerCase();

  return items.filter((item) => {
    if (filters.status.length > 0 && !filters.status.includes(item.status)) {
      return false;
    }
    if (
      filters.severity.length > 0 &&
      !filters.severity.includes(item.severity)
    ) {
      return false;
    }
    if (filters.platform !== "all" && item.platform !== filters.platform) {
      return false;
    }
    if (!query) return true;

    const haystack = `${item.title} ${item.body}`.toLowerCase();
    return haystack.includes(query);
  });
}

export function formatAge(isoDate: string, now = Date.now()): string {
  const diffMs = Math.max(0, now - new Date(isoDate).getTime());
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export function toggleInList<T extends string>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}
