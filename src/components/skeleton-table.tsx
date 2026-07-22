export function SkeletonTable() {
  const rows = Array.from({ length: 8 }, (_, index) => index);

  return (
    <div
      className="overflow-hidden"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading feedback inbox"
    >
      <div className="border-b border-border bg-surface-muted px-4 py-3">
        <div className="h-3 w-40 animate-pulse rounded bg-border" />
      </div>
      <ul className="divide-y divide-border">
        {rows.map((row) => (
          <li key={row} className="grid grid-cols-12 gap-3 px-4 py-3">
            <div className="col-span-2 h-3 animate-pulse rounded bg-border/80" />
            <div className="col-span-4 h-3 animate-pulse rounded bg-border" />
            <div className="col-span-2 h-3 animate-pulse rounded bg-border/70" />
            <div className="col-span-2 h-3 animate-pulse rounded bg-border/80" />
            <div className="col-span-2 h-3 animate-pulse rounded bg-border/60" />
          </li>
        ))}
      </ul>
    </div>
  );
}
