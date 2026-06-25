"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User, LogOut, Utensils, MapPin, Phone, Mail, Star } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ 
          background: "var(--gradient-appetizer)", 
          padding: "24px", 
          borderRadius: "50%", 
          color: "white", 
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <User size={48} />
        </div>
        <h2>Sign In to View Your Profile</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "400px", marginTop: "12px", marginBottom: "28px" }}>
          Create an account or sign in to view your profile and order history.
        </p>
        <Link href="/signin" className="btn btn-primary btn-lg" style={{ textDecoration: "none", borderRadius: "12px" }}>
          <span>Sign In</span>
          <Utensils size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, padding: "40px 0" }}>
      <div className="container-custom">
        <h1 style={{ marginBottom: "32px", display: "flex", alignItems: "center", gap: "10px" }}>
          <User size={32} className="text-gradient" />
          My Profile
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
                {session.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "4px" }}>{session.user?.name || "User"}</h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{session.user?.email}</p>
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
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Email</p>
                  <p style={{ fontSize: "1rem", color: "var(--text-main)" }}>{session.user?.email}</p>
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
              <button 
                onClick={() => signOut()}
                className="btn btn-secondary" 
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
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
