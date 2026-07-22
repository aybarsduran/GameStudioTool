import { Suspense } from "react";
import { FeedbackInbox } from "@/components/feedback-inbox";
import { PageHeader } from "@/components/page-header";

function InboxFallback() {
  return (
    <div className="border-b border-border bg-surface px-5 py-8 md:px-8">
      <p className="text-sm text-muted">Loading inbox…</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex flex-1 flex-col outline-none"
    >
      <PageHeader
        eyebrow="LiveOps"
        title="Feedback Inbox"
        description="Triage playtest reports, bugs, and build notes in one dense desk."
      />

      <Suspense fallback={<InboxFallback />}>
        <FeedbackInbox />
      </Suspense>
    </main>
  );
}
