import React from "react";
import { styles } from "./styles";
import type { FormValues } from "./types";

export default function FormFields({
  values,
  onChange,
}: {
  values: FormValues;
  onChange: <K extends keyof FormValues>(key: K, value: FormValues[K]) => void;
}) {
  return (
    <>
      <div style={styles.row}>
        <label style={styles.label} htmlFor="name">
          Navn
        </label>
        <input
          id="name"
          style={styles.input}
          value={values.name}
          onChange={(e) => onChange("name", e.target.value)}
          autoComplete="name"
          placeholder="Ola Nordmann"
        />
      </div>

      <div style={styles.row}>
        <label style={styles.label} htmlFor="email">
          E-post
        </label>
        <input
          id="email"
          style={styles.input}
          value={values.email}
          onChange={(e) => onChange("email", e.target.value)}
          autoComplete="email"
          placeholder="ola@example.com"
        />
      </div>
    </>
  );
}
