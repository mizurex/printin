'use client'
import { useState, useRef, useEffect } from "react";
import { FiUser, FiSettings, FiPackage, FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { signOutAction } from "@/lib/actions/auth-actions";
import { motion } from "motion/react";

export default function ProfileDropdown({ session }: { session: any }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div>
      {session && session.user && (
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => {
              console.log("clicked, current state:", isDropdownOpen);
              setIsDropdownOpen((prev) => !prev);
            }}
            className="flex items-center space-x-2 text-gray-700 hover:text-[#026766] cursor-pointer p-2"
          >
            <motion.span 
            className="cursor-pointer"
            whileHover={{
                scale:1.1,
                transition:{duration:0.3}
            }}
            > <FiUser className="text-xl"/> </motion.span>
            
          </button>
          
          {isDropdownOpen && (
            <div 
              className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-[9999]"
              style={{
                boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Link 
                href="/profile" 
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#026766] transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FiSettings className="text-lg"/>
                <span>Profile</span>
              </Link>
              <Link 
                href="/myorder" 
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#026766] transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FiPackage className="text-lg"/>
                <span>My Orders</span>
              </Link>
              <form action={signOutAction} className="w-full">
                <button 
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#026766] w-full text-left transition-colors" 
                  type="submit"
                >
                  <FiLogOut className="text-lg"/>
                  <span>Logout</span>
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}