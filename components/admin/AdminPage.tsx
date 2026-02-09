"use client";

import React, { useEffect, useState } from "react";
import type { Registration } from "./types";
import { styles } from "./styles";
import AdminTable from "./AdminTable";

export default function AdminPage() {
  const [items, setItems] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  async function load() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/registrations");
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError("Kunne ikke laste data.");
        setItems([]);
        return;
      }

      setItems(Array.isArray(data?.items) ? data.items : []);
    } catch {
      setError("Kunne ikke laste data (nettverk/server).");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={styles.card}>
      <h1 style={styles.title}>Admin – Registreringer</h1>
      <p style={styles.subtitle}>
        Viser registreringer med <b>maskert e-post</b> (personvern).
      </p>

      {loading && <p style={styles.small}>Laster...</p>}
      {error && <div style={styles.err}>{error}</div>}

      {!loading && !error && <AdminTable items={items} />}
    </div>
  );
}
