export const mockRestaurants = [
  {
    id: "1",
    name: "La Bella Trattoria",
    slug: "la-bella-trattoria",
    address: "12 Connaught Place, New Delhi, 110001",
    rating: 4.7,
    cuisine: "Italian",
    coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    deliveryTime: 35,
    isPremium: true,
    menuItems: [
      {
        id: "1-1",
        name: "Bruschetta al Pomodoro",
        description: "Toasted sourdough topped with fresh tomatoes, garlic, and basil drizzle",
        price: 299,
        category: "Starter",
        isVeg: true,
        imageUrl: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400",
        available: true,
        restaurantId: "1",
        restaurantName: "La Bella Trattoria"
      },
      {
        id: "1-2",
        name: "Penne Arrabbiata",
        description: "Penne pasta in a fiery tomato and garlic sauce with fresh parsley",
        price: 449,
        category: "Main Course",
        isVeg: true,
        imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
        available: true,
        restaurantId: "1",
        restaurantName: "La Bella Trattoria"
      }
    ]
  },
  {
    id: "2",
    name: "Tandoor Royale",
    slug: "tandoor-royale",
    address: "45 Chandni Chowk Road, Paharganj, New Delhi, 110055",
    rating: 4.5,
    cuisine: "Indian, North Indian",
    coverImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
    deliveryTime: 30,
    isPremium: false,
    menuItems: [
      {
        id: "2-1",
        name: "Paneer Tikka",
        description: "Succulent cottage cheese cubes marinated in spiced yoghurt and grilled in tandoor",
        price: 349,
        category: "Starter",
        isVeg: true,
        imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=400",
        available: true,
        restaurantId: "2",
        restaurantName: "Tandoor Royale"
      },
      {
        id: "2-2",
        name: "Butter Chicken",
        description: "Tender chicken in a silky, mildly spiced tomato and butter gravy",
        price: 449,
        category: "Main Course",
        isVeg: false,
        imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
        available: true,
        restaurantId: "2",
        restaurantName: "Tandoor Royale"
      }
    ]
  },
  {
    id: "3",
    name: "The Dragon Palace",
    slug: "the-dragon-palace",
    address: "78 Tangra Main Road, Kolkata, West Bengal 700015",
    rating: 4.3,
    cuisine: "Chinese, Asian",
    coverImage: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800",
    deliveryTime: 40,
    isPremium: false,
    menuItems: [
      {
        id: "3-1",
        name: "Veg Spring Rolls",
        description: "Crispy rolls stuffed with seasoned cabbage, carrots, and glass noodles",
        price: 199,
        category: "Starter",
        isVeg: true,
        imageUrl: "https://images.unsplash.com/photo-1614631446501-abcf76949c1b?w=400",
        available: true,
        restaurantId: "3",
        restaurantName: "The Dragon Palace"
      }
    ]
  },
  {
    id: "4",
    name: "Green Roots Kitchen",
    slug: "green-roots-kitchen",
    address: "5 Koramangala 6th Block, Bengaluru, Karnataka 560095",
    rating: 4.6,
    cuisine: "Healthy, Salads, Vegan",
    coverImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    deliveryTime: 25,
    isPremium: true,
    menuItems: [
      {
        id: "4-1",
        name: "Quinoa Power Bowl",
        description: "Tri-colour quinoa with roasted chickpeas, avocado, and tahini dressing",
        price: 399,
        category: "Main Course",
        isVeg: true,
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
        available: true,
        restaurantId: "4",
        restaurantName: "Green Roots Kitchen"
      }
    ]
  }
];
