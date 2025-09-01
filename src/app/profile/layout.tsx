import Navbar from "@/components/NavBar";

import { auth } from "../../../auth";

export default async function Layout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  const session = await auth();
    return(
        <main className="bg-white">
            <Navbar session={session}/>
            {children}
        </main>
    )
}