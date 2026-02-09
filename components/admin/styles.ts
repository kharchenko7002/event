import type React from "react";

export const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "white",
    borderRadius: 16,
    padding: 20,
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
  },
  title: { margin: 0, fontSize: 20, fontWeight: 800 },
  subtitle: { marginTop: 8, color: "#555", lineHeight: 1.4 },
  small: { fontSize: 12, color: "#666" },

  table: { width: "100%", borderCollapse: "collapse", marginTop: 16 },
  th: {
    textAlign: "left",
    padding: "10px 8px",
    fontSize: 13,
    color: "#666",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },
  td: {
    padding: "10px 8px",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    fontSize: 14,
  },

  err: {
    marginTop: 12,
    padding: 10,
    borderRadius: 10,
    background: "#ffecec",
    color: "#8a1f1f",
    border: "1px solid #ffd2d2",
  },
};