// components/order/OrderNav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useOrderStore } from "@/lib/store";
import ProfileDropdown from "../ProfileDropdown";

interface OrderNavProps {
 
  session?: any; 
}

export default function OrderNav({ session }: OrderNavProps) {
  const steps = ["Files", "Options", "Service", "Checkout"];
  const [language] = useState("English"); 
  const {step} = useOrderStore();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white border-b  h-16">
      <div className="flex items-center space-x-2">
      <Link href="/#"> 
         <img
          src="/logo.png"
          alt="logo"
          className="h-15 md:h-18 w-16 cursor-pointer"
          style={{ maxHeight: "48px" }}
        />
        </Link>
        </div>    
    
        <div className="flex items-center "> 
          <nav className="hidden md:flex space-x-4 text-sm text-gray-600">
        <a href="#" className="hover:text-[#026766] cursor-pointer">For you</a>
        <a href="#" className="hover:text-[#026766] cursor-pointer">Business</a>
        <a href="#" className="hover:text-[#026766]  cursor-pointer">Blogs</a>
        <a href="#" className="hover:text-[#026766] cursor-pointer">Mail</a>
        <a href="#" className="hover:text-[#026766] cursor-pointer">Students</a>
          </nav>
        </div>

        
        <nav className="flex space-x-4 text-sm font-medium">
          {steps.map((label, index) => (
            <div key={label} className="flex items-center">
              <span
                className={`${
                  step === index + 1
                    ? "text-black font-semibold"
                    : "text-gray-600"
                }`}
              >
                {label}
              </span>
              {index < steps.length - 1 && (
                <span className="mx-2 text-black">━</span>
              )}
            </div>
          ))}
        </nav>

        {/* Right - Language + Auth */}
        <div className="flex items-center space-x-4 text-black">
          <div className="flex items-center text-sm">
            <span className="mr-1">🇬🇧</span> {language}
          </div>
          {session?.user ? (
         <ProfileDropdown session={session}/>
          ) : (
            <a href="/login" className="text-teal-600 text-sm font-medium">
              Sign In
            </a>
          )}
        </div>
      
    </header>
  );
}
