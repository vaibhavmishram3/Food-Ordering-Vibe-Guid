"use client";

import React from "react";
import Link from "next/link";
import { Utensils } from "lucide-react";

export default function SignInPage() {
  return (
    <div style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 20px",
      background: "radial-gradient(circle at center, rgba(255, 87, 34, 0.03), transparent 60%)"
    }}>
      <div className="glass-card" style={{
        width: "100%",
        maxWidth: "520px",
        padding: "40px 32px",
        borderRadius: "24px",
        border: "1px solid var(--border)",
        boxShadow: "0 15px 35px rgba(0,0,0,0.12)"
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center" }}>
          <div style={{
            background: "var(--gradient-appetizer)",
            padding: "14px",
            borderRadius: "16px",
            color: "white",
            display: "inline-flex"
          }}>
            <Utensils size={28} />
          </div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800 }}>FoodVibe is now auth-free</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "460px" }}>
            You can explore restaurants, add items to the cart, and checkout without signing in. The signin/signup flow is removed for a faster ordering experience.
          </p>
        </div>

        <div style={{ marginTop: "32px", display: "grid", gap: "18px" }}>
          <Link href="/explore" className="btn btn-primary btn-lg" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            Explore Restaurants
          </Link>
          <Link href="/cart" className="btn btn-secondary btn-lg" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--text-main)" }}>
            View Cart
          </Link>
          <Link href="/" className="btn btn-tertiary btn-lg" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--text-main)" }}>
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
