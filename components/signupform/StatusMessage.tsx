import React from "react";
import type { FormStatus } from "./types";
import { styles } from "./styles";

export default function StatusMessage({ status }: { status: FormStatus }) {
  if (status.type === "idle") return null;

  if (status.type === "error") {
    return <div style={styles.msgError}>{status.message}</div>;
  }

  return <div style={styles.msgSuccess}>{status.message}</div>;
}
