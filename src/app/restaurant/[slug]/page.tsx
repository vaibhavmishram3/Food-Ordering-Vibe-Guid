import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { mockRestaurants } from "@/lib/mockData";
import RestaurantClient from "./RestaurantClient";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { slug } = await params;

  let restaurant;
  try {
    // Fetch the restaurant and its menu items
    restaurant = await prisma.restaurant.findUnique({
      where: { slug },
      include: {
        menuItems: true,
      },
    });
  } catch {
    // Fallback to mock data
    restaurant = mockRestaurants.find(r => r.slug === slug);
  }

  if (!restaurant) {
    notFound();
  }

  // Serialize the data for the client component
  const serializedRestaurant = {
    id: restaurant.id,
    name: restaurant.name,
    slug: restaurant.slug,
    address: restaurant.address,
    rating: restaurant.rating,
    cuisine: restaurant.cuisine,
    coverImage: restaurant.coverImage,
    deliveryTime: restaurant.deliveryTime,
    isPremium: restaurant.isPremium,
    menuItems: restaurant.menuItems.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      isVeg: item.isVeg,
      imageUrl: item.imageUrl,
      available: item.available,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    })),
  };

  return <RestaurantClient restaurant={serializedRestaurant} />;
}
