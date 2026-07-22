export const SEVERITIES = ["critical", "high", "medium", "low"] as const;
export const STATUSES = ["new", "triaged", "in_progress", "done"] as const;
export const PLATFORMS = ["pc", "ios", "android"] as const;

export type Severity = (typeof SEVERITIES)[number];
export type Status = (typeof STATUSES)[number];
export type Platform = (typeof PLATFORMS)[number];

export type LocalizedText = {
  en: string;
  tr: string;
};

export type FeedbackItem = {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
  stepsToReproduce: LocalizedText[];
  severity: Severity;
  status: Status;
  platform: Platform;
  build: string;
  reporter: string;
  assignee: string | null;
  createdAt: string;
};

export type FeedbackFilters = {
  q: string;
  status: Status[];
  severity: Severity[];
  platform: Platform | "all";
};
