import React from "react";
import type { Registration } from "./types";
import { styles } from "./styles";
import { maskEmail } from "./utils";

export default function AdminTable({ items }: { items: Registration[] }) {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Navn</th>
          <th style={styles.th}>E-post (maskert)</th>
          <th style={styles.th}>Opprettet</th>
        </tr>
      </thead>
      <tbody>
        {items.map((x) => (
          <tr key={x.id}>
            <td style={styles.td}>{x.name}</td>
            <td style={styles.td}>{maskEmail(x.email)}</td>
            <td style={styles.td}>{new Date(x.created_at).toLocaleString()}</td>
          </tr>
        ))}

        {items.length === 0 && (
          <tr>
            <td style={styles.td} colSpan={3}>
              Ingen registreringer ennå.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
