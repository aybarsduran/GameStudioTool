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
          Table and filters arrive in the next step.
        </p>
      </header>

      <section className="flex flex-1 flex-col px-5 py-6 md:px-8">
        <div className="flex flex-1 flex-col items-start justify-center rounded-[var(--radius-md)] border border-dashed border-border-strong bg-surface px-6 py-16">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-accent">
            Step 1 shell
          </p>
          <h2 className="mt-3 text-lg font-semibold tracking-tight">
            Inbox canvas ready
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
            Sidebar, tokens, and page chrome are in place. Next step adds mock
            feedback rows and URL-driven filters.
          </p>
        </div>
      </section>
    </main>
  );
}
