"use client"
import { useEffect ,useState} from "react";
import Link from "next/link";
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51S0P03RHYFZQ6yU5WJ9hlGCmbRG4z9FUKtugPtBaHByyo2EXbPimJ3FV7zKuVHEDgF0rFfWIUh8YAjHSG4ZaLOtg006sKisw1H");
import { Merriweather } from "next/font/google";


const heading = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});
type Props = {
  orderData: any;
};


  
export default function Checkout({ orderData }: Props) {
   

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
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/checkout`
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

  const [totalAmount,setTotalAmount] = useState(0);

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

  return (
    <main className=" min-h-screen  flex flex-col items-center justify-center text-center text-black">
     
      <section className="relative w-full h-[90vh]">

          <img
        src="/hero2.jpeg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      {/* Foreground content */}
      <div className="relative z-10 max-w-xl mx-auto mt-32">
        <h2 className={`text-3xl md:text-4xl text-gray-700 font-bold mb-6 ${heading.className}`}>
          Here’s your printing quote
        </h2>

        <div className="inline-block bg-[#026766] text-white rounded-full px-6 py-4 mb-4 shadow-lg">
          <p className="text-sm">Total</p>
          <p className="text-2xl font-bold">
            £{totalAmount}
          </p>
          <p className="text-xs opacity-80">all taxes incl.</p>
        </div>

        <p className="mb-6 text-lg font-medium">
          Collection Time:{" "}
          <span className="font-bold">
           {orderData.service.pickup.storeAddress}
          </span>
        </p>

        <button className="bg-[#026766] hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md">
          PAY £{totalAmount}
        </button>
      </div>

      
      <div className="absolute bottom-6 ml-96 ">
        <p className="text-sm font-medium text-gray-600">Order Summary ▼</p>
      </div>
      </section>
    
    <section className="bg-white text-black py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT SIDE - Order Summary */}
        <div className="bg-white text-black rounded-2xl shadow-md p-6 space-y-6">
          {/* Collect Location */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Collect Location</h3>
            {orderData.service.method === "pickup" ? (
              <div>
                <p className="font-medium">{orderData.service.pickup.storeAddress || "No store selected"}</p>
              </div>
            ) : (
              <div>
                <p className="font-medium">{orderData.service.delivery.address || "No address provided"}</p>
                <p className="text-sm">{orderData.service.delivery.name}</p>
                <p className="text-sm">{orderData.service.delivery.email}</p>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Product</h3>
            <p>A4 Printing</p>
          </div>

          {/* Files */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Files Uploaded: {orderData.files.length}</h3>
            {orderData.files.map((file: any, i: number) => (
              <div key={i} className="flex justify-between text-sm border-b py-1">
                <span>{file.name || `File ${i + 1}`}</span>
                <span>{file.pages || "?"} pages</span>
              </div>
            ))}
          </div>

          {/* Print Options */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Printing Options</h3>
            <p>{orderData.options.colour}, {orderData.options.sides}, {orderData.options.binding}, {orderData.options.lamination}</p>
            <p>Copies: {orderData.copies}</p>
          </div>
        </div>

        {/* RIGHT SIDE - Payment + Totals */}
        <div className="bg-white text-black rounded-2xl shadow-md p-6 space-y-6">
          <h3 className="text-lg font-semibold">Payment Method</h3>
          <input
            type="text"
            placeholder="Card Number"
            className="border rounded-lg px-3 py-2 w-full"
          />
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="MM/YY"
              className="border rounded-lg px-3 py-2 w-full"
            />
            <input
              type="text"
              placeholder="CVV"
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>

          {/* Order Breakdown */}
          <div className="border-t pt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>{orderData.files.length} files × {orderData.copies} copies</span>
              <span>£0.32</span>
            </div>
            <div className="flex justify-between">
              <span>Service Charge</span>
              <span>£2.50</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${totalAmount}</span>
            </div>
          </div>

          {/* Collection Time */}
          <div className="bg-teal-100 text-teal-800 p-3 rounded-lg text-center">
            Collection Time: {new Date(orderData.service.date).toLocaleString("en-GB", { timeZone: "Europe/London" })}
          </div>

          
          <button 
            onClick={handlePayment}
          className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg shadow-md">
            PAY <span>$ {totalAmount}</span>
          </button>
        </div>
      </div>
    </section>
    </main>
  );
}
