import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ 
      padding: "40px 0", 
      backgroundColor: "var(--background)", 
      borderTop: "1px solid var(--border)", 
      marginTop: "auto",
      fontSize: "0.9rem",
      color: "var(--text-muted)"
    }}>
      <div className="container-custom footer-container" style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "24px",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-display)" }}>
            Food<span className="text-gradient">Vibe</span>
          </span>
          <p style={{ marginTop: "8px" }}>© 2026 FoodVibe Guide. All rights reserved.</p>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          <Link href="/privacy" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Terms of Service</Link>
          <Link href="/contact" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Contact Us</Link>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (min-width: 768px) {
            .footer-container { flex-direction: row !important; }
          }
        `}} />
      </div>
    </footer>
  );
}
