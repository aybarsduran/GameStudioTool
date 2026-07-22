import { PageHeader } from "@/components/page-header";

export default function SettingsPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex flex-1 flex-col outline-none"
    >
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Studio preferences and notification defaults for the LiveOps desk."
      />

      <section className="flex flex-1 flex-col px-5 py-5 md:px-8">
        <div className="rounded-[var(--radius-md)] border border-dashed border-border-strong bg-surface px-6 py-14 text-center shadow-[var(--shadow-panel)]">
          <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-accent">
            Coming soon
          </p>
          <h2 className="mt-3 text-lg font-semibold tracking-tight">
            Workspace settings are stubbed
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            This route exists so navigation feels like a full product. Inbox,
            builds, and patch notes carry the portfolio polish story.
          </p>
        </div>
      </section>
    </main>
  );
}
