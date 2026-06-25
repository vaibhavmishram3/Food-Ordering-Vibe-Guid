import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { 
  Star, 
  Clock, 
  MapPin, 
  Flame, 
  ShieldCheck, 
  Sparkles,
  Search,
  Filter
} from "lucide-react";

interface ExplorePageProps {
  searchParams: Promise<{
    search?: string;
    vibe?: string;
    cuisine?: string;
  }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search || "";
  const vibe = resolvedSearchParams.vibe || "";
  const cuisine = resolvedSearchParams.cuisine || "";

  // Fetch all restaurants and menu items to do filtering
  const allRestaurants = await prisma.restaurant.findMany({
    include: {
      menuItems: true,
    },
  });

  // Apply filters
  const filteredRestaurants = allRestaurants.filter((restaurant) => {
    // 1. Search Query Filter
    if (search.trim()) {
      const query = search.toLowerCase();
      const matchesName = restaurant.name.toLowerCase().includes(query);
      const matchesCuisine = restaurant.cuisine.toLowerCase().includes(query);
      const matchesMenu = restaurant.menuItems.some(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
      if (!matchesName && !matchesCuisine && !matchesMenu) {
        return false;
      }
    }

    // 2. Cuisine Filter
    if (cuisine && cuisine.toLowerCase() !== "all") {
      const matchesCuisine = restaurant.cuisine.toLowerCase().includes(cuisine.toLowerCase());
      if (!matchesCuisine) {
        return false;
      }
    }

    // 3. Vibe Filter
    if (vibe && vibe.toLowerCase() !== "all") {
      const v = vibe.toLowerCase();
      if (v === "spicy") {
        // Tandoor Royale, El Sombrero Cantina, Dragon Palace
        const spicySlugs = ["tandoor-royale", "el-sombrero-cantina", "the-dragon-palace"];
        if (!spicySlugs.includes(restaurant.slug)) return false;
      } else if (v === "healthy") {
        // Green Roots Kitchen
        const healthySlugs = ["green-roots-kitchen"];
        if (!healthySlugs.includes(restaurant.slug)) return false;
      } else if (v === "premium") {
        if (!restaurant.isPremium) return false;
      }
    }

    return true;
  });

  // Available cuisine tags for filter pills
  const cuisinesList = [
    "All",
    "Italian",
    "Indian",
    "Chinese",
    "Fast Food",
    "Healthy",
    "Mexican",
    "Japanese",
    "Middle Eastern"
  ];

  // Helper function to build query strings
  const getFilterUrl = (params: { search?: string; vibe?: string; cuisine?: string }) => {
    const currentParams = { search, vibe, cuisine };
    const merged = { ...currentParams, ...params };
    const queryParts = [];
    if (merged.search) queryParts.push(`search=${encodeURIComponent(merged.search)}`);
    if (merged.vibe) queryParts.push(`vibe=${merged.vibe}`);
    if (merged.cuisine) queryParts.push(`cuisine=${merged.cuisine}`);
    return `/explore` + (queryParts.length > 0 ? `?${queryParts.join("&")}` : "");
  };

  return (
    <div style={{ flex: 1, padding: "40px 0" }}>
      <div className="container-custom">
        {/* Header Section */}
        <div style={{ marginBottom: "32px" }}>
          <span className="badge badge-accent" style={{ marginBottom: "12px" }}>
            <Filter size={12} style={{ marginRight: "4px" }} />
            Discover
          </span>
          <h1>Explore Restaurants</h1>
          <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
            {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 && "s"} matching your criteria
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="glass-card" style={{ padding: "24px", borderRadius: "20px", marginBottom: "40px" }}>
          {/* Search Box */}
          <form action="/explore" method="GET" style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
            <div style={{ 
              flex: 1, 
              display: "flex", 
              alignItems: "center", 
              gap: "12px", 
              border: "1px solid var(--border)", 
              borderRadius: "12px", 
              padding: "10px 16px",
              backgroundColor: "var(--background)"
            }}>
              <Search size={20} style={{ color: "var(--text-muted)" }} />
              <input 
                type="text" 
                name="search" 
                placeholder="Search restaurants, cuisines, or dishes..." 
                defaultValue={search}
                style={{ 
                  border: "none", 
                  background: "transparent", 
                  width: "100%", 
                  outline: "none", 
                  color: "var(--text-main)",
                  fontSize: "1rem"
                }}
              />
              {/* Keep other filter values in search submit */}
              {vibe && <input type="hidden" name="vibe" value={vibe} />}
              {cuisine && <input type="hidden" name="cuisine" value={cuisine} />}
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "12px" }}>
              Search
            </button>
          </form>

          {/* Vibe Selection Row */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>
              Filter by Vibe
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <Link 
                href={getFilterUrl({ vibe: "all" })}
                className={`btn btn-sm ${vibe === "" || vibe === "all" ? "btn-primary" : "btn-secondary"}`}
                style={{ borderRadius: "20px", textDecoration: "none" }}
              >
                All Vibes
              </Link>
              <Link 
                href={getFilterUrl({ vibe: "spicy" })}
                className={`btn btn-sm ${vibe === "spicy" ? "btn-primary" : "btn-secondary"}`}
                style={{ borderRadius: "20px", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <Flame size={14} />
                <span>Spicy & Bold</span>
              </Link>
              <Link 
                href={getFilterUrl({ vibe: "healthy" })}
                className={`btn btn-sm ${vibe === "healthy" ? "btn-primary" : "btn-secondary"}`}
                style={{ borderRadius: "20px", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <ShieldCheck size={14} />
                <span>Fresh & Healthy</span>
              </Link>
              <Link 
                href={getFilterUrl({ vibe: "premium" })}
                className={`btn btn-sm ${vibe === "premium" ? "btn-primary" : "btn-secondary"}`}
                style={{ borderRadius: "20px", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <Sparkles size={14} />
                <span>Premium Choice</span>
              </Link>
            </div>
          </div>

          {/* Cuisine Selection Row */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>
              Filter by Cuisine
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {cuisinesList.map((c) => {
                const isSelected = cuisine === c || (c === "All" && cuisine === "");
                return (
                  <Link
                    key={c}
                    href={getFilterUrl({ cuisine: c === "All" ? "all" : c })}
                    className={`btn btn-sm ${isSelected ? "btn-primary" : "btn-secondary"}`}
                    style={{ borderRadius: "20px", textDecoration: "none", fontSize: "0.85rem", padding: "6px 14px" }}
                  >
                    {c}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Restaurant Grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid-responsive" style={{ gap: "32px" }}>
            {filteredRestaurants.map((restaurant) => (
              <Link 
                href={`/restaurant/${restaurant.slug}`} 
                key={restaurant.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div 
                  className="glass-card card-hover-effect" 
                  style={{ 
                    borderRadius: "20px", 
                    overflow: "hidden", 
                    display: "flex", 
                    flexDirection: "column",
                    height: "100%",
                    cursor: "pointer"
                  }}
                >
                  {/* Cover Image */}
                  <div style={{ 
                    position: "relative", 
                    height: "200px", 
                    backgroundColor: "#333", 
                    overflow: "hidden" 
                  }}>
                    <Image 
                      src={restaurant.coverImage} 
                      alt={restaurant.name} 
                      fill
                      style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                      className="restaurant-img"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      priority={false}
                    />
                    
                    {restaurant.isPremium && (
                      <span 
                        className="badge badge-accent" 
                        style={{ position: "absolute", top: "12px", right: "12px", display: "flex", alignItems: "center", gap: "4px", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}
                      >
                        <ShieldCheck size={12} />
                        Premium
                      </span>
                    )}

                    {/* Vibe Overlays */}
                    {["tandoor-royale", "el-sombrero-cantina", "the-dragon-palace"].includes(restaurant.slug) && (
                      <span 
                        className="badge badge-spicy" 
                        style={{ position: "absolute", bottom: "12px", left: "12px", display: "flex", alignItems: "center", gap: "4px" }}
                      >
                        <Flame size={12} />
                        Spicy Vibe
                      </span>
                    )}
                    {restaurant.slug === "green-roots-kitchen" && (
                      <span 
                        className="badge" 
                        style={{ position: "absolute", bottom: "12px", left: "12px", display: "flex", alignItems: "center", gap: "4px", backgroundColor: "rgba(56, 176, 0, 0.9)", color: "white" }}
                      >
                        <ShieldCheck size={12} />
                        Healthy Vibe
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, gap: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{restaurant.name}</h3>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-main)", fontSize: "0.9rem" }}>
                        <Star size={16} fill="var(--accent)" color="var(--accent)" />
                        <strong>{restaurant.rating}</strong>
                      </span>
                    </div>

                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", flex: 1 }}>{restaurant.cuisine}</p>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "0.85rem", color: "var(--text-muted)", borderTop: "1px solid var(--border)", paddingTop: "12px", marginTop: "8px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={14} />
                        {restaurant.deliveryTime} mins
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <MapPin size={14} />
                        {restaurant.address.split(",").slice(-2)[0]?.trim() || "Local"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="glass-card" style={{ padding: "60px 20px", textAlign: "center", borderRadius: "20px" }}>
            <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>No restaurants match your filters.</p>
            <Link href="/explore" className="btn btn-primary" style={{ marginTop: "16px", borderRadius: "10px", display: "inline-flex", textDecoration: "none" }}>
              Clear Filters
            </Link>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .card-hover-effect {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        }
        .card-hover-effect:hover .restaurant-img {
          transform: scale(1.05);
        }
        .grid-responsive {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }
      `}} />
    </div>
  );
}
