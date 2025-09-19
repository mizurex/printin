"use client"
import { useEffect ,useState} from "react";
import { loadStripe } from '@stripe/stripe-js';

import { Merriweather } from "next/font/google";
import { Map, Marker } from "pigeon-maps";
import { useOrderStore } from "@/lib/store";
import Footer from "./Footer";
import Link from "next/link";
import { ArrowDownIcon } from "lucide-react";
import { motion } from "framer-motion";

if(!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY){
  throw new Error("Stripe promise not found");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);





const heading = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface CheckoutProps {
  userId: string | undefined;
}

  
export default function Checkout({userId}: CheckoutProps) {

  const { orderData, setOrderData, step, setStep } = useOrderStore();
  
    const lat = orderData.service.pickup?.lat ?? 51.5074;
    const lng = orderData.service.pickup?.lng ?? -0.1278;
  
  
  

  const handlePayment = async () => {

  try {
   
    const response = await fetch("/api/v1/stripe-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderSelections: {
          files: orderData.files,
          options: orderData.options,
          copies: orderData.copies,
          service: orderData.service
        },
        successUrl: `${window.location.origin}/order/success`,
        cancelUrl: `${window.location.origin}/checkout`,
        totalAmount: totalAmount,
        userId : userId,

      })
    });
 
   const { id } = await response.json(); 
    
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: id });
    
  } catch (error) {
    console.error(error);
    alert('Payment failed to start');
  }
};

  const [totalAmount,setTotalAmount] = useState(9);
  

  useEffect(() => {
  const calculate = async () => {
    try {
      const response = await fetch("/api/v1/calculate-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          files: orderData.files,
          options: orderData.options,
          copies: orderData.copies,
          service: orderData.service
        })
      });
      
      const result = await response.json();
      setTotalAmount(result.total);
      
    } catch (error) {
      console.error('Price calculation failed:', error);
    }
  };

  calculate();
}, [orderData]);



const handleCopies = (delta: number) => {
  
  const newCopies = Math.max(1, orderData.copies + delta);
  setOrderData({
    ...orderData,
    copies: newCopies,
  });
};

  return (
    <main className=" min-h-screen bg-white flex flex-col items-center justify-center text-center text-black">
 
      <section className="w-full min-h-[60vh] md:h-[70vh] flex  justify-center px-4">
      {/* Foreground content */}
      <div className="relative z-10 max-w-xl mx-auto text-center pt-9">
        <h2 className={`text-2xl md:text-4xl text-gray-700 font-bold mb-6 ${heading.className}`}>
          Here's your printing quote
        </h2>

        <div className="relative inline-block bg-[#026766]  text-white rounded-2xl px-6 md:px-8 py-4 md:py-6 mb-4 shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20">
     
          <div className="relative z-10">
            <p className="text-xs md:text-sm font-medium opacity-90 tracking-wide uppercase">Total Amount</p>
            <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent py-1">
              ₹{totalAmount + 2.50}
            </p>
            <p className="text-xs opacity-70 font-light">all taxes included</p>
          </div>
        
        </div>

        <p className="mb-4 md:mb-6 text-sm md:text-lg font-medium px-4">
          Collection Time:{" "}
          <span className="font-bold">
          {orderData.service.method === "pickup" ? orderData.service.pickup?.store_addr : orderData.service.delivery?.address}
          </span>
        </p>

        <motion.button
        onClick={handlePayment}
        whileHover = {{scale: 1.02}}
        whileTap = {{scale: 0.98}}
         className="bg-[#026766] text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold shadow-md cursor-pointer text-sm md:text-base">
          PAY ₹{totalAmount + 2.50}
        </motion.button>
      </div>
      <div className="absolute bottom-50 -translate-y-1/2  inset-x-0 flex justify-center gap-2 items-center">
  <span className="animate-bounce">
    <ArrowDownIcon  className="w-8 h-8 text-gray-700" />
  </span>


</div>
      
     
      </section>
    
    <section className="bg-white text-black pt-4 md:pt-1 w-full max-w-6xl mx-auto px-4 md:px-0">
       <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        
       
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 space-y-4 md:space-y-6 flex-1">
          <div>
            
            {orderData.service.method === "pickup" ? (
              <>
               
              <div>
                <div className="flex justify-between">
                  <h3 className="text-base md:text-lg font-semibold mb-2 flex justify-between items-center">
              Collect Location 
              </h3>
              <Link href="/order">
              <button
              className="text-sm text-teal-600 cursor-pointer"
                onClick={()=>{
                  setStep(3);
                }}>
                  Edit
              </button>
              </Link>
              
                </div>
            

  {orderData.service.method === "pickup" ? (
    <div className="border rounded-lg overflow-hidden w-full max-w-sm mx-auto shadow-sm " >
      {/* Small Map */}
      <div className="h-32 md:h-48 w-full">
      <Map
    defaultCenter={[22.9734, 78.6569]}
    defaultZoom={7}
    height={200}
    width={300}
    provider={(x, y, z, dpr) =>
      `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}${
        dpr && dpr >= 2 ? "@2x" : ""
      }.png`
    }
  >
      <Marker
        key={1}
        width={40}
        anchor={[lat, lng]}
      />
  
  </Map>
      </div>

   
      <div className="p-4 mt-3 bg-white">
        <p className="font-bold">{orderData.service.pickup?.store_name}</p>
        <p className="text-gray-600">{orderData.service.pickup?.store_addr}</p>
        <p className="text-green-700 font-semibold text-sm">  09:00 - 18:00</p>
      </div>
    </div>
  ) : (
    <div>
      <p className="font-medium">{orderData.service.delivery?.address || "No address provided"}</p>
      <p className="text-sm">{orderData.service.delivery?.name}</p>
      <p className="text-sm">{orderData.service.delivery?.email}</p>
    </div>
  )}
</div>
         </>
             
            ) : (
              <div>
                <p className="font-medium">{orderData.service.delivery?.address || "No address provided"}</p>
                <p className="text-sm">{orderData.service.delivery?.name}</p>
                <p className="text-sm">{orderData.service.delivery?.email}</p>
              </div>
            )}
          </div>
          <div className="flex justify-start border-b border-b-gray-300">
            <h3 className="text-xl md:text-2xl font-semibold mb-2">Product</h3>
        
          </div>

          <div className="flex justify-start h-12 md:h-16 border border-gray-300 shadow-lg items-center px-4 md:px-5 rounded-md">
             <h3 className="font-bold text-lg md:text-xl">A4 Printing</h3>
          </div>

          <div>
            <div className="flex justify-between items-center">
               <h3 className="text-base md:text-lg font-semibold mb-2">Files Uploaded: 1</h3>
               <div className="flex justify-end">
                <Link href="/order">  
                <button 
                onClick={()=>{
                  setStep(1);
                }}
                className="text-blue-400 text-sm md:text-lg font-semibold mb-2 ">Edit</button>
                </Link>
               </div>
               
            </div>
            <div  className="flex justify-between items-center h-12 md:h-16 border border-gray-300 shadow-lg rounded-md px-4 md:px-5">
                <span className="text-base md:text-lg font-semibold ">File.png</span>
             
                
              </div>
            
            
          
          </div>

          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base md:text-xl font-semibold">Printing Options</h3>
              <Link href="/order"> 
                <button 
                  onClick={()=>{
                    setStep(2);
                  }}
                className="text-blue-400 text-sm md:text-lg font-semibold">Edit</button>
              </Link>
            </div>
            <p className="text-sm md:text-base font-semibold text-gray-600">{orderData.options.colour}, {orderData.options.sides }, {orderData.options.binding === "None" ? "" : "Binding ,"} {orderData.options.lamination === "None" ? "" : "Lamination ,"}</p>
             
          </div>
            <div className="flex justify-between items-center">
  <span className="text-sm md:text-base font-semibold"> Copies </span>
  <div className="flex items-center gap-2">
    <button onClick={() => handleCopies(-1)} className="px-3 py-1 bg-gray-200 rounded text-sm md:text-base">-</button>
    <span className="text-sm md:text-base font-semibold">{orderData.copies}</span>
    <button onClick={() => handleCopies(1)} className="px-3 py-1 bg-gray-200 rounded text-sm md:text-base">+</button>
  </div>
</div>
         
        </div>
          <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 space-y-4 md:space-y-6 flex-1">
            <div >
            <span className="text-lg md:text-xl font-bold text-black ">
  1 File, Pages × {orderData.copies} Copies
</span>

            </div>
            <div className="flex justify-between border-b border-b-gray-400">
              <span className="text-base md:text-xl font-bold text-gray-500 ">{orderData.options.colour} </span>
              <span className="text-base md:text-xl font-bold text-gray-500 ">Included</span>

            </div>
            <div className="flex justify-between ">
              <span className="text-base md:text-xl font-bold text-gray-500 ">Service Charge</span>
              <span className="text-base md:text-xl">₹2.50</span>
            </div>
          <div className="flex justify-between border-t border-t-gray-400 pt-2">
              <span className="text-lg md:text-xl font-bold text-gray-500 ">Total </span>
              <span className="text-lg md:text-xl font-bold text-gray-500 ">₹{totalAmount+2.50}</span>
            </div>
            <div className="flex justify-end">
              <button className="text-sm md:text-base text-blue-500 hover:text-blue-700">
                Apply Discount
              </button>
            </div>
            <div>
              <span className="text-xs md:text-sm text-gray-600">
 {orderData.service.method === "pickup" ? orderData.service.pickup?.store_addr : orderData.service.delivery?.address}
 </span>
            </div>
            <div>
             <motion.button
            whileHover = {{scale: 1.02}}
            whileTap = {{scale: 0.98}}
            onClick={handlePayment}
            className="w-full bg-[#026766] text-white font-semibold py-3 rounded-lg shadow-md cursor-pointer">
            PAY ₹{totalAmount+2.50}
          </motion.button>
            </div>
            <div>
              <span className="text-xs md:text-sm text-gray-500">By placing your order you agree to Printin's cancellation and refund policy outlined in our Terms of Service</span>
            </div>
          </div>
       
       
      </div>
    </section>
    <div className="relative w-full  flex items-center justify-center  mt-4">
            <img src="/raccon.png" alt="" className="w-full h-full  rounded-lg" />
            <span className={`absolute top-0 left-1/2 transform -translate-x-1/2 text-xl md:text-4xl font-bold text-gray-700 ${heading.className} bg-opacity-70 px-4 py-2 rounded`}>
              We Print Responsibly
            </span>
          </div>

     <div className="w-full">
      <Footer/>
     </div>
    </main>
  );
}
