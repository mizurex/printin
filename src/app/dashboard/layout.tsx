import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import DashboardHeader from "@/components/dashboard-header"
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// Admin email from environment variable, fallback to hardcoded for development
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "dhananjayadhal3@gmail.com";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  // If no session, redirect to home
  if (!session?.user) {
    redirect("/");
  }
  
  // If user email doesn't match admin email, redirect to home
  if (session.user.email !== ADMIN_EMAIL) {
    redirect("/");
  }
  
  // User is authenticated and is admin - render dashboard
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-h-screen bg-[#f8f9fa]">
        <DashboardHeader />
        {children}
      </main>
    </SidebarProvider>
  )
}
