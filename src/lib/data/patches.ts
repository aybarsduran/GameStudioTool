export type PatchNote = {
  id: string;
  version: string;
  title: string;
  publishedAt: string;
  highlights: string[];
  status: "published" | "draft";
};

export const patchNotes: PatchNote[] = [
  {
    id: "patch-0911",
    version: "0.9.11",
    title: "Balance pass & store stability",
    publishedAt: "2026-07-18T09:30:00.000Z",
    status: "published",
    highlights: [
      "Shield regen clarified in patch notes (+8%, was mislabeled).",
      "iOS IAP resume flicker reduced on cold start.",
      "Title-screen particle idle cost lowered on Android.",
    ],
  },
  {
    id: "patch-0912-preview",
    version: "0.9.12",
    title: "Playtest candidate notes (draft)",
    publishedAt: "2026-07-21T08:00:00.000Z",
    status: "draft",
    highlights: [
      "Tutorial skip path no longer soft-locks the hangar objective.",
      "Zipline + inventory crash under investigation in rc2.",
      "Co-op spectator desync still open — tracking in LiveOps inbox.",
    ],
  },
  {
    id: "patch-0910",
    version: "0.9.10",
    title: "Combat feel & localization",
    publishedAt: "2026-07-11T17:00:00.000Z",
    status: "published",
    highlights: [
      "Parry timing window widened by 2 frames.",
      "German loadout labels no longer truncate on Epic rarity.",
      "Daily login offline sync race addressed.",
    ],
  },
];
