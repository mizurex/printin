import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { auth } from "@/auth"
import Redirect from "@/src/components/Redirect";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  console.log(session?.user?.email);
  if(!session?.user){
    return <Redirect/>
  }
  else if(session?.user?.email !== "dhananjayadhal3@gmail.com"){
     return redirect("/");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}