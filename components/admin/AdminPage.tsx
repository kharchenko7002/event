"use client";

import React, { useEffect, useState } from "react";
import type { Registration } from "./types";
import { styles } from "./styles";
import AdminTable from "./AdminTable";
import SearchBar from "./SearchBar";
import Link from "next/link";
import EditForm from "./EditForm";

export default function AdminPage() {
  const [items, setItems] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [query, setQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [editing, setEditing] = useState<Registration | null>(null);
  const [saving, setSaving] = useState(false);

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

      // если удалили ту же запись, которую редактируем
      if (editing?.id === id) setEditing(null);

      await load();
    } catch {
      setError("Kunne ikke slette (nettverk/server).");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSave(payload: { id: string; name: string; email: string }) {
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/registrations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(typeof data?.error === "string" ? data.error : "Kunne ikke lagre.");
        return;
      }

      setEditing(null);
      await load();
    } catch {
      setError("Kunne ikke lagre (nettverk/server).");
    } finally {
      setSaving(false);
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

      <div style={{ marginTop: 12, marginBottom: 4 }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "8px 12px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "white",
            textDecoration: "none",
            color: "#111",
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          ← Tilbake
        </Link>
      </div>

      <SearchBar value={query} onChange={setQuery} />

      {editing && (
        <EditForm
          item={editing}
          saving={saving}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      )}

      {loading && <p style={styles.small}>Laster...</p>}
      {error && <div style={styles.err}>{error}</div>}

      {!loading && !error && (
        <AdminTable
          items={filteredItems}
          onDelete={handleDelete}
          deletingId={deletingId}
          onEdit={(item) => setEditing(item)}
        />
      )}
    </div>
  );
}
