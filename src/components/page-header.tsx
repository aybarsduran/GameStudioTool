type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="border-b border-border bg-surface px-5 py-5 shadow-[var(--shadow-panel)] md:px-8">
      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted">
        {eyebrow}
      </p>
      <h1 className="mt-1 text-[var(--text-xl)] font-semibold tracking-tight">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        {description}
      </p>
    </header>
  );
}
