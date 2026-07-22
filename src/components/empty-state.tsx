type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center px-6 py-16 text-center"
      role="status"
    >
      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-accent">
        No results
      </p>
      <h2 className="mt-3 text-base font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
        {description}
      </p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-[var(--radius-sm)] border border-border bg-surface-muted px-3 py-2 text-sm font-medium text-foreground hover:bg-background"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
