"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { Utensils, ShoppingBag, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Vibe Guide", href: "/vibe-guide" },
    { name: "Offers", href: "/offers" },
  ];

  return (
    <header style={{ 
      position: "sticky", 
      top: 0, 
      zIndex: 100, 
      backgroundColor: "var(--glass-bg)", 
      backdropFilter: "var(--glass-blur)",
      WebkitBackdropFilter: "var(--glass-blur)",
      borderBottom: "1px solid var(--border)"
    }}>
      <div className="container-custom, header-container" style={{ 
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
          {session && (
            <Link 
              href="/profile" 
              style={{ 
                color: pathname === "/profile" ? "var(--primary)" : "var(--text-muted)", 
                textDecoration: "none",
                transition: "color 0.2s ease"
              }}
              className="nav-link-hover"
            >
              Profile
            </Link>
          )}
        </nav>

        {/* Desktop Buttons: Auth and Cart */}
        <div style={{ display: "none", alignItems: "center", gap: "16px" }} className="desktop-buttons">
          {session ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "0.9rem", color: "var(--text-main)" }}>
                {session.user?.name || session.user?.email}
              </span>
              <button 
                onClick={() => signOut()}
                className="btn btn-secondary btn-sm" 
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <Link href="/signin" className="btn btn-secondary btn-sm" style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
              <User size={16} />
              <span>Sign In</span>
            </Link>
          )}
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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ background: "transparent", border: "none", color: "var(--text-main)", cursor: "pointer" }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            style={{ 
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
              zIndex: 98
            }} 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Menu */}
          <div style={{ 
            position: "fixed",
            top: "72px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "var(--glass-blur)",
            WebkitBackdropFilter: "var(--glass-blur)",
            padding: "32px 24px",
            zIndex: 99
          }} className="mobile-menu">
            <nav style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    padding: "8px 0"
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
            {session && (
              <Link 
                key="profile" 
                href="/profile" 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ 
                  color: pathname === "/profile" ? "var(--primary)" : "var(--text-main)", 
                  textDecoration: "none",
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  padding: "8px 0"
                }}
              >
                Profile
              </Link>
            )}
          </nav>

            <div style={{ marginTop: "48px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {session ? (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <span style={{ fontSize: "1.1rem", color: "var(--text-main)", fontWeight: 600 }}>
                      {session.user?.name || session.user?.email}
                    </span>
                    <button 
                      onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                      className="btn btn-secondary" 
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "1rem", padding: "14px 24px" }}
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              ) : (
                <Link 
                  href="/signin" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn btn-primary" 
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none", fontSize: "1rem", padding: "14px 24px" }}
                >
                  <User size={18} />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </>
      )}

      {/* Media queries injection */}
      <style dangerouslySetInnerHTML={{ __html: `
          .header-container { height: 72px !important; }
          .mobile-menu { background-color: rgba(255, 255, 255, 0.3) !important; }
          
          @media (min-width: 768px) {
            .header-container { height: 80px !important; }
            .desktop-nav { display: flex !important; }
            .desktop-buttons { display: flex !important; }
            .mobile-controls { display: none !important; }
          }
          
          @media (prefers-color-scheme: dark) {
            .mobile-menu { background-color: rgba(18, 18, 22, 0.3) !important; }
          }
          
          .nav-link-hover:hover {
            color: var(--primary) !important;
          }
        `}} />
    </header>
  );
}
