import type { Metadata } from "next";
import BeforeView from "./before-view";

export const metadata: Metadata = {
  title: "Before baseline — Game Studio Tool",
  description:
    "Intentionally weak feedback inbox used as the before state in the LiveOps Desk polish case study.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BeforePage() {
  return <BeforeView />;
}
