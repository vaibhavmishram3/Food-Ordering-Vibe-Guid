"use client";

import { useCart } from "@/context/CartContext";
import { SignInPrompt } from "./SignInPrompt";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { showSignInPrompt, setShowSignInPrompt } = useCart();

  return (
    <>
      {children}
      {showSignInPrompt && (
        <SignInPrompt onClose={() => setShowSignInPrompt(false)} />
      )}
    </>
  );
}
