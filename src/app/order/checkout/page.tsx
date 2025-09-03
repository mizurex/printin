import Checkout from "@/components/Checkout";
import { auth } from "@/auth";
import Redirect from "@/components/Redirect";

export default async function CheckoutPage() {
    const session = await auth();
    
  
    console.log("Session user id:", session?.user?.id);
    
    if(!session?.user){
        return <Redirect/>
    }
    
  return (
   
    <>
     <Checkout userId={session?.user?.id}/>
    </>
  );
}
