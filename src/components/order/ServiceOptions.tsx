"use client";

import { useState } from "react";

import { Merriweather } from "next/font/google";
import { Map, Marker } from "pigeon-maps";



const heading = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

import Link from "next/link";
import Footer from "../Footer";




type Store = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

const stores: Store[] = [
  {
    id: "1",
    name: "Store One",
    address: "123 Main St, City",
    lat: 22.9734,
    lng: 78.6569,
  },
  {
    id: "2",
    name: "Store Two",
    address: "456 Market Rd, City",
    lat: 23.5,
    lng: 79.2,
  },
  {
    id: "3",
    name: "Store Three",
    address: "789 Park Ave, City",
    lat: 23.0,
    lng: 79.0,
  },
  {
    id: "4",
    name: "Store Four",
    address: "101 First Ave, City",
    lat: 22.8,
    lng: 78.8,
  },
  {
    id: "5",
    name: "Store Five",
    address: "123 Main St, City",
    lat: 22.9734,
    lng: 78.6569,
  },
];

type Props = {
  orderData: any;
  setOrderData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
};

export default function ServiceOptions({ orderData, setOrderData, nextStep, prevStep }: Props) {
  const [selectedMethod, setSelectedMethod] = useState<"delivery" | "pickup">(
    orderData.service.method || "delivery"
  );
  const [showDetails, setShowDetails] = useState(false);

  const handleMethodChange = (method: "delivery" | "pickup") => {
    setSelectedMethod(method);

    if (method === "pickup") {
      setOrderData({
        ...orderData,
        service: {
          method: "pickup",
          pickup: {
            customerName: "",
            customerEmail: "",
            customerPhone: "",
            storeName: "",
            storeAddress: "",
          },
        },
      });
    } else {
      setOrderData({
        ...orderData,
        service: {
          method: "delivery",
          delivery: {
            customerName: "",
            customerEmail: "",
            customerPhone: "",
            customerAddress: "",
          },
        },
      });
    }
  };


  const handleNext = () => {
    setShowDetails(true);
  };

  const handleStoreSelect = (store: Store) => {
    setOrderData({
      ...orderData,
      service: {
        method: "pickup",
        pickup: {
          ...(orderData.service.pickup ?? {
            customerName: "",
            customerEmail: "",
            customerPhone: "",
          }),
          storeName: store.name,
          storeAddress: store.address,
        },
      },
    });
  };


  const handleDeliveryChange = (field: any, value: string) => {
    setOrderData({
      ...orderData,
      service: {
        method: "delivery",
        delivery: {
          ...(orderData.service.delivery ?? {
            customerName: "",
            customerEmail: "",
            customerPhone: "",
            customerAddress: "",
          }),
          [field]: value,
        },
      },
    });
  };


  const handleDateChange = (date: string) => {
    if (selectedMethod === "delivery") {
      setOrderData({
        ...orderData,
        service: {
          method: "delivery",
          delivery: {
            ...(orderData.service.delivery ?? {
              customerName: "",
              customerEmail: "",
              customerPhone: "",
              customerAddress: "",
            }),
            date,
          },
        },
      });
    } else {
      setOrderData({
        ...orderData,
        service: {
          method: "pickup",
          pickup: {
            ...(orderData.service.pickup ?? {
              customerName: "",
              customerEmail: "",
              customerPhone: "",
              storeName: "",
              storeAddress: "",
            }),
            date,
          },
        },
      });
    }
  };

  const isFormValid = () => {
    if (selectedMethod === "delivery") {
      return (
        orderData.service.delivery?.customerName &&
        orderData.service.delivery?.customerEmail &&
        orderData.service.delivery?.customerPhone &&
        orderData.service.delivery?.customerAddress
      );
    } else {
      return orderData.service.pickup?.storeName && orderData.service.pickup?.storeAddress;
    }
  };

  return (
    <div className="bg-[#f2fbfa] min-h-screen py-14">
      <div className="flex justify-center  text-black mb-10">
        <h3 className={`md:text-5xl text-3xl font-bold text-gray-700 ${heading.className}`}>Last clicks to complete your order</h3>
      </div>

      {!showDetails ? (
        <div className="space-y-6 py-5">
          <div className="">
          <div className="flex gap-6 mb-6 justify-center">
  <button
    className={`p-6 w-50 h-[20vh] md:h-[30vh] flex flex-col items-center cursor-pointer justify-center rounded-md shadow-lg border  ${
      selectedMethod === "delivery"
        ? "border border-t"
              : " bg-white"
    }`}
    onClick={() => handleMethodChange("delivery")}
  >
    <img
      src="/delivery.png"
      alt="Delivery"
      className="w-20 h-20 mb-2 transition-all duration-100"
    />
    <h3
      className={`text-xl font-semibold ${
        selectedMethod === "delivery" ? "text-gray-900" : "text-gray-400"
      }`}
    >
      Delivery to me
    </h3>
    <input
      type="checkbox"
      checked={selectedMethod === "delivery"}
      readOnly
      className="mt-2 w-5 h-5"
    />
  </button>

  {/* Pickup Card */}
  <button
    className={`p-6 w-50 h-[20vh] md:h-[30vh]  flex flex-col items-center cursor-pointer justify-center rounded-md shadow-lg border border-t-0 ${
      selectedMethod === "pickup"
        ? "border border-t"
              : " bg-white"
    }`}
    onClick={() => handleMethodChange("pickup")}
  >
    <img
      src="/pickup.png"
      alt="Pickup"
      className="w-20 h-20 mb-2 transition-all duration-100"
    />
    <h3
      className={`text-xl font-semibold ${
        selectedMethod === "pickup" ? "text-gray-900" : "text-gray-400"
      }`}
    >
      I&apos;ll collect it
    </h3>
    <input
      type="checkbox"
      checked={selectedMethod === "pickup"}
      readOnly
      className="mt-2 w-5 h-5"
    />
  </button>
</div>

          </div>

          <div className="flex justify-center">
             <button
          onClick={handleNext}
          className="px-15 py-3 bg-[#026766] text-white font-semibold rounded-lg shadow cursor-pointer hover:bg-[#027876]"
        >
         CONTINUE
        </button> 
          </div>
        </div>
      ) : (
      
        <div className="space-y-6">
          {selectedMethod === "delivery" ? (
         
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-4">Delivery Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={orderData.service.delivery.name}
                  onChange={(e) => handleDeliveryChange("name", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={orderData.service.delivery.email}
                  onChange={(e) => handleDeliveryChange("email", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <input
                type="tel"
                placeholder="Phone Number *"
                value={orderData.service.delivery.phone}
                onChange={(e) => handleDeliveryChange("phone", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />

              <textarea
                placeholder="Delivery Address *"
                value={orderData.service.delivery.address}
                onChange={(e) => handleDeliveryChange("address", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Delivery Date
                </label>
                <input
                  type="date"
                  value={orderData.service.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <h3 className="text-xl font-semibold mb-4 text-gray-600">Select Your Pickup Store</h3>
              </div>
              
              
          <div className="h-[400px] border rounded-lg shadow-lg w-fit mx-auto flex justify-center items-center  rounded-lg">
  <Map
    defaultCenter={[22.9734, 78.6569]}
    defaultZoom={7}
    height={400}
    width={1000}
    provider={(x, y, z, dpr) =>
      `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}${
        dpr && dpr >= 2 ? "@2x" : ""
      }.png`
    }
  >
    {stores.map((store) => (
      <Marker
        key={store.id}
        width={40}
        anchor={[store.lat, store.lng]}
        onClick={() => handleStoreSelect(store)}
      />
    ))}
  </Map>
</div>
                  
                  <div className="flex justify-center items-center">
  <div className="w-full max-w-md shadow-lg border rounded-lg p-4 bg-white">
    
    {/* Store Info */}
    <div className="flex justify-between items-start">
      <div>
          {orderData.service.pickup && (
  <div className="mt-4 p-4 border rounded-lg">
    <p className="text-black font-bold">
      {orderData.service.pickup?.storeAddress || "No store selected"}
    </p>
  </div>
)}
        <p className="mt-2">
          <span className="text-[#026766]  font-bold">Closed</span> - 
          <span className="font-semibold text-gray-800"> Opens at 00:00</span>
        </p>
      </div>
    
    </div>

    {/* Date Picker */}
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Preferred Pickup Date
      </label>
      <input
        type="date"
        value={orderData.service.date}
        onChange={(e) => handleDateChange(e.target.value)}
        min={new Date().toISOString().split("T")[0]}
        className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

   
  
  </div>
</div>

             
              
            </div>
          )}

          <div className="flex justify-center space-x-16 items-center pt-6">
            <button
              onClick={() => setShowDetails(false)}
           className="px-6 py-3 font-bold cursor-pointer text-gray-500 transition-all"
            >
              Back to Options
            </button>
            
            <Link href="/order/checkout">
            <button
              
              disabled={!isFormValid()}     
          className={`px-15 py-3 bg-[#026766] text-white font-semibold rounded-lg shadowursor-pointer transition-colors ${
                isFormValid()
                  ? "bg-[#026766] text-white cursor-pointer hover:bg-[#027876] "
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
               CHECKOUT
            </button>
            </Link>
          </div>
        </div>
      )}

      {!showDetails && (
        <div className="flex justify-start mt-8">
          <button
            onClick={prevStep}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
        </div>
      )}
      <div className="mt-10">
        <Footer/>
      </div>
     
    </div>
  );
}