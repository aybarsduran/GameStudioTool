import { Suspense } from "react";
import { FeedbackInbox } from "@/components/feedback-inbox";

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
      <header className="border-b border-border bg-surface px-5 py-5 shadow-[var(--shadow-panel)] md:px-8">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted">
          LiveOps
        </p>
        <h1 className="mt-1 text-[var(--text-xl)] font-semibold tracking-tight">
          Feedback Inbox
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Triage playtest reports, bugs, and build notes in one dense desk.
        </p>
      </header>

      <Suspense fallback={<InboxFallback />}>
        <FeedbackInbox />
      </Suspense>
    </main>
  );
}
