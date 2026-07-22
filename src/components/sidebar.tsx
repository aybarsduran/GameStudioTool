"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "LiveOps", description: "Feedback inbox" },
  { href: "/builds", label: "Builds", description: "Release candidates" },
  { href: "/patches", label: "Patch Notes", description: "Live updates" },
  { href: "/settings", label: "Settings", description: "Workspace prefs" },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex w-full flex-col border-b border-border bg-surface md:h-screen md:w-[var(--sidebar-width)] md:shrink-0 md:border-b-0 md:border-r"
      aria-label="Primary"
    >
      <div className="border-b border-border px-5 py-5">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
          Game Studio Tool
        </p>
        <p className="mt-1 text-lg font-semibold tracking-tight text-foreground">
          LiveOps Desk
        </p>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-3 py-3 md:flex-1 md:flex-col md:overflow-visible md:px-3 md:py-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={[
                "min-w-[9.5rem] rounded-[var(--radius-md)] px-3 py-2.5 transition-colors md:min-w-0",
                isActive
                  ? "bg-accent-soft text-accent-ink"
                  : "text-foreground hover:bg-surface-muted",
              ].join(" ")}
            >
              <span className="block text-sm font-semibold">{item.label}</span>
              <span
                className={[
                  "mt-0.5 hidden text-xs md:block",
                  isActive ? "text-accent-ink/80" : "text-muted",
                ].join(" ")}
              >
                {item.description}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="hidden border-t border-border px-5 py-4 md:block">
        <p className="text-xs text-muted">Studio workspace</p>
        <p className="mt-1 font-mono text-xs text-foreground">v0.1.0-stubs</p>
      </div>
    </aside>
  );
}
