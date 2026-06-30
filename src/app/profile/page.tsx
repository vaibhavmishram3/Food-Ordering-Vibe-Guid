"use client";

import React from "react";
import Link from "next/link";
import { User, Utensils, MapPin, Mail, Star } from "lucide-react";

export default function ProfilePage() {

  return (
    <div style={{ flex: 1, padding: "40px 0" }}>
      <div className="container-custom">
        <h1 style={{ marginBottom: "32px", display: "flex", alignItems: "center", gap: "10px" }}>
          <User size={32} className="text-gradient" />
          Profile
        </h1>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr", 
          gap: "32px",
          alignItems: "start"
        }} className="profile-layout-grid">
          
          {/* Left Column: Profile Info */}
          <div className="glass-card" style={{ padding: "32px", borderRadius: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid var(--border)" }}>
              <div style={{ 
                background: "var(--gradient-appetizer)", 
                padding: "24px", 
                borderRadius: "50%", 
                color: "white", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                fontWeight: 800
              }}>
                G
              </div>
              <div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "4px" }}>Guest User</h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>No sign-in required</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ 
                  backgroundColor: "rgba(255,87,34,0.1)", 
                  color: "var(--primary)", 
                  padding: "10px", 
                  borderRadius: "10px", 
                  display: "flex" 
                }}>
                  <Mail size={20} />
                </div>
                <div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Status</p>
                  <p style={{ fontSize: "1rem", color: "var(--text-main)" }}>Browsing anonymously</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ 
                  backgroundColor: "rgba(255,87,34,0.1)", 
                  color: "var(--primary)", 
                  padding: "10px", 
                  borderRadius: "10px", 
                  display: "flex" 
                }}>
                  <Star size={20} />
                </div>
                <div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Member Since</p>
                  <p style={{ fontSize: "1rem", color: "var(--text-main)" }}>June 2025</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "32px" }}>
              <Link 
                href="/explore"
                className="btn btn-primary"
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none" }}
              >
                <span>Explore Food</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Quick Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <Link href="/explore" className="glass-card card-hover-effect" style={{ padding: "24px", borderRadius: "20px", textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ 
                  background: "var(--gradient-appetizer)", 
                  padding: "14px", 
                  borderRadius: "16px", 
                  color: "white", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Utensils size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "4px", color: "var(--text-main)" }}>Explore Restaurants</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Find your next favorite meal</p>
                </div>
              </div>
            </Link>

            <Link href="/cart" className="glass-card card-hover-effect" style={{ padding: "24px", borderRadius: "20px", textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ 
                  background: "var(--gradient-appetizer)", 
                  padding: "14px", 
                  borderRadius: "16px", 
                  color: "white", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "4px", color: "var(--text-main)" }}>View Cart</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Check your current order</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .profile-layout-grid {
          grid-template-columns: 1fr;
        }
        .card-hover-effect {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover-effect:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        }
        @media (min-width: 992px) {
          .profile-layout-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
        }
      `}} />
    </div>
  );
}
