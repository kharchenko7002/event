"use client";

import React, { useState } from "react";
import type { Registration } from "./types";

export default function EditForm({
  item,
  onCancel,
  onSave,
  saving,
}: {
  item: Registration;
  onCancel: () => void;
  onSave: (payload: { id: string; name: string; email: string }) => Promise<void>;
  saving: boolean;
}) {
  const [name, setName] = useState(item.name);
  const [email, setEmail] = useState(item.email);
  const [error, setError] = useState("");

  function validateLocal(n: string, e: string): string | null {
    if (n.trim().length < 2) return "Skriv inn navn (minst 2 tegn).";
    const em = e.trim().toLowerCase();
    if (!em.includes("@") || em.length < 5) return "Skriv inn en gyldig e-post.";
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const err = validateLocal(name, email);
    if (err) {
      setError(err);
      return;
    }

    await onSave({ id: item.id, name, email });
  }

  return (
    <div
      style={{
        marginTop: 14,
        padding: 14,
        borderRadius: 14,
        border: "1px solid rgba(0,0,0,0.10)",
        background: "#fff",
      }}
    >
      <div style={{ fontWeight: 800, marginBottom: 10 }}>Rediger registrering</div>

      <form onSubmit={submit}>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>
            Navn
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #ddd",
              outline: "none",
              fontSize: 14,
            }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>
            E-post
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #ddd",
              outline: "none",
              fontSize: 14,
            }}
          />
        </div>

        {error && (
          <div
            style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 10,
              background: "#ffecec",
              color: "#8a1f1f",
              border: "1px solid #ffd2d2",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "#111",
              color: "white",
              fontWeight: 800,
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? "Lagrer..." : "Lagre"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "white",
              color: "#111",
              fontWeight: 800,
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.7 : 1,
            }}
          >
            Avbryt
          </button>
        </div>
      </form>
    </div>
  );
}
