// components/order/OrderNav.tsx
"use client";

import { useState } from "react";

interface OrderNavProps {
  step: number;
  user?: { name: string; avatar?: string } | null; 
}

export default function OrderNav({ step, user }: OrderNavProps) {
  const steps = ["Files", "Options", "Service", "Checkout"];
  const [language] = useState("English"); // example, later make dropdown

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
    
        <div className="flex items-center space-x-6">
          
          <nav className="hidden md:flex space-x-4 text-sm text-gray-600">
            <a href="#">Useful for you</a>
            <a href="#">Business</a>
            <a href="#">Ryman</a>
            <a href="#">Mail Boxes</a>
            <a href="#">Students</a>
          </nav>
        </div>

        {/* Center - Order Steps */}
        <nav className="flex space-x-4 text-sm font-medium">
          {steps.map((label, index) => (
            <div key={label} className="flex items-center">
              <span
                className={`${
                  step === index + 1
                    ? "text-black font-semibold"
                    : "text-gray-400"
                }`}
              >
                {label}
              </span>
              {index < steps.length - 1 && (
                <span className="mx-2 text-gray-300">—</span>
              )}
            </div>
          ))}
        </nav>

        {/* Right - Language + Auth */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm">
            <span className="mr-1">🇬🇧</span> {language}
          </div>
          {user ? (
            <div className="flex items-center space-x-2">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  {user.name[0].toUpperCase()}
                </div>
              )}
            </div>
          ) : (
            <a href="/login" className="text-teal-600 text-sm font-medium">
              Sign In
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
