import { PageHeader } from "@/components/page-header";
import { buildStatusLabels, builds } from "@/lib/data/builds";

const platformLabels = {
  pc: "PC",
  ios: "iOS",
  android: "Android",
  multi: "Multi",
} as const;

export default function BuildsPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex flex-1 flex-col outline-none"
    >
      <PageHeader
        eyebrow="LiveOps"
        title="Builds"
        description="Recent release candidates and live binaries used by playtest triage."
      />

      <section className="flex flex-1 flex-col px-5 py-5 md:px-8">
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface shadow-[var(--shadow-panel)]">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <caption className="sr-only">Recent studio builds</caption>
              <thead className="border-b border-border bg-surface-muted text-xs uppercase tracking-[0.06em] text-muted">
                <tr>
                  <th scope="col" className="px-3 py-2.5 font-medium md:px-4">
                    Version
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium md:px-4">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium md:px-4">
                    Channel
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium md:px-4">
                    Platform
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium md:px-4">
                    Commit
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium md:px-4">
                    Released
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium md:px-4">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {builds.map((build) => (
                  <tr
                    key={build.id}
                    className="border-b border-border last:border-b-0"
                  >
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs font-medium md:px-4">
                      {build.version}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 md:px-4">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className={`status-dot status-dot--build-${build.status}`}
                          aria-hidden
                        />
                        {buildStatusLabels[build.status]}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 md:px-4">
                      {build.channel}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 md:px-4">
                      {platformLabels[build.platform]}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-muted md:px-4">
                      {build.commit}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-muted md:px-4">
                      <time dateTime={build.releasedAt}>
                        {new Date(build.releasedAt).toLocaleDateString()}
                      </time>
                    </td>
                    <td className="max-w-xs px-3 py-3 text-muted md:px-4">
                      <span className="line-clamp-2">{build.notes}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
