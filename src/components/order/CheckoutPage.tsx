import React from "react";
import { auth } from "../../../auth";
import Checkout from "../Checkout";
import Redirect from "../Redirect";



export default async function CheckoutPage() {
    const session = await auth();

    if(!session?.user){
        return <Redirect/>
    }
    
  return (
    <>
    <Checkout/>
    </>
    
    
  )
}