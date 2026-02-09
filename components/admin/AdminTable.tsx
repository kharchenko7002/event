import React from "react";
import type { Registration } from "./types";
import { styles } from "./styles";
import { maskEmail } from "./utils";

export default function AdminTable({
  items,
  onDelete,
  deletingId,
  onEdit,
}: {
  items: Registration[];
  onDelete: (id: string, name: string) => void;
  deletingId: string | null;
  onEdit: (item: Registration) => void;
}) {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Navn</th>
          <th style={styles.th}>E-post (maskert)</th>
          <th style={styles.th}>Opprettet</th>
          <th style={styles.th}>Handling</th>
        </tr>
      </thead>

      <tbody>
        {items.map((x) => {
          const isDeleting = deletingId === x.id;

          return (
            <tr key={x.id}>
              <td style={styles.td}>{x.name}</td>
              <td style={styles.td}>{maskEmail(x.email)}</td>
              <td style={styles.td}>{new Date(x.created_at).toLocaleString()}</td>
              <td style={styles.td}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    onClick={() => onEdit(x)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 10,
                      border: "1px solid rgba(0,0,0,0.12)",
                      background: "white",
                      color: "#111",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    Rediger
                  </button>

                  <button
                    onClick={() => onDelete(x.id, x.name)}
                    disabled={isDeleting}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 10,
                      border: "1px solid rgba(0,0,0,0.12)",
                      background: "#ffecec",
                      color: "#8a1f1f",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: isDeleting ? "not-allowed" : "pointer",
                      opacity: isDeleting ? 0.7 : 1,
                    }}
                  >
                    {isDeleting ? "Sletter..." : "Slett"}
                  </button>
                </div>
              </td>
            </tr>
          );
        })}

        {items.length === 0 && (
          <tr>
            <td style={styles.td} colSpan={4}>
              Ingen registreringer ennå.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
