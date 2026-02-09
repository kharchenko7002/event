import React from "react";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ marginTop: 12 }}>
      <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>
        Søk
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Søk på navn eller e-post..."
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
  );
}
