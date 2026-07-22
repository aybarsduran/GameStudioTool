import Link from "next/link";
import { feedbackItems } from "@/lib/data/feedback";
import {
  formatAge,
  platformLabels,
  statusLabels,
} from "@/lib/filters";

/**
 * Intentionally weak baseline UI for the portfolio before/after case.
 * Same data as the polished inbox — worse hierarchy, spacing, and a11y.
 */
export default function BeforeView() {
  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        background: "#f3f3f3",
        color: "#333",
        minHeight: "100vh",
        padding: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "8px",
          fontSize: "12px",
        }}
      >
        <span style={{ fontWeight: 700 }}>GST</span>
        <span>inbox</span>
        <span>builds</span>
        <span>notes</span>
        <Link href="/" style={{ marginLeft: "auto", color: "#06c" }}>
          view polished →
        </Link>
      </div>

      <h1 style={{ fontSize: "16px", margin: "0 0 6px" }}>feedback</h1>
      <p style={{ fontSize: "12px", color: "#999", margin: "0 0 10px" }}>
        all reports mixed together. filters kinda work later maybe.
      </p>

      <div
        style={{
          display: "flex",
          gap: "4px",
          marginBottom: "8px",
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="search"
          style={{
            border: "1px solid #ccc",
            padding: "2px 4px",
            fontSize: "11px",
            width: "120px",
          }}
          disabled
          aria-label="Broken search baseline"
        />
        <button type="button" style={{ fontSize: "11px", padding: "2px 6px" }}>
          new
        </button>
        <button type="button" style={{ fontSize: "11px", padding: "2px 6px" }}>
          high
        </button>
        <button type="button" style={{ fontSize: "11px", padding: "2px 6px" }}>
          pc
        </button>
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          padding: "4px",
        }}
      >
        {feedbackItems.map((item) => (
          <div
            key={item.id}
            style={{
              borderBottom: "1px solid #eee",
              padding: "4px 2px",
              fontSize: "11px",
              lineHeight: 1.2,
              display: "grid",
              gridTemplateColumns: "10px 1fr 70px 50px",
              gap: "4px",
              alignItems: "start",
            }}
          >
            <span
              title={item.severity}
              style={{
                width: "8px",
                height: "8px",
                marginTop: "2px",
                borderRadius: "50%",
                background:
                  item.severity === "critical"
                    ? "red"
                    : item.severity === "high"
                      ? "orange"
                      : item.severity === "medium"
                        ? "gold"
                        : "gray",
              }}
            />
            <div>
              <div style={{ color: "#666" }}>{item.title.en}</div>
              <div style={{ color: "#bbb", marginTop: "2px" }}>
                {item.reporter} · {statusLabels[item.status]} ·{" "}
                {platformLabels[item.platform]}
              </div>
            </div>
            <div style={{ color: "#aaa" }}>{item.build}</div>
            <div style={{ color: "#ccc", textAlign: "right" }}>
              {formatAge(item.createdAt)}
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: "10px", color: "#bbb", marginTop: "10px" }}>
        Baseline screen for case study — cramped type, color-only severity, weak
        hierarchy, disabled filters, no focus management.
      </p>
    </div>
  );
}
