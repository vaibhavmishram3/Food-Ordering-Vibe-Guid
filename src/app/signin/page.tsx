"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Utensils, 
  ShieldCheck, 
  Loader2 
} from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    if (!isSignIn && !name.trim()) {
      setError("Name is required for sign up");
      return;
    }

    setIsLoading(true);

    try {
      if (isSignIn) {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError("Invalid email or password");
        } else {
          setSuccess(true);
          setTimeout(() => {
            router.push("/explore");
          }, 1500);
        }
      } else {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Something went wrong");
        } else {
          const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });

          if (result?.error) {
            setError("Account created but failed to sign in");
          } else {
            setSuccess(true);
            setTimeout(() => {
              router.push("/explore");
            }, 1500);
          }
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      flex: 1, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: "60px 20px",
      background: "radial-gradient(circle at center, rgba(255, 87, 34, 0.03), transparent 60%)"
    }}>
      <div className="glass-card" style={{ 
        width: "100%", 
        maxWidth: "440px", 
        padding: "40px 32px", 
        borderRadius: "24px",
        border: "1px solid var(--border)",
        boxShadow: "0 15px 35px rgba(0,0,0,0.2)"
      }}>
        {/* Glowing Brand Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginBottom: "32px", textAlign: "center" }}>
          <div style={{ 
            background: "var(--gradient-appetizer)", 
            padding: "12px", 
            borderRadius: "16px", 
            color: "white", 
            display: "inline-flex"
          }}>
            <Utensils size={28} />
          </div>
          <span style={{ fontSize: "1.6rem", fontWeight: 800, fontFamily: "var(--font-display)" }}>
            Food<span className="text-gradient">Vibe</span> Account
          </span>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
            {isSignIn ? "Welcome back! Enter your details to continue" : "Create an account to customize your flavor profile"}
          </p>
        </div>

        {success ? (
          <div style={{ textAlign: "center", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ background: "rgba(56, 176, 0, 0.1)", color: "var(--fresh)", padding: "16px", borderRadius: "50%" }}>
              <ShieldCheck size={40} />
            </div>
            <h3 style={{ fontSize: "1.3rem" }}>{isSignIn ? "Welcome Back!" : "Account Created!"}</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Successfully authenticated. Redirecting to Explore page...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* Name field (Sign Up only) */}
            {!isSignIn && (
              <div>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px" }}>
                  <User size={14} /> Name
                </label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ 
                    width: "100%", 
                    backgroundColor: "var(--background)", 
                    border: "1px solid var(--border)", 
                    borderRadius: "10px", 
                    padding: "12px 16px", 
                    outline: "none", 
                    color: "var(--text-main)",
                    fontSize: "0.95rem" 
                  }}
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px" }}>
                <Mail size={14} /> Email
              </label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  width: "100%", 
                  backgroundColor: "var(--background)", 
                  border: "1px solid var(--border)", 
                  borderRadius: "10px", 
                  padding: "12px 16px", 
                  outline: "none", 
                  color: "var(--text-main)",
                  fontSize: "0.95rem" 
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px" }}>
                <Lock size={14} /> Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  width: "100%", 
                  backgroundColor: "var(--background)", 
                  border: "1px solid var(--border)", 
                  borderRadius: "10px", 
                  padding: "12px 16px", 
                  outline: "none", 
                  color: "var(--text-main)",
                  fontSize: "0.95rem" 
                }}
              />
            </div>

            {error && (
              <span style={{ color: "#E63946", fontSize: "0.85rem", display: "block" }}>
                {error}
              </span>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn btn-primary btn-lg" 
              style={{ width: "100%", borderRadius: "12px", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{isSignIn ? "Sign In" : "Sign Up"}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Toggle Sign In / Sign Up Link */}
            <div style={{ textAlign: "center", fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "12px" }}>
              {isSignIn ? (
                <span>
                  Don't have an account?{" "}
                  <button 
                    type="button" 
                    onClick={() => { setIsSignIn(false); setError(""); }}
                    style={{ border: "none", background: "transparent", color: "var(--primary)", cursor: "pointer", fontWeight: 600, padding: 0 }}
                  >
                    Sign Up
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{" "}
                  <button 
                    type="button" 
                    onClick={() => { setIsSignIn(true); setError(""); }}
                    style={{ border: "none", background: "transparent", color: "var(--primary)", cursor: "pointer", fontWeight: 600, padding: 0 }}
                  >
                    Sign In
                  </button>
                </span>
              )}
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
