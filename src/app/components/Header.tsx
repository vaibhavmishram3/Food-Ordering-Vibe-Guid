"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Utensils, ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Vibe Guide", href: "/vibe-guide" },
    { name: "Offers", href: "/offers" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <header style={{ 
      position: "sticky", 
      top: 0, 
      zIndex: 100, 
      backgroundColor: "rgba(18, 18, 22, 0.96)", 
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    }}>
      <div className="container-custom header-container" style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        height: "72px" 
      }}>
        {/* Brand Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "inherit" }}>
          <div style={{ 
            background: "var(--gradient-appetizer)", 
            padding: "8px", 
            borderRadius: "10px", 
            color: "white", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center" 
          }}>
            <Utensils size={20} />
          </div>
          <span style={{ 
            fontSize: "1.35rem", 
            fontWeight: 800, 
            fontFamily: "var(--font-display)", 
            letterSpacing: "-0.03em" 
          }}>
            Food<span className="text-gradient">Vibe</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: "none", gap: "32px", fontSize: "0.95rem", fontWeight: 500 }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                style={{ 
                  color: isActive ? "var(--primary)" : "var(--text-muted)", 
                  textDecoration: "none",
                  transition: "color 0.2s ease"
                }}
                className="nav-link-hover"
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Buttons: Auth and Cart */}
        <div style={{ display: "none", alignItems: "center", gap: "16px" }} className="desktop-buttons">
            <Link href="/cart" className="btn btn-primary btn-sm" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <ShoppingBag size={16} />
            <span>Cart ({cartCount})</span>
          </Link>
        </div>

        {/* Mobile Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="mobile-controls">
          <Link href="/cart" className="btn btn-primary btn-sm" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <ShoppingBag size={16} />
            <span>{cartCount}</span>
          </Link>
          <button 
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            style={{ background: "transparent", border: "none", color: "var(--text-main)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "999px" }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: isMobileMenuOpen ? "rgba(0, 0, 0, 0.45)" : "transparent",
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
          transition: "opacity 0.2s ease",
          zIndex: 98
        }}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          width: "min(86vw, 320px)",
          maxHeight: "calc(100vh - 32px)",
          height: "fit-content",
          background: "#14141b",
          boxShadow: "var(--shadow-lg)",
          transform: isMobileMenuOpen ? "translateX(0)" : "translateX(108%)",
          transition: "transform 0.25s ease",
          zIndex: 99,
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
          overflow: "hidden"
        }}
        className="mobile-menu"
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main)" }}>Menu</span>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            style={{ background: "transparent", border: "none", color: "var(--text-main)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "999px" }}
          >
            <X size={20} />
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ 
                  color: isActive ? "var(--primary)" : "var(--text-main)", 
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  padding: "12px 14px",
                  borderRadius: "12px",
                  background: isActive ? "rgb(34, 17, 12)" : "transparent"
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Media queries injection */}
      <style dangerouslySetInnerHTML={{ __html: `
          .header-container { height: 72px !important; }
          .mobile-menu { background: #14141b !important; }
          
          @media (min-width: 768px) {
            .header-container { height: 80px !important; }
            .desktop-nav { display: flex !important; }
            .desktop-buttons { display: flex !important; }
            .mobile-controls { display: none !important; }
          }
          
          .nav-link-hover:hover {
            color: var(--primary) !important;
          }
        `}} />
    </header>
  );
}
