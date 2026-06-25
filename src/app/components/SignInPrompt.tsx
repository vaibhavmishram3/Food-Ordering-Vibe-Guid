"use client";

import { useState } from "react";
import { User } from "lucide-react";
import Link from "next/link";

export function SignInPrompt({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      <div className="glass-card relative z-10 max-w-md w-full mx-4 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-appetizer text-white">
            <User size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Sign in to continue</h3>
            <p className="text-muted-foreground text-sm">
              Create an account or sign in to add items to your cart and place orders
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Link 
            href="/signin" 
            className="btn btn-primary flex-1"
            onClick={onClose}
          >
            Sign In
          </Link>
          <button 
            onClick={onClose}
            className="btn btn-secondary flex-1"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}
