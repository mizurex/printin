import NavBar from "@/components/NavBar";
import { ReactNode } from "react";

export default function Layout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return(
        <main className="bg-white">
            
            {children}
        </main>
    )
}