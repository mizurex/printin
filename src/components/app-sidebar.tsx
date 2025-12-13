"use client"
import { LayoutDashboard, Package, Users, FileText, Settings, LogOut, TrendingUp } from "lucide-react"
import { ChevronUp, User2 } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

const mainNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview & analytics",
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: Package,
    description: "Manage all orders",
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
    description: "View customer list",
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: TrendingUp,
    description: "Sales & performance",
  },
]

const secondaryNavItems = [
  {
    title: "Documents",
    url: "/dashboard/documents",
    icon: FileText,
    description: "Uploaded files",
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    description: "System settings",
  },
]

export function AppSidebar() {
  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar className="border-r border-border/80 font-sans">
        <SidebarHeader className="p-4">
         
          <a href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-[#ff8201] text-white font-bold text-lg">
              <span className="h-4 w-2 bg-white"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-foreground">PrintIn</span>
              <span className="text-xs text-muted-foreground">Admin Panel</span>
            </div>
          </a>
         
       
        </SidebarHeader>

        

        <SidebarContent className="px-2 font-sans">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2">
              Main Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild className="group hover:bg-[#ffebd6] data-[active=true]:bg-[#ff8201] data-[active=true]:text-white transition-colors">
                          <a href={item.url} className="flex items-center gap-3 px-3 py-2">
                            <item.icon className="h-4 w-4 text-muted-foreground  group-data-[active=true]:text-white" />
                            <span className="font-medium">{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                   
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-4 font-sans">
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2">
              Management
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {secondaryNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild className="group hover:bg-[#ffebd6] transition-colors">
                          <a href={item.url} className="flex items-center gap-3 px-3 py-2">
                            <item.icon className="h-4 w-4 text-muted-foreground " />
                            <span className="text-muted-foreground group-hover:text-foreground">{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                     
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-2">
          <Separator className="mb-2" />
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="w-full hover:bg-[#ffebd6] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff8201]/10">
                        <User2 className="h-4 w-4 text-[#ff8201]" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">Admin</span>
                        <span className="text-xs text-muted-foreground">admin@printin.com</span>
                      </div>
                    </div>
                    <ChevronUp className="ml-auto h-4 w-4 text-muted-foreground" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem className="cursor-pointer ">
                    <User2 className="mr-2 h-4 w-4 " />
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer ">
                    <Settings className="mr-2 h-4 w-4 " />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  )
}
