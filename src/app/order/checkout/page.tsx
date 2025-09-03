import Checkout from "@/components/Checkout";
import { auth } from "@/auth";
import Redirect from "@/components/Redirect";

export default async function CheckoutPage() {
    const session = await auth();
    
    if(!session?.user){
        return <Redirect/>
    }
  const userId = Number(session?.user.id);
  return (
   
    <>
     <Checkout userId={userId}/>
    </>
  );
}
