import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import RestaurantClient from "./RestaurantClient";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { slug } = await params;

  // Fetch the restaurant and its menu items
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    include: {
      menuItems: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  // Serialize the database data for the client component
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
