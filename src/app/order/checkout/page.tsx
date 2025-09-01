import Checkout from "@/components/Checkout";
import { auth } from "../../../../auth";
import Redirect from "@/components/Redirect";

export default async function CheckoutPage() {
    const sesison = await auth();
    if(!sesison?.user){
        return <Redirect/>
    }

  return (
    <>
     <Checkout/>
    </>
  );
}
