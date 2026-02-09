"use client";

import React, { useState } from "react";
import { styles } from "./styles";
import type { FormStatus, FormValues } from "./types";
import { validate } from "./validate";
import StatusMessage from "./StatusMessage";
import FormFields from "./FormFields";

export default function SignupForm() {
  const [values, setValues] = useState<FormValues>({ name: "", email: "" });
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onChange<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (status.type !== "idle") setStatus({ type: "idle" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const err = validate(values);
    if (err) {
      setStatus({ type: "error", message: err });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: values.name, email: values.email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          typeof data?.error === "string"
            ? data.error
            : `Ukjent feil (status ${res.status})`;
        setStatus({ type: "error", message: msg });
        return;
      }

      setStatus({ type: "success", message: "Takk! Påmeldingen er lagret." });
      setValues({ name: "", email: "" });
    } catch {
      setStatus({ type: "error", message: "Serverfeil. Prøv igjen." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <h1 style={styles.title}>Event påmelding</h1>
        <p style={styles.subtitle}>
          Vi samler inn kun <b>navn</b> og <b>e-post</b> (dataminimering).
        </p>

        <form onSubmit={onSubmit}>
          <FormFields values={values} onChange={onChange} />

          <button
            style={{
              ...styles.button,
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Lagrer..." : "Meld på"}
          </button>
        </form>

        <StatusMessage status={status} />

        <p style={styles.note}>
          Data lagres nå i database (Neon Postgres) via API.
        </p>
      </div>
    </div>
  );
}
