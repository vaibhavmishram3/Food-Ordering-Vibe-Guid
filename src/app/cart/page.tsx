"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  Check, 
  AlertCircle,
  Receipt,
  User
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; freeDelivery: boolean } | null>(null);
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const code = couponCode.trim().toUpperCase();

    if (!code) return;

    if (code === "VIBE50") {
      if (cartTotal < 199) {
        setCouponError("Minimum order value for VIBE50 is ₹199");
        return;
      }
      const discount = Math.min(Math.round(cartTotal * 0.5), 150);
      setAppliedCoupon({ code, discount, freeDelivery: false });
      setCouponCode("");
    } else if (code === "FREEVIBE") {
      if (cartTotal < 299) {
        setCouponError("Minimum order value for FREEVIBE is ₹299");
        return;
      }
      setAppliedCoupon({ code, discount: 0, freeDelivery: true });
      setCouponCode("");
    } else if (code === "PREMIUM100") {
      if (cartTotal < 499) {
        setCouponError("Minimum order value for PREMIUM100 is ₹499");
        return;
      }
      setAppliedCoupon({ code, discount: 100, freeDelivery: false });
      setCouponCode("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculations
  const deliveryFee = appliedCoupon?.freeDelivery ? 0 : (cartTotal > 0 ? 30 : 0);
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const taxesAndCharges = cartTotal > 0 ? Math.round(cartTotal * 0.05) : 0; // 5% GST
  const grandTotal = Math.max(cartTotal + deliveryFee + taxesAndCharges - discountAmount, 0);

  // Store billing data for checkout in sessionStorage
  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    
    sessionStorage.setItem("food_vibe_order_totals", JSON.stringify({
      subtotal: cartTotal,
      deliveryFee,
      discountAmount,
      appliedCouponCode: appliedCoupon?.code || "",
      taxes: taxesAndCharges,
      total: grandTotal
    }));

    router.push("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ 
          background: "var(--gradient-appetizer)", 
          padding: "24px", 
          borderRadius: "50%", 
          color: "white", 
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <ShoppingBag size={48} />
        </div>
        <h2>Your Cart is Empty</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "400px", marginTop: "12px", marginBottom: "28px" }}>
          Good food is always just a few clicks away. Browse our categories or check the vibe guide.
        </p>
        <Link href="/explore" className="btn btn-primary btn-lg" style={{ textDecoration: "none", borderRadius: "12px" }}>
          <span>Find Food</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, padding: "40px 0" }}>
      <div className="container-custom">
        <h1 style={{ marginBottom: "32px", display: "flex", alignItems: "center", gap: "10px" }}>
          <ShoppingBag size={32} className="text-gradient" />
          Your Shopping Cart
        </h1>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr", 
          gap: "32px",
          alignItems: "start"
        }} className="cart-layout-grid">
          
          {/* Left Columns: Items List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
              <span>Items from {cart[0].restaurantName}</span>
              <span>{cart.length} item{cart.length !== 1 && "s"}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="glass-card" 
                  style={{ 
                    padding: "20px", 
                    borderRadius: "16px", 
                    display: "flex", 
                    gap: "16px",
                    alignItems: "center",
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
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>{item.name}</h3>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginTop: "2px" }}>
                      ₹{item.price} each
                    </span>
                    <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--primary)", display: "block", marginTop: "6px" }}>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    {/* Qty controller */}
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "10px",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: "8px",
                      padding: "4px 10px",
                      border: "1px solid var(--border)"
                    }}>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ border: "none", background: "transparent", color: "var(--text-muted)", cursor: "pointer", display: "flex" }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ minWidth: "16px", textAlign: "center", fontSize: "0.9rem", fontWeight: 700 }}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ border: "none", background: "transparent", color: "var(--text-muted)", cursor: "pointer", display: "flex" }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Delete */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{ border: "none", background: "transparent", color: "var(--text-muted)", cursor: "pointer", display: "flex" }}
                      className="trash-btn-hover"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Columns: Billing details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Promo Code Input */}
            <div className="glass-card" style={{ padding: "20px", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                <Tag size={16} />
                Apply Promo Code
              </h3>
              
              {appliedCoupon ? (
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  backgroundColor: "rgba(56, 176, 0, 0.1)",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid rgba(56, 176, 0, 0.3)"
                }}>
                  <div>
                    <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--fresh)", display: "block" }}>
                      Code {appliedCoupon.code} Applied
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      {appliedCoupon.freeDelivery ? "Free Delivery Activated" : `Saved ₹${appliedCoupon.discount}`}
                    </span>
                  </div>
                  <button 
                    onClick={handleRemoveCoupon}
                    style={{ border: "none", background: "transparent", color: "#E63946", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "10px" }}>
                  <input 
                    type="text" 
                    placeholder="Try VIBE50, FREEVIBE..." 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    style={{ 
                      flex: 1, 
                      backgroundColor: "var(--background)", 
                      border: "1px solid var(--border)", 
                      borderRadius: "10px", 
                      padding: "10px 14px", 
                      outline: "none", 
                      color: "var(--text-main)",
                      fontSize: "0.9rem" 
                    }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm" style={{ borderRadius: "10px" }}>
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#E63946", fontSize: "0.8rem", marginTop: "8px" }}>
                  <AlertCircle size={12} />
                  <span>{couponError}</span>
                </div>
              )}
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginTop: "10px" }}>
                Tip: Copy available codes from our <Link href="/offers" style={{ color: "var(--primary)" }}>Offers Page</Link>.
              </span>
            </div>

            {/* Bill Receipt Card */}
            <div className="glass-card" style={{ padding: "24px", borderRadius: "20px" }}>
              <h3 style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                <Receipt size={18} />
                Bill Details
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.95rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                  <span>Item Total</span>
                  <span>₹{cartTotal}</span>
                </div>
                
                {appliedCoupon && appliedCoupon.discount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--fresh)" }}>
                    <span>Coupon Discount ({appliedCoupon.code})</span>
                    <span>-₹{appliedCoupon.discount}</span>
                  </div>
                )}
                
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                  <span>Delivery Partner Fee</span>
                  <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                  <span>Taxes & GST (5%)</span>
                  <span>₹{taxesAndCharges}</span>
                </div>

                <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "8px 0" }} />

                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "1.2rem", color: "var(--text-main)" }}>
                  <span>To Pay</span>
                  <span className="text-gradient">₹{grandTotal}</span>
                </div>
              </div>

              <button 
                onClick={handleProceedToCheckout}
                className="btn btn-primary btn-lg" 
                style={{ width: "100%", borderRadius: "12px", marginTop: "24px" }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .cart-layout-grid {
          grid-template-columns: 1fr;
        }
        .trash-btn-hover:hover {
          color: #E63946 !important;
        }
        @media (min-width: 992px) {
          .cart-layout-grid {
            grid-template-columns: 1.8fr 1.2fr !important;
          }
        }
      `}} />
    </div>
  );
}
