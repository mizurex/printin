import Navbar from "@/components/NavBar";
import { auth } from "../../../auth";
import Redirect from "@/src/components/Redirect";


export default async function MyOrderLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if(!session?.user){
        return <Redirect/>
      }
    
  return (
    <div>
      <Navbar session={session?.user.id}/>
      {children}
    </div>
  );
}
