"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  Utensils, 
  ShoppingBag, 
  Star, 
  Clock, 
  Plus, 
  Check, 
  AlertCircle
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
  coverImage: string;
  cuisine: string;
  deliveryTime: number;
  isPremium: boolean;
  menuItems: MenuItem[];
}

interface VibeGuideClientProps {
  restaurants: Restaurant[];
  initialVibe: string;
}

export default function VibeGuideClient({ restaurants, initialVibe }: VibeGuideClientProps) {
  const [selectedVibe, setSelectedVibe] = useState<string>(initialVibe);
  const { addToCart, cart } = useCart();
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const vibes = [
    {
      id: "spicy",
      name: "Spicy & Bold",
      description: "Intense heat, rich spices, and fiery plates that kickstart your senses.",
      icon: <Flame size={28} />,
      color: "#FF5722",
      bgGradient: "linear-gradient(135deg, rgba(255, 87, 34, 0.15) 0%, rgba(255, 87, 34, 0.02) 100%)",
      badgeClass: "badge-spicy",
    },
    {
      id: "healthy",
      name: "Fresh & Clean",
      description: "Organic ingredients, protein bowls, and nutrient-rich, high-energy choices.",
      icon: <ShieldCheck size={28} />,
      color: "#38B000",
      bgGradient: "linear-gradient(135deg, rgba(56, 176, 0, 0.15) 0%, rgba(56, 176, 0, 0.02) 100%)",
      badgeClass: "badge-accent",
    },
    {
      id: "premium",
      name: "Premium Indulgence",
      description: "Chef specials, artisanal dishes, and exquisite fine-dining experiences.",
      icon: <Sparkles size={28} />,
      color: "#E9C46A",
      bgGradient: "linear-gradient(135deg, rgba(233, 196, 106, 0.15) 0%, rgba(233, 196, 106, 0.02) 100%)",
      badgeClass: "badge-accent",
    },
    {
      id: "comfort",
      name: "Comfort Classic",
      description: "Satisfying carbs, cheese-laden bites, and ultimate feel-good local standards.",
      icon: <Utensils size={28} />,
      color: "#457B9D",
      bgGradient: "linear-gradient(135deg, rgba(69, 123, 157, 0.15) 0%, rgba(69, 123, 157, 0.02) 100%)",
      badgeClass: "badge-accent",
    },
    {
      id: "sweet",
      name: "Sweet Escape",
      description: "Decadent desserts, ice cream, and sugary rewards to end your day.",
      icon: <ShoppingBag size={28} />,
      color: "#F4A261",
      bgGradient: "linear-gradient(135deg, rgba(244, 162, 97, 0.15) 0%, rgba(244, 162, 97, 0.02) 100%)",
      badgeClass: "badge-accent",
    },
  ];

  const currentVibeConfig = useMemo(() => {
    return vibes.find((v) => v.id === selectedVibe) || vibes[0];
  }, [selectedVibe]);

  // Curation filtering logic based on selected vibe
  const curatedResults = useMemo(() => {
    const list: { restaurant: Restaurant; items: MenuItem[] }[] = [];

    restaurants.forEach((restaurant) => {
      let matchedItems: MenuItem[] = [];

      switch (selectedVibe) {
        case "spicy":
          const spicyKeywords = [
            "spicy", "tandoori", "tikka", "arrabbiata", "kung pao", "mapo", "chili", 
            "burrito", "tacos", "curry", "fiery", "rogan josh", "jalapeno", "masala"
          ];
          matchedItems = restaurant.menuItems.filter((item) =>
            spicyKeywords.some(
              (kw) =>
                item.name.toLowerCase().includes(kw) ||
                item.description.toLowerCase().includes(kw)
            )
          );
          break;

        case "healthy":
          const healthyKeywords = [
            "bowl", "salad", "wrap", "organic", "green juice", "chia", "fruit", 
            "quinoa", "edamame", "kale", "vegan", "falafel", "green", "acai", "beetroot"
          ];
          matchedItems = restaurant.menuItems.filter((item) =>
            healthyKeywords.some(
              (kw) =>
                item.name.toLowerCase().includes(kw) ||
                item.description.toLowerCase().includes(kw)
            )
          );
          break;

        case "premium":
          // Include items from premium restaurants that are specialties (Mains/Starters over certain prices)
          // or contain premium keywords
          const premiumKeywords = [
            "nigiri", "parmigiana", "salmon", "gourmet", "artisanal", "fine-dining", 
            "carbonara", "lasagna", "chef", "premium", "truffle", "pancetta", "pecorino", "rogan josh"
          ];
          if (restaurant.isPremium) {
            matchedItems = restaurant.menuItems.filter(
              (item) => item.price >= 300 || premiumKeywords.some((kw) => item.name.toLowerCase().includes(kw))
            );
          } else {
            matchedItems = restaurant.menuItems.filter((item) =>
              premiumKeywords.some((kw) => item.name.toLowerCase().includes(kw))
            );
          }
          break;

        case "comfort":
          const comfortKeywords = [
            "burger", "fries", "rings", "pizza", "nachos", "quesadilla", "spring rolls", 
            "dim sum", "naan", "dal makhani", "smash", "katsu", "shawarma", "loaded", "noodles"
          ];
          matchedItems = restaurant.menuItems.filter((item) =>
            comfortKeywords.some(
              (kw) =>
                item.name.toLowerCase().includes(kw) ||
                item.description.toLowerCase().includes(kw)
            )
          );
          break;

        case "sweet":
          matchedItems = restaurant.menuItems.filter(
            (item) =>
              item.category === "Dessert" ||
              ["tiramisu", "pudding", "jamun", "sundae", "churros", "baklava", "knafeh", "mochi"].some(
                (kw) => item.name.toLowerCase().includes(kw)
              )
          );
          break;
      }

      if (matchedItems.length > 0) {
        list.push({
          restaurant,
          items: matchedItems.slice(0, 3), // display top 3 signature items
        });
      }
    });

    return list;
  }, [selectedVibe, restaurants]);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      restaurantId: item.restaurantId,
      restaurantName: item.restaurantName,
    });

    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <div style={{ flex: 1, padding: "40px 0" }}>
      <div className="container-custom">
        {/* Header Block */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="badge badge-accent animate-float" style={{ marginBottom: "12px" }}>
            <Sparkles size={12} style={{ marginRight: "4px" }} />
            Match Your Mood
          </span>
          <h1 style={{ fontSize: "2.5rem" }}>What's Your Vibe Today?</h1>
          <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "12px auto 0" }}>
            Choose a culinary vibe and let our system showcase matching restaurants and curated dishes for the perfect meal.
          </p>
        </div>

        {/* Vibe Grid Selector */}
        <div className="vibe-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "16px",
          marginBottom: "48px"
        }}>
          {vibes.map((v) => {
            const isSelected = selectedVibe === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedVibe(v.id)}
                style={{ 
                  border: isSelected ? `2px solid ${v.color}` : "1px solid var(--border)",
                  borderRadius: "20px",
                  padding: "24px",
                  background: isSelected ? v.bgGradient : "var(--card)",
                  color: "var(--text-main)",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  transition: "all 0.3s ease",
                  boxShadow: isSelected ? `0 8px 24px rgba(0,0,0,0.15)` : "none"
                }}
                className="vibe-btn-hover"
              >
                <div style={{ 
                  color: v.color, 
                  background: isSelected ? "var(--card)" : "rgba(255,255,255,0.05)",
                  padding: "12px",
                  borderRadius: "16px",
                  width: "fit-content",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isSelected ? "0 4px 10px rgba(0,0,0,0.1)" : "none"
                }}>
                  {v.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-main)" }}>{v.name}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px", lineHeight: "1.3" }}>
                    {v.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Vibe Showcase Info */}
        <div className="glass-card" style={{ 
          padding: "24px 32px", 
          borderRadius: "20px", 
          marginBottom: "40px",
          borderLeft: `6px solid ${currentVibeConfig.color}`
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ color: currentVibeConfig.color }}>{currentVibeConfig.icon}</span>
            <h2 style={{ fontSize: "1.5rem" }}>Curated recommendations for {currentVibeConfig.name}</h2>
          </div>
          <p style={{ color: "var(--text-muted)", marginTop: "8px", fontSize: "0.95rem" }}>
            We've found {curatedResults.length} kitchens in your area that specialize in matching your vibe.
          </p>
        </div>

        {/* Curation List */}
        {curatedResults.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {curatedResults.map(({ restaurant, items }) => (
              <div 
                key={restaurant.id} 
                className="glass-card" 
                style={{ 
                  borderRadius: "24px", 
                  overflow: "hidden", 
                  border: "1px solid var(--border)",
                  background: "linear-gradient(135deg, var(--card) 0%, rgba(20, 20, 25, 0.4) 100%)"
                }}
              >
                {/* Header Section of Restaurant */}
                <div style={{ 
                  display: "flex", 
                  flexDirection: "row", 
                  padding: "24px", 
                  borderBottom: "1px solid var(--border)",
                  gap: "20px"
                }} className="restaurant-header-flex">
                  <div style={{ width: "100px", height: "100px", borderRadius: "16px", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                    <Image 
                      src={restaurant.coverImage} 
                      alt={restaurant.name} 
                      fill 
                      style={{ objectFit: "cover" }} 
                      sizes="100px" 
                      loading="lazy"
                      priority={false}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <h3 style={{ fontSize: "1.5rem", fontWeight: 800 }}>{restaurant.name}</h3>
                      {restaurant.isPremium && (
                        <span className="badge badge-accent" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <ShieldCheck size={12} /> Premium
                        </span>
                      )}
                    </div>
                    <p style={{ color: "var(--text-muted)", marginTop: "6px", fontSize: "0.95rem" }}>{restaurant.cuisine}</p>
                    <div style={{ display: "flex", gap: "16px", color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "12px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Star size={16} fill="var(--accent)" color="var(--accent)" />
                        <strong style={{ color: "var(--text-main)" }}>{restaurant.rating}</strong>
                      </span>
                      <span>•</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={16} /> {restaurant.deliveryTime} mins
                      </span>
                      <span>•</span>
                      <span>{restaurant.address.split(",").slice(-2)[0]?.trim()}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Link href={`/restaurant/${restaurant.slug}`} className="btn btn-secondary btn-sm" style={{ textDecoration: "none" }}>
                      View Full Menu
                    </Link>
                  </div>
                </div>

                {/* Curry/Dishes List */}
                <div style={{ padding: "24px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Signature Vibe Matches:
                  </span>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                    {items.map((item) => {
                      const isAdded = addedItemIds[item.id];
                      return (
                        <div 
                          key={item.id} 
                          className="glass-card" 
                          style={{ 
                            padding: "16px", 
                            borderRadius: "16px", 
                            display: "flex", 
                            gap: "16px",
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border)"
                          }}
                        >
                          <div style={{ width: "80px", height: "80px", borderRadius: "12px", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                            <Image 
                              src={item.imageUrl} 
                              alt={item.name} 
                              fill 
                              style={{ objectFit: "cover" }} 
                              sizes="80px" 
                              loading="lazy"
                              priority={false}
                            />
                          </div>
                          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                              <h4 style={{ fontWeight: 700, fontSize: "0.95rem" }}>{item.name}</h4>
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
                            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px", flex: 1, lineClamp: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {item.description}
                            </p>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                              <span style={{ fontWeight: 700, color: "var(--primary)" }}>₹{item.price}</span>
                              <button 
                                onClick={() => handleAddToCart(item)}
                                className={`btn btn-sm ${isAdded ? "btn-secondary" : "btn-primary"}`}
                                style={{ 
                                  borderRadius: "8px", 
                                  padding: "6px 12px", 
                                  display: "flex", 
                                  alignItems: "center", 
                                  gap: "4px" 
                                }}
                              >
                                {isAdded ? (
                                  <>
                                    <Check size={14} />
                                    <span>Added</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus size={14} />
                                    <span>Add</span>
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
            ))}
          </div>
        ) : (
          <div className="glass-card" style={{ padding: "60px 20px", textAlign: "center", borderRadius: "20px" }}>
            <AlertCircle size={40} style={{ color: "var(--text-muted)", marginBottom: "16px" }} />
            <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>We couldn't find matching items in this category right now.</p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .vibe-btn-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
        }
        @media (max-width: 768px) {
          .restaurant-header-flex {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .restaurant-header-flex div {
            width: 100% !important;
          }
        }
      `}} />
    </div>
  );
}
