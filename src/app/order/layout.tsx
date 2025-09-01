import OrderNav from "@/components/order/OrderNav";
import { auth } from "../../../auth";
import Redirect from "@/components/Redirect";

export default async function Layout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  const session = await auth();
  if(!session?.user){
    return <Redirect/>
  }
    return(
        <main>
            <OrderNav session={session}/>
           {children} 
        </main>
        
    )
}