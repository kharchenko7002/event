import type { Metadata } from "next";
import React from "react";

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
    html: {
      height: "100%",
    },
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
    badge: {
      fontSize: 12,
      padding: "4px 8px",
      borderRadius: 999,
      border: "1px solid rgba(0,0,0,0.12)",
      background: "white",
    },
    main: {
      maxWidth: 980,
      margin: "0 auto",
      padding: "24px",
    },
    footer: {
      maxWidth: 980,
      margin: "0 auto",
      padding: "24px",
      color: "#666",
      fontSize: 13,
    },
  };

  return (
    <html lang="no" style={styles.html}>
      <body style={styles.body}>
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div style={styles.brand}>Event påmelding</div>
            <div style={styles.badge}>Dataminimering: navn + e-post</div>
          </div>
        </header>

        <main style={styles.main}>{children}</main>

        <footer style={styles.footer}>
          Demo-løsning for innlevering: personvern og sikkerhet bygges inn trinnvis.
        </footer>
      </body>
    </html>
  );
}
