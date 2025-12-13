"use client"

import { Search, Bell, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardHeader() {
  return (
    <header className="flex h-[70px] sticky top-0 z-50 items-center justify-between border-b border-border/40 px-4 sm:px-6 lg:px-8 py-2 font-sans bg-white">
      {/* Left Side */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Sidebar Trigger - works on all screen sizes */}
        <SidebarTrigger className="hover:bg-[#ffebd6] hover:text-[#ff8201] text-muted-foreground" />
        
        {/* Title */}
        <div className="hidden sm:block">
          <div className="flex items-center gap-[14px]">
            

            <div className="flex flex-col">
              <span className="text-foreground font-medium">Admin</span>
              <span className="text-xs text-muted-foreground">
                Welcome back to PrintIn 👋
              </span>
            </div>
          </div>
        </div>
        
        {/* Mobile Title */}
        <div className="sm:hidden">
          <span className="text-foreground font-medium text-sm">Dashboard</span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.25 2.5C12.976 2.5 16 5.524 16 9.25C16 12.976 12.976 16 9.25 16C5.524 16 2.5 12.976 2.5 9.25C2.5 5.524 5.524 2.5 9.25 2.5ZM9.25 14.5C12.1502 14.5 14.5 12.1502 14.5 9.25C14.5 6.349 12.1502 4 9.25 4C6.349 4 4 6.349 4 9.25C4 12.1502 6.349 14.5 9.25 14.5ZM15.6137 14.5532L17.7355 16.6742L16.6742 17.7355L14.5532 15.6137L15.6137 14.5532Z"
              fill="#525866"
            />
          </svg>
        </div>

        {/* Notification Button */}
        <button className="relative">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-[10px] bg-white border border-border/50 hover:bg-[#ffebd6] transition-colors">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          </div>
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff8201] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff8201] border border-white"></span>
          </span>
        </button>

        {/* Logout Button */}
        <Button
          type="button"
          className="hidden sm:flex items-center gap-2 px-3 py-2.5 rounded-[10px] bg-[#ff8201] hover:bg-[#ff8201]/90 text-white transition-colors"
        >
          <span className="text-xs font-medium">Logout</span>
          <ArrowUpRight className="h-3 w-3" />
        </Button>
      </div>
    </header>
  )
}

