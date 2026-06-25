"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { 
  Sparkles, 
  Tag, 
  Copy, 
  Check, 
  Percent, 
  Plus, 
  Utensils, 
  Clock 
} from "lucide-react";

interface PromoItem {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  imageUrl: string;
  isVeg: boolean;
  restaurantId: string;
  restaurantName: string;
}

interface OffersClientProps {
  promoItems: PromoItem[];
}

export default function OffersClient({ promoItems }: OffersClientProps) {
  const { addToCart } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const coupons = [
    {
      code: "VIBE50",
      discount: "50% OFF",
      condition: "Up to ₹150 | Minimum order ₹199",
      description: "Applies to all standard orders. Match your mood and save big today!",
      color: "var(--primary)"
    },
    {
      code: "FREEVIBE",
      discount: "FREE DELIVERY",
      condition: "On orders above ₹299",
      description: "Zero delivery fees on any restaurant. Order from your favorite spot.",
      color: "var(--fresh)"
    },
    {
      code: "PREMIUM100",
      discount: "FLAT ₹100 OFF",
      condition: "On premium restaurants | Minimum order ₹499",
      description: "Savor gourmet cuisines. Perfect for dinner dates and fine taste curation.",
      color: "var(--accent)"
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const handleAddToCart = (item: PromoItem) => {
    // Add item with its discounted price!
    addToCart({
      id: item.id,
      name: item.name,
      price: item.discountedPrice,
      imageUrl: item.imageUrl,
      restaurantId: item.restaurantId,
      restaurantName: item.restaurantName
    });

    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <div style={{ flex: 1, padding: "40px 0" }}>
      <div className="container-custom">
        {/* Header Block */}
        <div style={{ marginBottom: "40px" }}>
          <span className="badge badge-accent" style={{ marginBottom: "12px" }}>
            <Percent size={12} style={{ marginRight: "4px" }} />
            Special Offers
          </span>
          <h1>Exclusive Discounts & Deals</h1>
          <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
            Savor your favorite vibes with handpicked deals, seasonal vouchers, and menu price drops.
          </p>
        </div>

        {/* Coupons Grid Section */}
        <div style={{ marginBottom: "56px" }}>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Tag size={20} className="text-gradient" />
            Active Promo Codes
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "24px" 
          }}>
            {coupons.map((coupon) => (
              <div 
                key={coupon.code}
                className="glass-card" 
                style={{ 
                  borderRadius: "20px", 
                  padding: "24px", 
                  display: "flex", 
                  flexDirection: "column",
                  gap: "16px",
                  borderLeft: `6px solid ${coupon.color}`
                }}
              >
                <div>
                  <span style={{ fontSize: "1.5rem", fontWeight: 800, color: coupon.color }}>{coupon.discount}</span>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px", border: "1px dashed var(--border)", padding: "10px 14px", borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.15)" }}>
                    <code style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-main)", letterSpacing: "0.05em" }}>{coupon.code}</code>
                    <button 
                      onClick={() => handleCopyCode(coupon.code)}
                      style={{ 
                        border: "none", 
                        background: "transparent", 
                        cursor: "pointer", 
                        color: "var(--text-muted)",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                      className="copy-btn-hover"
                    >
                      {copiedCode === coupon.code ? (
                        <>
                          <Check size={16} style={{ color: "var(--fresh)" }} />
                          <span style={{ fontSize: "0.85rem", color: "var(--fresh)", fontWeight: 600 }}>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          <span style={{ fontSize: "0.85rem" }}>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-main)" }}>{coupon.condition}</span>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.4" }}>{coupon.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Items Grid Section */}
        <div>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={20} className="text-gradient" />
            Trending Deals - Flat 20% Off
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
            gap: "24px" 
          }}>
            {promoItems.map((item) => {
              const isAdded = addedItemIds[item.id];
              return (
                <div 
                  key={item.id} 
                  className="glass-card card-hover-effect"
                  style={{ 
                    borderRadius: "20px", 
                    overflow: "hidden", 
                    display: "flex", 
                    flexDirection: "column",
                    height: "100%"
                  }}
                >
                  <div style={{ position: "relative", height: "180px", backgroundColor: "#333" }}>
                    <Image 
                      src={item.imageUrl} 
                      alt={item.name} 
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      priority={false}
                    />
                    <span 
                      className="badge badge-accent" 
                      style={{ 
                        position: "absolute", 
                        top: "12px", 
                        right: "12px", 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "4px",
                        backgroundColor: "var(--primary)",
                        color: "white" 
                      }}
                    >
                      <Percent size={12} />
                      Save 20%
                    </span>
                  </div>

                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, gap: "12px" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                        <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>{item.name}</h3>
                        <span style={{ 
                          width: "10px", 
                          height: "10px", 
                          border: item.isVeg ? "2px solid #38B000" : "2px solid #E63946", 
                          display: "inline-block", 
                          borderRadius: "2px", 
                          padding: "2px",
                          flexShrink: 0
                        }}>
                          <span style={{ 
                            width: "100%", 
                            height: "100%", 
                            background: item.isVeg ? "#38B000" : "#E63946", 
                            display: "block", 
                            borderRadius: "50%" 
                          }} />
                        </span>
                      </div>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginTop: "4px" }}>
                        by {item.restaurantName}
                      </span>
                    </div>

                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", flex: 1, lineHeight: "1.4" }}>
                      {item.description}
                    </p>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "12px", marginTop: "8px" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                        <span style={{ fontWeight: 800, fontSize: "1.3rem", color: "var(--text-main)" }}>₹{item.discountedPrice}</span>
                        <span style={{ textDecoration: "line-through", fontSize: "0.9rem", color: "var(--text-muted)" }}>₹{item.originalPrice}</span>
                      </div>
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className={`btn btn-sm ${isAdded ? "btn-secondary" : "btn-primary"}`}
                        style={{ borderRadius: "8px", display: "flex", alignItems: "center", gap: "4px" }}
                      >
                        {isAdded ? (
                          <>
                            <Check size={14} />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus size={14} />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .copy-btn-hover:hover {
          color: var(--primary) !important;
        }
        .card-hover-effect {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        }
      `}} />
    </div>
  );
}
