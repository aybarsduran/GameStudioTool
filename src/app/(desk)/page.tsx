"use client";

import { Suspense } from "react";
import { FeedbackInbox } from "@/components/feedback-inbox";
import { PageHeader } from "@/components/page-header";
import { useLocale } from "@/lib/i18n/provider";

function InboxFallback() {
  const { t } = useLocale();
  return (
    <div className="border-b border-border bg-surface px-5 py-8 md:px-8">
      <p className="text-sm text-muted">{t.inbox.loading}</p>
    </div>
  );
}

export default function HomePage() {
  const { t } = useLocale();

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex flex-1 flex-col outline-none"
    >
      <PageHeader
        eyebrow={t.inbox.eyebrow}
        title={t.inbox.title}
        description={t.inbox.description}
      />

      <Suspense fallback={<InboxFallback />}>
        <FeedbackInbox />
      </Suspense>
    </main>
  );
}
