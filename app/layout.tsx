import type { Metadata } from "next";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Event påmelding",
  description: "En enkel påmeldingsløsning med personvern og sikkerhet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const styles: Record<string, React.CSSProperties> = {
    html: { height: "100%" },
    body: {
      minHeight: "100%",
      margin: 0,
      background: "#f6f7fb",
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
      color: "#111",
    },
    header: {
      position: "sticky",
      top: 0,
      background: "rgba(246, 247, 251, 0.9)",
      backdropFilter: "blur(6px)",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
    },
    headerInner: {
      maxWidth: 980,
      margin: "0 auto",
      padding: "14px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    brand: {
      fontWeight: 800,
      letterSpacing: 0.2,
    },
    adminBtn: {
      fontSize: 13,
      padding: "8px 12px",
      borderRadius: 999,
      border: "1px solid rgba(0,0,0,0.12)",
      background: "white",
      textDecoration: "none",
      color: "#111",
      fontWeight: 700,
    },
    main: {
      maxWidth: 980,
      margin: "0 auto",
      padding: "24px",
    },
  };

  return (
    <html lang="no" style={styles.html}>
      <body style={styles.body}>
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div style={styles.brand}>Event påmelding</div>
            <Link href="/admin" style={styles.adminBtn}>
              Admin
            </Link>
          </div>
        </header>

        <main style={styles.main}>{children}</main>
      </body>
    </html>
  );
}
