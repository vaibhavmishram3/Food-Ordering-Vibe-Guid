"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { 
  Star, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Plus, 
  Minus, 
  ChevronRight,
  Sparkles
} from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isVeg: boolean;
  imageUrl: string;
  available: boolean;
  restaurantId: string;
  restaurantName: string;
}

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  address: string;
  rating: number;
  cuisine: string;
  coverImage: string;
  deliveryTime: number;
  isPremium: boolean;
  menuItems: MenuItem[];
}

interface RestaurantClientProps {
  restaurant: Restaurant;
}

export default function RestaurantClient({ restaurant }: RestaurantClientProps) {
  const { cart, addToCart, updateQuantity } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Group menu items by category
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All");
    restaurant.menuItems.forEach((item) => cats.add(item.category));
    return Array.from(cats);
  }, [restaurant.menuItems]);

  const filteredMenuItems = useMemo(() => {
    if (activeCategory === "All") {
      return restaurant.menuItems;
    }
    return restaurant.menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, restaurant.menuItems]);

  // Helper to check if item is in cart and return quantity
  const getItemQuantity = (itemId: string) => {
    const cartItem = cart.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      restaurantId: item.restaurantId,
      restaurantName: item.restaurantName
    });
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Cover Banner */}
      <section style={{ 
        position: "relative",
        height: "320px", 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(15, 15, 20, 0.95)), url(${restaurant.coverImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "flex-end",
        paddingBottom: "40px",
        color: "white"
      }}>
        <div className="container-custom" style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            <span className="badge" style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", color: "white", backdropFilter: "blur(4px)" }}>
              {restaurant.cuisine.split(",")[0]}
            </span>
            {restaurant.isPremium && (
              <span className="badge badge-accent" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <ShieldCheck size={12} />
                Premium Curation
              </span>
            )}
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            {restaurant.name}
          </h1>
          
          <div style={{ 
            display: "flex", 
            gap: "24px", 
            fontSize: "0.95rem", 
            color: "rgba(255,255,255,0.8)",
            flexWrap: "wrap",
            marginTop: "8px"
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Star size={16} fill="var(--accent)" color="var(--accent)" />
              <strong style={{ color: "white" }}>{restaurant.rating}</strong> (100+ ratings)
            </span>
            <span>•</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Clock size={16} /> {restaurant.deliveryTime} mins delivery
            </span>
            <span>•</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <MapPin size={16} /> {restaurant.address}
            </span>
          </div>
        </div>
      </section>

      {/* Menu and Categories Section */}
      <section style={{ padding: "48px 0" }}>
        <div className="container-custom menu-layout-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr", 
          gap: "40px",
          alignItems: "start"
        }}>
          {/* Left Category Selection Navigation */}
          <div className="glass-card sticky-sidebar" style={{ 
            padding: "20px", 
            borderRadius: "20px", 
            display: "flex", 
            flexDirection: "column",
            gap: "6px",
            position: "sticky",
            top: "100px",
            zIndex: 10
          }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", padding: "0 12px 10px", borderBottom: "1px solid var(--border)", display: "block" }}>
              Menu Categories
            </span>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    border: "none",
                    background: isActive ? "rgba(255, 87, 34, 0.1)" : "transparent",
                    color: isActive ? "var(--primary)" : "var(--text-muted)",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    textAlign: "left",
                    fontWeight: isActive ? 700 : 500,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s ease"
                  }}
                  className="cat-btn-hover"
                >
                  <span>{cat}</span>
                  {isActive && <ChevronRight size={16} />}
                </button>
              );
            })}
          </div>

          {/* Right Menu List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
              <h2 style={{ fontSize: "1.5rem" }}>{activeCategory} Dishes</h2>
              <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{filteredMenuItems.length} item{filteredMenuItems.length !== 1 && "s"}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {filteredMenuItems.map((item) => {
                const quantity = getItemQuantity(item.id);
                return (
                  <div 
                    key={item.id} 
                    className="glass-card menu-item-card" 
                    style={{ 
                      padding: "24px", 
                      borderRadius: "20px", 
                      display: "flex", 
                      gap: "24px",
                      border: "1px solid var(--border)",
                      background: "var(--card)"
                    }}
                  >
                    {/* Item Text Details */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ 
                          width: "12px", 
                          height: "12px", 
                          border: item.isVeg ? "2px solid #38B000" : "2px solid #E63946", 
                          display: "inline-block", 
                          borderRadius: "2px", 
                          padding: "2px"
                        }}>
                          <span style={{ 
                            width: "100%", 
                            height: "100%", 
                            background: item.isVeg ? "#38B000" : "#E63946", 
                            display: "block", 
                            borderRadius: "50%" 
                          }} />
                        </span>
                        {item.price >= 400 && (
                          <span className="badge badge-accent" style={{ display: "flex", alignItems: "center", gap: "2px", padding: "2px 8px", fontSize: "0.75rem" }}>
                            <Sparkles size={10} /> Signature
                          </span>
                        )}
                      </div>
                      
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginTop: "4px" }}>{item.name}</h3>
                      <span style={{ fontWeight: 800, color: "var(--text-main)", fontSize: "1.1rem" }}>₹{item.price}</span>
                      
                      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.4", marginTop: "6px" }}>
                        {item.description}
                      </p>
                    </div>

                    {/* Item Image and Button Container */}
                    <div style={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: "center", 
                      gap: "12px",
                      position: "relative",
                      flexShrink: 0
                    }}>
                      <div style={{ width: "120px", height: "120px", borderRadius: "16px", overflow: "hidden", backgroundColor: "#222", position: "relative" }}>
                        <Image 
                          src={item.imageUrl} 
                          alt={item.name} 
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="120px"
                          loading="lazy"
                          priority={false}
                        />
                      </div>

                      {/* Add / Qty Control button */}
                      <div style={{ 
                        position: "absolute", 
                        bottom: "-15px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
                      }}>
                        {quantity === 0 ? (
                          <button 
                            onClick={() => handleAddToCart(item)}
                            className="btn btn-primary" 
                            style={{ 
                              padding: "8px 24px", 
                              borderRadius: "10px", 
                              fontWeight: 700, 
                              fontSize: "0.9rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px"
                            }}
                          >
                            <Plus size={14} />
                            <span>ADD</span>
                          </button>
                        ) : (
                          <div style={{ 
                            display: "flex", 
                            alignItems: "center", 
                            gap: "12px",
                            backgroundColor: "var(--primary)",
                            color: "white",
                            borderRadius: "10px",
                            padding: "6px 12px",
                            fontWeight: 700,
                            fontSize: "0.95rem"
                          }}>
                            <button 
                              onClick={() => updateQuantity(item.id, quantity - 1)}
                              style={{ border: "none", background: "transparent", color: "white", cursor: "pointer", display: "flex", padding: 0 }}
                            >
                              <Minus size={16} />
                            </button>
                            <span style={{ minWidth: "16px", textAlign: "center" }}>{quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, quantity + 1)}
                              style={{ border: "none", background: "transparent", color: "white", cursor: "pointer", display: "flex", padding: 0 }}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .cat-btn-hover:hover {
          color: var(--primary) !important;
          background: rgba(255, 87, 34, 0.05) !important;
        }
        .menu-layout-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 992px) {
          .menu-layout-grid {
            grid-template-columns: 0.8fr 2.2fr !important;
          }
        }
        @media (max-width: 576px) {
          .menu-item-card {
            flex-direction: column-reverse !important;
            gap: 16px !important;
          }
          .menu-item-card div:last-child {
            width: 100% !important;
            align-items: center !important;
          }
          .menu-item-card div:last-child div:first-child {
            width: 100% !important;
            height: 160px !important;
          }
        }
      `}} />
    </div>
  );
}
