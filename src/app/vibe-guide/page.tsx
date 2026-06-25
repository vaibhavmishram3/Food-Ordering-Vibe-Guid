import { prisma } from "@/lib/prisma";
import { mockRestaurants } from "@/lib/mockData";
import VibeGuideClient from "./VibeGuideClient";

export const dynamic = "force-dynamic";

export default async function VibeGuidePage({
  searchParams,
}: {
  searchParams: Promise<{ vibe?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const initialVibe = resolvedSearchParams.vibe || "spicy";

  // Fetch all restaurants and their menu items
  let restaurants;
  try {
    restaurants = await prisma.restaurant.findMany({
      include: {
        menuItems: true,
      },
    });
  } catch {
    restaurants = mockRestaurants;
  }

  // Prepare a serialized data package for the client component
  const data = restaurants.map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    address: r.address,
    rating: r.rating,
    coverImage: r.coverImage,
    cuisine: r.cuisine,
    deliveryTime: r.deliveryTime,
    isPremium: r.isPremium,
    menuItems: r.menuItems.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      isVeg: item.isVeg,
      imageUrl: item.imageUrl,
      available: item.available,
      restaurantId: r.id,
      restaurantName: r.name,
    })),
  }));

  return <VibeGuideClient restaurants={data} initialVibe={initialVibe} />;
}
