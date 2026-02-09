"use client";

import React, { useMemo, useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<{ type: "idle" | "error"; message?: string }>({
    type: "idle",
  });
  const [loading, setLoading] = useState(false);

  const styles = useMemo<Record<string, React.CSSProperties>>(
    () => ({
      wrap: { display: "flex", justifyContent: "center", paddingTop: 24 },
      card: {
        width: "100%",
        maxWidth: 520,
        background: "white",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.06)",
      },
      title: { margin: 0, fontSize: 22, fontWeight: 800 },
      subtitle: { marginTop: 8, marginBottom: 18, color: "#555", lineHeight: 1.4 },
      label: { display: "block", marginBottom: 6, fontWeight: 700 },
      input: {
        width: "100%",
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #ddd",
        outline: "none",
        fontSize: 15,
      },
      button: {
        width: "100%",
        padding: "10px 12px",
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        fontSize: 15,
        fontWeight: 800,
        background: "#111",
        color: "white",
        marginTop: 12,
        opacity: loading ? 0.7 : 1,
      },
      err: {
        marginTop: 12,
        padding: 10,
        borderRadius: 10,
        background: "#ffecec",
        color: "#8a1f1f",
        border: "1px solid #ffd2d2",
      },
      back: {
        display: "inline-block",
        marginTop: 12,
        textDecoration: "none",
        color: "#111",
        fontWeight: 700,
        fontSize: 13,
      },
    }),
    [loading]
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "idle" });

    if (password.trim().length < 1) {
      setStatus({ type: "error", message: "Skriv inn passord." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ type: "error", message: data?.error || "Feil" });
        return;
      }

      window.location.href = "/admin";
    } catch {
      setStatus({ type: "error", message: "Serverfeil. Prøv igjen." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <h1 style={styles.title}>Admin login</h1>
        <p style={styles.subtitle}>Tilgang krever passord (tilgangskontroll).</p>

        <form onSubmit={onSubmit}>
          <label style={styles.label} htmlFor="password">
            Passord
          </label>
          <input
            id="password"
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Logger inn..." : "Logg inn"}
          </button>
        </form>

        {status.type === "error" && <div style={styles.err}>{status.message}</div>}

        <a href="/" style={styles.back}>
          ← Tilbake til forsiden
        </a>
      </div>
    </div>
  );
}
