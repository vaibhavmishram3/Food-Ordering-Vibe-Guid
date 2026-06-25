import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

// Resolve the absolute path to the SQLite db at the project root
const dbPath = path.resolve(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...\n");

  // ============================================================
  // RESTAURANTS & MENU ITEMS
  // ============================================================
  const restaurantsData = [
    // ── 1. Italian ────────────────────────────────────────────
    {
      restaurant: {
        name: "La Bella Trattoria",
        slug: "la-bella-trattoria",
        address: "12 Connaught Place, New Delhi, 110001",
        rating: 4.7,
        cuisine: "Italian",
        coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
        deliveryTime: 35,
        isPremium: true,
      },
      menuItems: [
        { name: "Bruschetta al Pomodoro", description: "Toasted sourdough topped with fresh tomatoes, garlic, and basil drizzle", price: 299, category: "Starter", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400", available: true },
        { name: "Penne Arrabbiata", description: "Penne pasta in a fiery tomato and garlic sauce with fresh parsley", price: 449, category: "Main Course", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400", available: true },
        { name: "Spaghetti Carbonara", description: "Classic creamy pasta with pancetta, egg yolk, and Pecorino Romano", price: 549, category: "Main Course", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400", available: true },
        { name: "Chicken Parmigiana", description: "Crispy breaded chicken breast in marinara with melted mozzarella", price: 699, category: "Main Course", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400", available: true },
        { name: "Tiramisu", description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream", price: 299, category: "Dessert", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400", available: true },
        { name: "Italian Soda", description: "Sparkling water with blood orange or lemon syrup and a splash of cream", price: 149, category: "Beverage", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400", available: true },
        { name: "Margherita Pizza", description: "Classic thin-crust pizza with San Marzano tomatoes and fresh mozzarella", price: 499, category: "Main Course", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400", available: true },
        { name: "Panna Cotta", description: "Silky vanilla cream dessert with a wild berry coulis", price: 249, category: "Dessert", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400", available: true },
      ],
    },

    // ── 2. Indian – North Indian ──────────────────────────────
    {
      restaurant: {
        name: "Tandoor Royale",
        slug: "tandoor-royale",
        address: "45 Chandni Chowk Road, Paharganj, New Delhi, 110055",
        rating: 4.5,
        cuisine: "Indian, North Indian",
        coverImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
        deliveryTime: 30,
        isPremium: false,
      },
      menuItems: [
        { name: "Paneer Tikka", description: "Succulent cottage cheese cubes marinated in spiced yoghurt and grilled in tandoor", price: 349, category: "Starter", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=400", available: true },
        { name: "Chicken Tikka", description: "Boneless chicken marinated in spices and char-grilled to perfection", price: 399, category: "Starter", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400", available: true },
        { name: "Dal Makhani", description: "Slow-cooked black lentils in rich butter and cream sauce", price: 299, category: "Main Course", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400", available: true },
        { name: "Butter Chicken", description: "Tender chicken in a silky, mildly spiced tomato and butter gravy", price: 449, category: "Main Course", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400", available: true },
        { name: "Garlic Naan", description: "Freshly baked fluffy flatbread with butter and roasted garlic", price: 79, category: "Starter", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1542361345-89e58247f2d5?w=400", available: true },
        { name: "Biryani (Veg)", description: "Fragrant basmati rice cooked with seasonal vegetables and whole spices", price: 299, category: "Main Course", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400", available: true },
        { name: "Mutton Rogan Josh", description: "Slow-braised Kashmiri lamb with whole spices and fennel-forward gravy", price: 549, category: "Main Course", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92a03a05?w=400", available: true },
        { name: "Gulab Jamun", description: "Soft milk-solid dumplings soaked in rose-scented sugar syrup", price: 149, category: "Dessert", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1603312853290-b2c48a0a2c85?w=400", available: true },
        { name: "Masala Chai", description: "Traditional spiced Indian milk tea with ginger and cardamom", price: 79, category: "Beverage", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?w=400", available: true },
      ],
    },

    // ── 3. Chinese ────────────────────────────────────────────
    {
      restaurant: {
        name: "The Dragon Palace",
        slug: "the-dragon-palace",
        address: "78 Tangra Main Road, Kolkata, West Bengal 700015",
        rating: 4.3,
        cuisine: "Chinese, Asian",
        coverImage: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800",
        deliveryTime: 40,
        isPremium: false,
      },
      menuItems: [
        { name: "Veg Spring Rolls", description: "Crispy rolls stuffed with seasoned cabbage, carrots, and glass noodles", price: 199, category: "Starter", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1614631446501-abcf76949c1b?w=400", available: true },
        { name: "Chicken Dim Sum", description: "Steamed dumplings filled with minced chicken, spring onion, and ginger", price: 299, category: "Starter", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400", available: true },
        { name: "Kung Pao Chicken", description: "Wok-tossed chicken with peanuts, dried chilies, and Sichuan peppercorns", price: 449, category: "Main Course", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400", available: true },
        { name: "Mapo Tofu", description: "Silken tofu in a spicy, numbing sauce with fermented black bean and chili", price: 349, category: "Main Course", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1604908177453-7462950a6a3b?w=400", available: true },
        { name: "Hakka Noodles (Veg)", description: "Stir-fried egg noodles with julienned vegetables and soy sauce", price: 299, category: "Main Course", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400", available: true },
        { name: "Prawn Fried Rice", description: "Wok-fired jasmine rice with tiger prawns, egg, and scallions", price: 499, category: "Main Course", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400", available: true },
        { name: "Mango Pudding", description: "Silky chilled mango pudding with fresh mango cubes and coconut cream", price: 199, category: "Dessert", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1551024739-78b9c58c1a67?w=400", available: true },
        { name: "Jasmine Green Tea", description: "Delicately floral Chinese jasmine tea served hot", price: 99, category: "Beverage", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400", available: true },
      ],
    },

    // ── 4. Fast Food ──────────────────────────────────────────
    {
      restaurant: {
        name: "Burger Blitz",
        slug: "burger-blitz",
        address: "22 Linking Road, Bandra West, Mumbai, Maharashtra 400050",
        rating: 4.2,
        cuisine: "Fast Food, American",
        coverImage: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800",
        deliveryTime: 20,
        isPremium: false,
      },
      menuItems: [
        { name: "Classic Smash Burger", description: "Double smashed beef patty with American cheese, pickles, and special sauce", price: 349, category: "Main Course", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", available: true },
        { name: "Crispy Chicken Burger", description: "Southern-fried chicken fillet with coleslaw and chipotle mayo", price: 299, category: "Main Course", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400", available: true },
        { name: "Veg Aloo Tikki Burger", description: "Spiced potato patty with mint chutney, onion rings, and tomato", price: 199, category: "Main Course", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400", available: true },
        { name: "Loaded Cheese Fries", description: "Crispy shoestring fries smothered in nacho cheese and jalapeños", price: 199, category: "Starter", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400", available: true },
        { name: "Onion Rings", description: "Beer-battered golden onion rings served with ranch dip", price: 149, category: "Starter", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400", available: true },
        { name: "Chocolate Shake", description: "Thick and creamy Belgian chocolate milkshake with whipped cream", price: 199, category: "Beverage", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400", available: true },
        { name: "Strawberry Sundae", description: "Vanilla soft-serve with fresh strawberry compote and sprinkles", price: 149, category: "Dessert", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400", available: true },
      ],
    },

    // ── 5. Healthy / Salad ────────────────────────────────────
    {
      restaurant: {
        name: "Green Roots Kitchen",
        slug: "green-roots-kitchen",
        address: "5 Koramangala 6th Block, Bengaluru, Karnataka 560095",
        rating: 4.6,
        cuisine: "Healthy, Salads, Vegan",
        coverImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
        deliveryTime: 25,
        isPremium: true,
      },
      menuItems: [
        { name: "Quinoa Power Bowl", description: "Tri-colour quinoa with roasted chickpeas, avocado, and tahini dressing", price: 399, category: "Main Course", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", available: true },
        { name: "Kale Caesar Salad", description: "Massaged kale with parmesan croutons, sunflower seeds, and lemon dressing", price: 349, category: "Starter", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400", available: true },
        { name: "Grilled Chicken & Veggie Wrap", description: "Whole wheat wrap with grilled chicken breast, roasted vegetables, and hummus", price: 349, category: "Main Course", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400", available: true },
        { name: "Acai Berry Bowl", description: "Frozen acai base topped with granola, banana, and seasonal berries", price: 349, category: "Starter", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400", available: true },
        { name: "Beetroot Falafel Plate", description: "Baked beetroot and chickpea falafels with tzatziki, tabbouleh, and pita", price: 379, category: "Main Course", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400", available: true },
        { name: "Mango Chia Pudding", description: "Overnight chia seeds in coconut milk topped with fresh mango and mint", price: 249, category: "Dessert", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=400", available: true },
        { name: "Cold-Pressed Green Juice", description: "Spinach, cucumber, green apple, ginger, and lemon cold-pressed blend", price: 249, category: "Beverage", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1610970881699-44a5587cb7e2?w=400", available: true },
        { name: "Watermelon Mint Cooler", description: "Fresh watermelon juice with mint leaves and a pinch of black salt", price: 179, category: "Beverage", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400", available: true },
      ],
    },

    // ── 6. Mexican ────────────────────────────────────────────
    {
      restaurant: {
        name: "El Sombrero Cantina",
        slug: "el-sombrero-cantina",
        address: "88 Hauz Khas Village, South Delhi, New Delhi 110016",
        rating: 4.4,
        cuisine: "Mexican, Tex-Mex",
        coverImage: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
        deliveryTime: 30,
        isPremium: false,
      },
      menuItems: [
        { name: "Loaded Nachos", description: "Tortilla chips with refried beans, jalapeños, salsa, sour cream, and cheese", price: 299, category: "Starter", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1582169505937-b9992bd01c97?w=400", available: true },
        { name: "Chicken Tacos (3 pcs)", description: "Soft corn tortillas with spiced chicken, pico de gallo, and chipotle crema", price: 349, category: "Main Course", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1565299715199-866c917206bb?w=400", available: true },
        { name: "Black Bean & Cheese Quesadilla", description: "Crispy flour tortilla filled with black beans, pepper jack, and guacamole", price: 299, category: "Main Course", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400", available: true },
        { name: "Carne Asada Burrito", description: "Grilled marinated beef with rice, beans, cheese, and salsa in a giant flour tortilla", price: 499, category: "Main Course", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400", available: true },
        { name: "Guacamole & Chips", description: "House-made chunky guacamole with freshly fried tortilla chips", price: 249, category: "Starter", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400", available: true },
        { name: "Churros with Chocolate Sauce", description: "Fried dough sticks rolled in cinnamon sugar with dipping chocolate sauce", price: 199, category: "Dessert", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?w=400", available: true },
        { name: "Horchata", description: "Traditional Mexican rice milk drink with cinnamon and vanilla", price: 149, category: "Beverage", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?w=400", available: true },
      ],
    },

    // ── 7. Japanese ──────────────────────────────────────────
    {
      restaurant: {
        name: "Sakura Sushi & Ramen",
        slug: "sakura-sushi-ramen",
        address: "34 Indiranagar 100 Feet Road, Bengaluru, Karnataka 560038",
        rating: 4.8,
        cuisine: "Japanese, Sushi",
        coverImage: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
        deliveryTime: 45,
        isPremium: true,
      },
      menuItems: [
        { name: "Salmon Nigiri (2 pcs)", description: "Hand-pressed sushi rice topped with premium fresh Atlantic salmon", price: 399, category: "Starter", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400", available: true },
        { name: "Avocado Maki Roll (6 pcs)", description: "Nori-wrapped sushi rolls with creamy avocado and seasoned rice", price: 299, category: "Starter", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400", available: true },
        { name: "Tonkotsu Ramen", description: "Rich pork bone broth with chashu pork, soft-boiled egg, and nori", price: 549, category: "Main Course", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400", available: true },
        { name: "Miso Vegetable Ramen", description: "White miso broth with tofu, enoki mushrooms, bamboo shoots, and corn", price: 449, category: "Main Course", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400", available: true },
        { name: "Chicken Katsu Curry", description: "Crispy panko chicken cutlet with Japanese curry sauce and steamed rice", price: 549, category: "Main Course", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92a03a05?w=400", available: true },
        { name: "Edamame", description: "Salted steamed young soybeans – the perfect light starter", price: 199, category: "Starter", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=400", available: true },
        { name: "Matcha Mochi Ice Cream", description: "Chewy rice cake surrounding creamy matcha green tea ice cream", price: 249, category: "Dessert", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", available: true },
        { name: "Ramune Soda", description: "Classic Japanese marble soda in yuzu or strawberry flavour", price: 149, category: "Beverage", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=400", available: true },
        { name: "Gyoza (5 pcs)", description: "Pan-fried pork and cabbage dumplings with ponzu dipping sauce", price: 299, category: "Starter", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=400", available: true },
      ],
    },

    // ── 8. Middle Eastern ─────────────────────────────────────
    {
      restaurant: {
        name: "Beirut Bites",
        slug: "beirut-bites",
        address: "17 Greater Kailash Part 1, New Delhi, 110048",
        rating: 4.5,
        cuisine: "Middle Eastern, Lebanese",
        coverImage: "https://images.unsplash.com/photo-1544025162-d76594e31812?w=800",
        deliveryTime: 35,
        isPremium: false,
      },
      menuItems: [
        { name: "Mezze Platter (Veg)", description: "Hummus, baba ganoush, tabbouleh, labneh, and warm pita", price: 449, category: "Starter", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1544025162-d76594e31812?w=400", available: true },
        { name: "Chicken Shawarma Wrap", description: "Marinated rotisserie chicken with garlic sauce, pickles, and tomatoes in pita", price: 349, category: "Main Course", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400", available: true },
        { name: "Falafel Plate", description: "Crispy herb falafel balls with hummus, Israeli salad, and tahini", price: 299, category: "Main Course", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb6?w=400", available: true },
        { name: "Lamb Kofta Plate", description: "Grilled minced lamb koftas with bulgur pilaf and harissa sauce", price: 549, category: "Main Course", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400", available: true },
        { name: "Fattoush Salad", description: "Crispy pita chips with romaine, radishes, sumac dressing, and pomegranate", price: 249, category: "Starter", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400", available: true },
        { name: "Baklava", description: "Flaky phyllo pastry layered with crushed pistachios and rosewater honey syrup", price: 199, category: "Dessert", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400", available: true },
        { name: "Mint Lemonade", description: "Lebanese-style fresh lemon juice blended with mint and a hint of sugar", price: 149, category: "Beverage", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400", available: true },
        { name: "Knafeh", description: "Shredded wheat pastry filled with stretchy sweet cheese and orange blossom syrup", price: 249, category: "Dessert", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", available: true },
      ],
    },
  ];

  // ──────────────────────────────────────────────────────────
  // Write to DB
  // ──────────────────────────────────────────────────────────
  let totalRestaurants = 0;
  let totalMenuItems = 0;

  for (const { restaurant, menuItems } of restaurantsData) {
    const created = await prisma.restaurant.upsert({
      where: { slug: restaurant.slug },
      update: {},
      create: restaurant,
    });

    for (const item of menuItems) {
      await prisma.menuItem.create({
        data: { ...item, restaurantId: created.id },
      });
    }

    totalRestaurants++;
    totalMenuItems += menuItems.length;
    console.log(`  ✅ ${restaurant.name} — ${menuItems.length} items`);
  }

  console.log(`\n🎉 Seeding complete!`);
  console.log(`   Restaurants : ${totalRestaurants}`);
  console.log(`   Menu Items  : ${totalMenuItems}`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
