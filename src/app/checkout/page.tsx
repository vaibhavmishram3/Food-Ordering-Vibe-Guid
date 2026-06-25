"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { 
  MapPin, 
  Phone, 
  User, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Loader2,
  AlertCircle
} from "lucide-react";

interface Totals {
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  appliedCouponCode: string;
  taxes: number;
  total: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { cart, clearCart, setShowSignInPrompt } = useCart();
  const [totals, setTotals] = useState<Totals | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Payment states
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"form" | "razorpay" | "success">("form");
  const [razorpayMethod, setRazorpayMethod] = useState("card");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // Read totals from sessionStorage
    const stored = sessionStorage.getItem("food_vibe_order_totals");
    if (stored) {
      try {
        setTotals(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Redirect if cart is empty or user not signed in
  useEffect(() => {
    if (!session) {
      setShowSignInPrompt(true);
      return;
    }
    if (cart.length === 0 && paymentStep !== "success") {
      router.push("/cart");
    }
  }, [cart, paymentStep, router, session, setShowSignInPrompt]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(phone.trim())) {
      newErrors.phone = "Phone must be a valid 10-digit number";
    }
    if (!address.trim()) newErrors.address = "Delivery address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate a mock Razorpay Order ID
    const randomId = "order_" + Math.random().toString(36).substring(2, 12).toUpperCase();
    setOrderId(randomId);
    setPaymentStep("razorpay");
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    
    // Simulate transaction delay
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep("success");
      clearCart(); // Clear cart state
      sessionStorage.removeItem("food_vibe_order_totals");
    }, 2500);
  };

  if (!totals) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 className="animate-spin text-gradient" size={40} />
      </div>
    );
  }

  return (
    <div style={{ flex: 1, padding: "40px 0" }}>
      <div className="container-custom">
        {paymentStep === "form" && (
          <>
            <h1 style={{ marginBottom: "32px" }}>Checkout</h1>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "1fr", 
              gap: "32px",
              alignItems: "start"
            }} className="checkout-layout-grid">
              
              {/* Left Column: Details form */}
              <div className="glass-card" style={{ padding: "32px", borderRadius: "20px" }}>
                <h2 style={{ fontSize: "1.4rem", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <MapPin className="text-gradient" size={20} />
                  Delivery Details
                </h2>
                
                <form onSubmit={handleStartPayment} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px" }}>
                      <User size={14} /> Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="Enter your full name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ 
                        width: "100%", 
                        backgroundColor: "var(--background)", 
                        border: errors.name ? "1px solid #E63946" : "1px solid var(--border)", 
                        borderRadius: "10px", 
                        padding: "12px 16px", 
                        outline: "none", 
                        color: "var(--text-main)",
                        fontSize: "0.95rem" 
                      }}
                    />
                    {errors.name && <span style={{ color: "#E63946", fontSize: "0.8rem", display: "block", marginTop: "4px" }}>{errors.name}</span>}
                  </div>

                  <div>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px" }}>
                      <Phone size={14} /> Phone Number
                    </label>
                    <input 
                      type="text" 
                      placeholder="10-digit mobile number" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ 
                        width: "100%", 
                        backgroundColor: "var(--background)", 
                        border: errors.phone ? "1px solid #E63946" : "1px solid var(--border)", 
                        borderRadius: "10px", 
                        padding: "12px 16px", 
                        outline: "none", 
                        color: "var(--text-main)",
                        fontSize: "0.95rem" 
                      }}
                    />
                    {errors.phone && <span style={{ color: "#E63946", fontSize: "0.8rem", display: "block", marginTop: "4px" }}>{errors.phone}</span>}
                  </div>

                  <div>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px" }}>
                      <MapPin size={14} /> Delivery Address
                    </label>
                    <textarea 
                      placeholder="Flat/House no., Building, Street address, Area, Pincode" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      style={{ 
                        width: "100%", 
                        backgroundColor: "var(--background)", 
                        border: errors.address ? "1px solid #E63946" : "1px solid var(--border)", 
                        borderRadius: "10px", 
                        padding: "12px 16px", 
                        outline: "none", 
                        color: "var(--text-main)",
                        fontSize: "0.95rem",
                        resize: "none"
                      }}
                    />
                    {errors.address && <span style={{ color: "#E63946", fontSize: "0.8rem", display: "block", marginTop: "4px" }}>{errors.address}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg" 
                    style={{ width: "100%", borderRadius: "12px", marginTop: "12px" }}
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              </div>

              {/* Right Column: Order Summary */}
              <div className="glass-card" style={{ padding: "28px", borderRadius: "20px" }}>
                <h2 style={{ fontSize: "1.3rem", marginBottom: "20px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>Order Summary</h2>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)" }}>{item.name}</span>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>Qty: {item.quantity}</span>
                      </div>
                      <span style={{ fontSize: "0.95rem", fontWeight: 700 }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.9rem", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                    <span>Subtotal</span>
                    <span>₹{totals.subtotal}</span>
                  </div>
                  {totals.discountAmount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--fresh)" }}>
                      <span>Discount ({totals.appliedCouponCode})</span>
                      <span>-₹{totals.discountAmount}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                    <span>Delivery Fee</span>
                    <span>{totals.deliveryFee === 0 ? "FREE" : `₹${totals.deliveryFee}`}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                    <span>Taxes (5% GST)</span>
                    <span>₹{totals.taxes}</span>
                  </div>
                  <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "4px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "1.1rem" }}>
                    <span>Total Amount</span>
                    <span className="text-gradient">₹{totals.total}</span>
                  </div>
                </div>
              </div>

            </div>
          </>
        )}

        {/* Razorpay Simulation Sandbox Modal */}
        {paymentStep === "razorpay" && (
          <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
            <div className="glass-card" style={{ 
              width: "100%", 
              maxWidth: "480px", 
              borderRadius: "24px", 
              overflow: "hidden", 
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}>
              {/* Header of Razorpay */}
              <div style={{ backgroundColor: "#0F172A", padding: "24px", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>Payment Gateway</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                    <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "#3B82F6" }}>Razorpay</span>
                    <span style={{ backgroundColor: "#1E293B", padding: "2px 6px", borderRadius: "4px", fontSize: "0.65rem", color: "#3B82F6", fontWeight: 700 }}>SANDBOX</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>Amount to Pay</span>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "white", marginTop: "2px" }}>₹{totals.total}</div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
                {isProcessing ? (
                  <div style={{ padding: "40px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                    <Loader2 className="animate-spin" size={48} style={{ color: "#3B82F6" }} />
                    <span style={{ fontSize: "1rem", fontWeight: 700 }}>Processing Payment...</span>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", textAlign: "center" }}>
                      Connecting to gateway servers. Do not refresh or click back.
                    </p>
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      <strong>Order Reference:</strong> {orderId}
                    </div>

                    <div style={{ border: "1px solid var(--border)", borderRadius: "12px", padding: "16px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "12px" }}>
                        SELECT PAYMENT METHOD
                      </span>

                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", border: razorpayMethod === "card" ? "1px solid #3B82F6" : "1px solid var(--border)", background: razorpayMethod === "card" ? "rgba(59, 130, 246, 0.05)" : "transparent", cursor: "pointer" }}>
                          <input type="radio" checked={razorpayMethod === "card"} onChange={() => setRazorpayMethod("card")} style={{ display: "none" }} />
                          <CreditCard size={20} style={{ color: razorpayMethod === "card" ? "#3B82F6" : "var(--text-muted)" }} />
                          <div>
                            <span style={{ fontSize: "0.95rem", fontWeight: 700, display: "block" }}>Card Payment</span>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Visa, Mastercard, RuPay</span>
                          </div>
                        </label>

                        <label style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", border: razorpayMethod === "upi" ? "1px solid #3B82F6" : "1px solid var(--border)", background: razorpayMethod === "upi" ? "rgba(59, 130, 246, 0.05)" : "transparent", cursor: "pointer" }}>
                          <input type="radio" checked={razorpayMethod === "upi"} onChange={() => setRazorpayMethod("upi")} style={{ display: "none" }} />
                          <span style={{ fontWeight: 800, fontSize: "0.95rem", color: razorpayMethod === "upi" ? "#3B82F6" : "var(--text-muted)", fontFamily: "monospace" }}>UPI</span>
                          <div>
                            <span style={{ fontSize: "0.95rem", fontWeight: 700, display: "block" }}>GooglePay, PhonePe, UPI ID</span>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Instant payment via UPI App</span>
                          </div>
                        </label>

                        <label style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", border: razorpayMethod === "nb" ? "1px solid #3B82F6" : "1px solid var(--border)", background: razorpayMethod === "nb" ? "rgba(59, 130, 246, 0.05)" : "transparent", cursor: "pointer" }}>
                          <input type="radio" checked={razorpayMethod === "nb"} onChange={() => setRazorpayMethod("nb")} style={{ display: "none" }} />
                          <span style={{ fontWeight: 800, fontSize: "0.95rem", color: razorpayMethod === "nb" ? "#3B82F6" : "var(--text-muted)" }}>BANK</span>
                          <div>
                            <span style={{ fontSize: "0.95rem", fontWeight: 700, display: "block" }}>Net Banking</span>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>All major Indian banks</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <button 
                      onClick={handleCompletePayment}
                      className="btn btn-primary"
                      style={{ 
                        padding: "14px", 
                        borderRadius: "12px", 
                        fontWeight: 700,
                        backgroundColor: "#3B82F6",
                        border: "none",
                        color: "white",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)"
                      }}
                    >
                      <ShieldCheck size={18} />
                      <span>Authorize Payment - ₹{totals.total}</span>
                    </button>
                    
                    <button 
                      onClick={() => setPaymentStep("form")}
                      style={{ border: "none", background: "transparent", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.85rem", alignSelf: "center" }}
                    >
                      Cancel and edit address
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Payment Success Screen */}
        {paymentStep === "success" && (
          <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
            <div className="glass-card" style={{ 
              width: "100%", 
              maxWidth: "520px", 
              borderRadius: "24px", 
              padding: "48px 32px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              border: "1px solid rgba(56, 176, 0, 0.2)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
            }}>
              <div style={{ 
                background: "rgba(56, 176, 0, 0.1)",
                color: "var(--fresh)",
                padding: "20px",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(56,176,0,0.2)"
              }} className="animate-float">
                <CheckCircle2 size={56} />
              </div>

              <div>
                <h1 style={{ fontSize: "2rem", color: "var(--text-main)" }}>Order Placed!</h1>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "8px" }}>
                  Your payment was successfully processed via Razorpay Sandbox.
                </p>
              </div>

              <div style={{ 
                width: "100%", 
                backgroundColor: "rgba(0,0,0,0.15)", 
                border: "1px solid var(--border)", 
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                textAlign: "left",
                fontSize: "0.9rem"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Order ID:</span>
                  <span style={{ fontWeight: 700, color: "var(--text-main)", fontFamily: "monospace" }}>{orderId}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Delivery Driver:</span>
                  <span style={{ fontWeight: 700, color: "var(--text-main)" }}>Assigned (Preparing)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Delivery Address:</span>
                  <span style={{ fontWeight: 700, color: "var(--text-main)", maxWidth: "200px", textAlign: "right" }}>{address}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Est. Delivery Time:</span>
                  <span style={{ fontWeight: 700, color: "var(--primary)" }}>30 - 35 mins</span>
                </div>
              </div>

              <div style={{ width: "100%", display: "flex", gap: "16px" }}>
                <Link href="/" className="btn btn-secondary" style={{ flex: 1, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px" }}>
                  Go Home
                </Link>
                <Link href="/explore" className="btn btn-primary" style={{ flex: 1, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px" }}>
                  Order More
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .checkout-layout-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 992px) {
          .checkout-layout-grid {
            grid-template-columns: 1.8fr 1.2fr !important;
          }
        }
      `}} />
    </div>
  );
}
