import type { Platform } from "@/lib/types";

export const SETTINGS_STORAGE_KEY = "gst-settings";

export type WorkspaceSettings = {
  studioName: string;
  defaultPlatform: Platform | "all";
  timezone: string;
  notifyCritical: boolean;
  notifyAssignee: boolean;
  quietHours: boolean;
  defaultAssignee: string;
  pageSize: 10 | 25 | 50;
};

export const DEFAULT_SETTINGS: WorkspaceSettings = {
  studioName: "Northwind Interactive",
  defaultPlatform: "all",
  timezone: "Europe/Istanbul",
  notifyCritical: true,
  notifyAssignee: true,
  quietHours: false,
  defaultAssignee: "",
  pageSize: 25,
};

export const TIMEZONES = [
  "Europe/Istanbul",
  "Europe/Oslo",
  "Europe/Amsterdam",
  "UTC",
] as const;

export function loadSettings(): WorkspaceSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;

  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<WorkspaceSettings>;
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: WorkspaceSettings) {
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}
