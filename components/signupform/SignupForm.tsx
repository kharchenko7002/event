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

  function onChange<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (status.type !== "idle") setStatus({ type: "idle" });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const err = validate(values);
    if (err) {
      setStatus({ type: "error", message: err });
      return;
    }

    setStatus({ type: "success", message: "Takk! Påmeldingen er mottatt (demo)." });
    setValues({ name: "", email: "" });
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
          <button style={styles.button} type="submit">
            Meld på
          </button>
        </form>

        <StatusMessage status={status} />

        <p style={styles.note}>
          Neste steg: lagre påmelding strukturert, admin-side (vise/søke/redigere/slette),
          maskering, logging og tilgangskontroll.
        </p>
      </div>
    </div>
  );
}
