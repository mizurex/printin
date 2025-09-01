"use client"
import { useEffect ,useState} from "react";
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");
import { Merriweather } from "next/font/google";

import L from "leaflet";
import dynamic from "next/dynamic";
import { useOrderStore } from "@/lib/store";
import Footer from "./Footer";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

;




const heading = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const markerIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

  
export default function Checkout() {

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
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/checkout`,
        userId : 12344222,

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



const handleCopies = (delta: number) => {
  
  const newCopies = Math.max(1, orderData.copies + delta);
  setOrderData({
    ...orderData,
    copies: newCopies,
  });
};

  return (
    <main className=" min-h-screen bg-white flex flex-col items-center justify-center text-center text-black">
     
      <section className="relative w-full h-[90vh] ">

          <img
        src="/hero2.jpeg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      {/* Foreground content */}
      <div className="relative z-10 max-w-xl mx-auto mt-32">
        <h2 className={`md:text-4xl text-3xl mt-60 md:mt-0 md:text-4xl text-gray-700 font-bold mb-6 ${heading.className}`}>
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
          {orderData.service.pickup?.storeAddress}
          </span>
        </p>

        <button className="bg-[#026766] hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md">
          PAY £{totalAmount}
        </button>
      </div>

      
      <div className="absolute bottom-6 ">
        <p className="text-sm w-full  font-medium text-gray-600">Order Summary ▼</p>
      </div>
      </section>
    
    <section className="bg-white text-black py-10 md:w-[60vw] w-[95vw] flex flex-col md:flex-row">
       <div className=" flex justify-between  md:w-[60vw] w-[95vw] flex flex-col md:flex-row">
        
       
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
          <div>
            
            {orderData.service.method === "pickup" ? (
              <>
               
              <div>
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold mb-2 flex justify-between items-center">
              Collect Location 
              </h3>
              <button
              className="text-sm text-teal-600 cursor-pointer"
                onClick={()=>{
                  setStep(3);
                }}>
                  Edit
              </button>
                </div>
            

  {orderData.service.method === "pickup" ? (
    <div className="border rounded-lg overflow-hidden  shadow-sm " >
      {/* Small Map */}
      <div className="h-48 w-full">
        <MapContainer
        center={[lat, lng]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          />
          <Marker
            position={[lat, lng]}
            icon={markerIcon}
          >
            <Popup>
              <div>
                <strong>{orderData.service.pickup?.storeName}</strong>
                <p className="text-sm">{orderData.service.pickup?.storeAddress} </p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

   
      <div className="p-4 bg-white">
        <p className="font-bold">{orderData.service.pickup?.storeName}</p>
        <p className="text-gray-600">{orderData.service.pickup?.storeAddress}</p>
        <p className="text-green-700 font-semibold text-sm">Closed - Opens at 09:00</p>
      </div>
    </div>
  ) : (
    <div>
      <p className="font-medium">{orderData.service.delivery?.customerAddress || "No address provided"}</p>
      <p className="text-sm">{orderData.service.delivery?.customerName}</p>
      <p className="text-sm">{orderData.service.delivery?.customerEmail}</p>
    </div>
  )}
</div>
         </>
             
            ) : (
              <div>
                <p className="font-medium">{orderData.service.delivery?.customerAddress || "No address provided"}</p>
                <p className="text-sm">{orderData.service.delivery?.customerName}</p>
                <p className="text-sm">{orderData.service.delivery?.customerEmail}</p>
              </div>
            )}
          </div>
          <div className="flex justify-start border-b border-b-gray-300">
            <h3 className="text-2xl font-semibold mb-2">Product</h3>
        
          </div>

          <div className="flex justify-start md:h-[7vh] h-[4vh]  border border-gray-300 shadow-lg items-center px-5 rounded-md">
             <h3 className="font-bold text-xl">A4 Printing</h3>
          </div>

          <div>
            <div className="flex justify-between items-center">
               <h3 className="text-lg font-semibold mb-2">Files Uploaded: 1</h3>
               <div className="flex justify-end">
                <button 
                onClick={()=>{
                  setStep(1);
                }}
                className="text-blue-400 text-lg font-semibold mb-2 ">Edit</button>
               </div>
               
            </div>
            <div  className="flex justify-between items-center md:h-[7vh] h-[4vh]  border border-gray-300 shadow-lg items-center rounded-md px-5">
                <span className="text-lg font-semibold ">File.png 3 pages</span>
             
                
              </div>
            
            
          
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center md:justify-between">
            <h3 className="text-lg md:text-2xl font-semibold mb-2">Printing Options</h3>
            <p className="text-lg font-semibold">{orderData.options.colour}, {orderData.options.sides }, {orderData.options.binding === "None" ? "" : "Binding ,"} {orderData.options.lamination === "None" ? "" : "Lamination ,"}</p>
             <div className="flex justify-end">
              <button 
                onClick={()=>{
                  setStep(2);
                }}
              className="text-blue-400 text-lg font-semibold mb-2 ">Edit</button>
             </div>
             
          </div>
            <div className="flex justify-between items-center">
  <span> Copies </span>
  <div className="flex items-center gap-2"></div>
    <button onClick={() => handleCopies(-1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
    <span>{orderData.copies}</span>
    <button onClick={() => handleCopies(1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
  </div>
         
        </div>
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
            <div >
              <span className="text-xl font-bold text-black ">1 Files , 2 Pages x {orderData.copies} Copies</span>
            </div>
            <div className="flex justify-between border-b border-b-gray-400">
              <span className="text-xl font-bold text-gray-500 ">{orderData.options.colour} </span>
              <span className="text-xl font-bold text-gray-500 ">0.00rs</span>
            </div>
            <div className="flex justify-between ">
              <span className="text-xl font-bold text-gray-500 ">Service Charge</span>
              <span>£2.50</span>
            </div>
          <div className="flex justify-between border-t border-t-gray-400">
              <span className="text-xl font-bold text-gray-500 ">Total </span>
              <span className="text-xl font-bold text-gray-500 ">£3.30</span>
            </div>
            <div className="flex justify-end">
              <button>
                Apply Discount
              </button>
            </div>
            <div>
              <span>Collection Time:
Friday, 29th August, 12:04h, Europe/London</span>
            </div>
            <div>
             <button
            onClick={handlePayment}
            className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg shadow-md">
            PAY £{totalAmount}
          </button>
            </div>
            <div>
              <span>By placing your order you agree to Printt’s cancellation and refund policy outlined in our Terms of Service</span>
            </div>
          </div>
       
       
      </div>
    </section>
          <div className="relative w-full  flex items-center justify-center">
            <img src="/doggo_md.svg" alt="" className="w-full h-full  rounded-lg" />
            <span className={`absolute top-0 left-1/2 transform -translate-x-1/2 text-xl font-bold text-gray-700 ${heading.className} bg-opacity-70 px-4 py-2 rounded`}>
              We Print Responsibly
            </span>
          </div>

     <div className="">
      <Footer/>
     </div>
    </main>
  );
}
