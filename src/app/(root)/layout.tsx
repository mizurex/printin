import Navbar from "@/components/NavBar";
import { ReactNode } from "react";

export default function Layout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return(
        <main className="bg-white">
            <Navbar/>
            {children}
        </main>
    )
}