import { prisma } from "@/lib/prisma";
import OffersClient from "./OffersClient";

export default async function OffersPage() {
  const restaurants = await prisma.restaurant.findMany({
    include: {
      menuItems: true,
    },
  });

  // Curate a set of promotional dishes (taking 1 from each restaurant)
  const promoItems = restaurants.flatMap((r) => 
    r.menuItems.slice(0, 1).map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      originalPrice: item.price,
      discountedPrice: Math.round(item.price * 0.8), // 20% off
      imageUrl: item.imageUrl,
      isVeg: item.isVeg,
      restaurantId: r.id,
      restaurantName: r.name,
    }))
  ).slice(0, 6); // Display up to 6 promo items

  return <OffersClient promoItems={promoItems} />;
}
