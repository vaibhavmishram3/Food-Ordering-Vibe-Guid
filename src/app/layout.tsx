import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import SessionProvider from "./components/SessionProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LayoutWrapper } from "./components/LayoutWrapper";



// Premium SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "FoodVibe | Premium Food Delivery & Vibe Guide",
    template: "%s | FoodVibe",
  },
  description: "Discover local gourmet restaurants, spicy delicacies, and fresh healthy options curated for your culinary vibe. Fast delivery, secure payments, and premium taste guides.",
  keywords: ["food delivery", "gourmet food", "restaurant locator", "healthy eating", "spicy dishes", "premium dining", "online ordering"],
  authors: [{ name: "FoodVibe Team" }],
  creator: "FoodVibe",
  publisher: "FoodVibe",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// Viewport configuration for performance and mobile responsiveness
export const viewport: Viewport = {
  themeColor: "#FF5722",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <CartProvider>
            <LayoutWrapper>
              <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <Header />
                <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  {children}
                </main>
                <Footer />
              </div>
            </LayoutWrapper>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
