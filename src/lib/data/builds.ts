export type BuildStatus = "live" | "candidate" | "internal" | "retired";

export type BuildItem = {
  id: string;
  version: string;
  platform: "pc" | "ios" | "android" | "multi";
  status: BuildStatus;
  channel: string;
  commit: string;
  releasedAt: string;
  notes: string;
};

export const builds: BuildItem[] = [
  {
    id: "build-0912-rc2",
    version: "0.9.12-rc2",
    platform: "multi",
    status: "candidate",
    channel: "playtest",
    commit: "a8f3c21",
    releasedAt: "2026-07-21T07:30:00.000Z",
    notes: "Zipline inventory crash fix + DualSense rumble investigation build.",
  },
  {
    id: "build-0912-rc1",
    version: "0.9.12-rc1",
    platform: "multi",
    status: "internal",
    channel: "qa",
    commit: "44be901",
    releasedAt: "2026-07-20T12:00:00.000Z",
    notes: "First RC for LiveOps week. Known: Android audio ducking.",
  },
  {
    id: "build-0911",
    version: "0.9.11",
    platform: "multi",
    status: "live",
    channel: "production",
    commit: "9c12dde",
    releasedAt: "2026-07-18T09:15:00.000Z",
    notes: "Current live store build. Patch notes published.",
  },
  {
    id: "build-0910",
    version: "0.9.10",
    platform: "pc",
    status: "retired",
    channel: "production",
    commit: "e1b7704",
    releasedAt: "2026-07-11T16:40:00.000Z",
    notes: "Retired after 0.9.11 rollout. Kept for regression diffs.",
  },
  {
    id: "build-0909-ios",
    version: "0.9.9",
    platform: "ios",
    status: "retired",
    channel: "production",
    commit: "71af0aa",
    releasedAt: "2026-07-04T10:05:00.000Z",
    notes: "iOS-only hotfix for store resume flicker (superseded).",
  },
];

export const buildStatusLabels: Record<BuildStatus, string> = {
  live: "Live",
  candidate: "Candidate",
  internal: "Internal",
  retired: "Retired",
};
