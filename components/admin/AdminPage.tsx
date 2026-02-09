"use client";

import React, { useEffect, useState } from "react";
import type { Registration } from "./types";
import { styles } from "./styles";
import AdminTable from "./AdminTable";
import SearchBar from "./SearchBar";

export default function AdminPage() {
  const [items, setItems] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [query, setQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  async function handleDelete(id: string, name: string) {
    const ok = window.confirm(`Slette registrering for "${name}"?`);
    if (!ok) return;

    setDeletingId(id);
    setError("");

    try {
      const res = await fetch(`/api/registrations?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(typeof data?.error === "string" ? data.error : "Kunne ikke slette.");
        return;
      }

      await load(); // перезагрузить список после удаления
    } catch {
      setError("Kunne ikke slette (nettverk/server).");
    } finally {
      setDeletingId(null);
    }
  }

  const filteredItems = items.filter((x) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return x.name.toLowerCase().includes(q) || x.email.toLowerCase().includes(q);
  });

  return (
    <div style={styles.card}>
      <h1 style={styles.title}>Admin – Registreringer</h1>
      <p style={styles.subtitle}>
        Viser registreringer med <b>maskert e-post</b> (personvern).
      </p>

      <SearchBar value={query} onChange={setQuery} />

      {loading && <p style={styles.small}>Laster...</p>}
      {error && <div style={styles.err}>{error}</div>}

      {!loading && !error && (
        <AdminTable
          items={filteredItems}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      )}
    </div>
  );
}
