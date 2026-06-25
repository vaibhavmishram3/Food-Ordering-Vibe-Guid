"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Flame, 
  Sparkles, 
  Clock, 
  MapPin, 
  ArrowRight,
  ChevronRight,
  Star,
  ShieldCheck
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      router.push(`/explore?search=${encodeURIComponent(location.trim())}`);
    } else {
      router.push("/explore");
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Hero Section */}
      <section style={{ 
        position: "relative",
        padding: "80px 0 100px", 
        background: "radial-gradient(circle at top right, rgba(255, 87, 34, 0.05), transparent 40%)",
        overflow: "hidden"
      }}>
        <div className="container-custom hero-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr", 
          gap: "48px", 
          alignItems: "center"
        }}>
          <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "inline-flex" }}>
              <span className="badge badge-accent animate-float" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Sparkles size={12} />
                <span>Premium Vibe-Based Curation</span>
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1 }}>
              Order Food That Matches Your <span className="text-gradient">Vibe</span>
            </h1>
            <p style={{ fontSize: "1.15rem", color: "var(--text-muted)", maxWidth: "540px" }}>
              Craving something fresh, spicy, or premium? Our intelligent guide matches your current mood with curated culinary experiences in your neighborhood.
            </p>

            {/* Address search box */}
            <form onSubmit={handleSearch} className="glass-card search-box" style={{ 
              display: "flex", 
              flexDirection: "column",
              padding: "8px", 
              gap: "8px",
              borderRadius: "16px",
              marginTop: "16px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px" }}>
                <MapPin className="text-gradient" size={20} />
                <input 
                  type="text" 
                  placeholder="Enter your delivery location..." 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="form-input" 
                  style={{ border: "none", background: "transparent", padding: 0, boxShadow: "none", width: "100%", outline: "none", color: "var(--text-main)" }}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", borderRadius: "12px" }}>
                <span>Find Food</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            position: "relative"
          }} className="hero-image-container">
            {/* Visual Glassmorphic Showcase */}
            <Link href="/restaurant/tandoor-royale" style={{ textDecoration: "none", color: "inherit", width: "100%", maxWidth: "420px" }}>
              <div className="glass-card animate-float card-hover-effect" style={{ 
                padding: "24px",
                borderRadius: "24px",
                border: "1px solid var(--border)",
                background: "linear-gradient(135deg, var(--card) 0%, rgba(20, 20, 25, 0.4) 100%)",
                cursor: "pointer"
              }}>
                <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", height: "240px", backgroundColor: "#333", display: "flex", alignItems: "center", justifyContent: "center" }} className="card-gradient">
                  <div style={{ color: "white", fontSize: "1.2rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", zIndex: 1 }}>
                    <Flame size={24} color="#FF5722" />
                    <span>Trending Gourmet Kitchen</span>
                  </div>
                </div>

                <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "1.4rem" }}>Tandoor Royale</h3>
                    <span className="badge badge-spicy">Spicy</span>
                  </div>
                  <div style={{ display: "flex", gap: "16px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Star size={16} fill="var(--accent)" color="var(--accent)" />
                      <strong style={{ color: "var(--text-main)" }}>4.5</strong> (500+)
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={16} /> 30 mins
                    </span>
                  </div>
                  <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "8px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: "1.1rem" }} className="text-gradient">₹350 for two</span>
                    <span className="badge badge-accent" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <ShieldCheck size={14} /> Premium Choice
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .hero-grid {
              grid-template-columns: 1fr;
            }
            .search-box {
              flex-direction: column;
            }
            .card-hover-effect {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .card-hover-effect:hover {
              transform: translateY(-5px);
              box-shadow: 0 12px 30px rgba(0,0,0,0.15);
            }
            @media (min-width: 992px) {
              .hero-grid { grid-template-columns: 1.2fr 0.8fr !important; }
              .search-box { flex-direction: row !important; }
              .search-box button { width: auto !important; }
            }
          `}} />
        </div>
      </section>

      {/* Culinary Vibes Categories */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--card)" }}>
        <div className="container-custom">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
            <div>
              <span className="badge badge-accent" style={{ marginBottom: "12px" }}>Browse By Taste</span>
              <h2>Explore Culinary Vibes</h2>
            </div>
            <Link href="/explore" className="btn btn-secondary btn-sm" style={{ display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
              <span>View All</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid-responsive">
            {/* Vibe 1 */}
            <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ background: "rgba(255, 87, 34, 0.1)", color: "var(--primary)", padding: "16px", borderRadius: "16px", alignSelf: "flex-start" }}>
                <Flame size={32} />
              </div>
              <div>
                <h3 style={{ marginBottom: "8px" }}>Spicy & Bold</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                  Intense spices, robust curries, and peri-peri specialties to kickstart your senses.
                </p>
              </div>
              <Link href="/explore?vibe=spicy" style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 600, fontSize: "0.9rem", color: "var(--primary)", marginTop: "auto", textDecoration: "none" }}>
                <span>Explore Spicy</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Vibe 2 */}
            <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ background: "rgba(56, 176, 0, 0.1)", color: "var(--fresh)", padding: "16px", borderRadius: "16px", alignSelf: "flex-start" }}>
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 style={{ marginBottom: "8px" }}>Fresh & Healthy</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                  Nutritious salads, high-protein bowls, and organic vegan meals for high-energy vibes.
                </p>
              </div>
              <Link href="/explore?vibe=healthy" style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 600, fontSize: "0.9rem", color: "var(--fresh)", marginTop: "auto", textDecoration: "none" }}>
                <span>Explore Healthy</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Vibe 3 */}
            <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ background: "rgba(244, 162, 97, 0.2)", color: "var(--accent)", padding: "16px", borderRadius: "16px", alignSelf: "flex-start" }}>
                <Sparkles size={32} />
              </div>
              <div>
                <h3 style={{ marginBottom: "8px" }}>Premium Gourmet</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                  Artisanal pizzas, fine-dining takeaways, and exquisite chef creations.
                </p>
              </div>
              <Link href="/explore?vibe=premium" style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 600, fontSize: "0.9rem", color: "var(--accent)", marginTop: "auto", textDecoration: "none" }}>
                <span>Explore Premium</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Promo Area */}
      <section style={{ 
        padding: "80px 0", 
        background: "var(--gradient-dark)", 
        color: "var(--text-white)",
        borderTop: "1px solid var(--border)"
      }}>
        <div className="container-custom" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          <h2 style={{ color: "white", fontSize: "2.2rem" }}>Ready to Discover Your Next Food Vibe?</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "600px", fontSize: "1.1rem" }}>
            Create an account to save your favorite vibes, customize recommendations, and secure faster payments with Razorpay integration.
          </p>
          <div style={{ display: "flex", gap: "16px", marginTop: "12px", flexDirection: "column", width: "100%", maxWidth: "400px" }} className="promo-buttons">
            <Link href="/signin" className="btn btn-primary btn-lg" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
              Get Started
            </Link>
            <Link href="/explore" className="btn btn-secondary btn-lg" style={{ color: "var(--text-main)", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
              Browse Anonymously
            </Link>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `
            @media (min-width: 576px) {
              .promo-buttons { flex-direction: row !important; }
              .promo-buttons link, .promo-buttons a { flex: 1; }
            }
          `}} />
        </div>
      </section>
    </div>
  );
}
