"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Merriweather } from "next/font/google";


const heading = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], 
});


import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: iconUrl.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

type Store = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
};

const stores: Store[] = [
  { id: 1, name: "Delhi Store", lat: 28.6139, lng: 77.209, address: "Connaught Place, Delhi" },
  { id: 2, name: "Mumbai Store", lat: 19.076, lng: 72.8777, address: "Churchgate, Mumbai" },
  { id: 3, name: "Bangalore Store", lat: 12.9716, lng: 77.5946, address: "MG Road, Bangalore" },
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
    setOrderData({
      ...orderData,
      service: {
        ...orderData.service,
        method,
        pickup: {
          ...orderData.service.pickup,
          selected: method === "pickup",
        },
      },
    });
  };

  const handleNext = () => {
    setShowDetails(true);
  };

  const handleStoreSelect = (store: Store) => {
    setOrderData({
      ...orderData,
      service: {
        ...orderData.service,
        method: "pickup",
        pickup: {
          selected: true,
          storeId: store.id,
          storeAddress: store.address,
        },
      },
    });
  };

  const handleDeliveryChange = (field: string, value: string) => {
    setOrderData({
      ...orderData,
      service: {
        ...orderData.service,
        delivery: {
          ...orderData.service.delivery,
          [field]: value,
        },
      },
    });
  };

  const handleDateChange = (date: string) => {
    setOrderData({
      ...orderData,
      service: {
        ...orderData.service,
        date,
      },
    });
  };

  const isFormValid = () => {
    if (selectedMethod === "delivery") {
      return (
        orderData.service.delivery.name &&
        orderData.service.delivery.email &&
        orderData.service.delivery.phone &&
        orderData.service.delivery.address
      );
    } else {
      return orderData.service.pickup.selected && orderData.service.pickup.storeId;
    }
  };

  return (
    <div className="bg-[#f2fbfa] min-h-screen py-14">
      <div className="flex justify-center  text-black mb-10">
        <h3 className={`text-4xl font-bold text-gray-700 ${heading.className}`}>Last clicks to complete your order</h3>
      </div>

      {!showDetails ? (
        <div className="space-y-6 py-5">
          <div className="">
          <div className="flex gap-6 mb-6 justify-center">
  <button
    className={`p-6 w-50 h-[30vh] flex flex-col items-center cursor-pointer justify-center rounded-md shadow-lg border  ${
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
    className={`p-6 w-50 h-[30vh] flex flex-col items-center cursor-pointer justify-center rounded-md shadow-lg border border-t-0 ${
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
        // STEP 2: Show details based on selection
        <div className="space-y-6">
          {selectedMethod === "delivery" ? (
            // Delivery Form
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
              
              
           

              <div className="h-[400px] border rounded-lg overflow-hidden">
                <MapContainer
                  center={[22.9734, 78.6569]} 
                  zoom={7}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                  />

                  {stores.map((store) => (
                    <Marker key={store.id} position={[store.lat, store.lng]}>
                      <Popup>
                        <div className="space-y-3 p-2">
                          <div>
                            <h4 className="font-bold text-lg">{store.name}</h4>
                            <p className="text-gray-600">{store.address}</p>
                          </div>
                          <button
                            onClick={() => handleStoreSelect(store)}
                            className="w-full cursor-pointer px-4 py-2 bg-[#026766] text-white rounded-lg hover:bg-[#037f7d] transition-colors"
                          >
                            Select This Store
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
                  
                  <div className="flex justify-center items-center">
  <div className="w-full max-w-md shadow-lg border rounded-lg p-4 bg-white">
    
    {/* Store Info */}
    <div className="flex justify-between items-start">
      <div>
          {orderData.service.pickup.selected && orderData.service.pickup.storeAddress && (
      <div className="mt-4 p-4  border rounded-lg">
        <p className="text-black font-bold">
          <span className="text-stone-900">Selected Store:</span> {orderData.service.pickup.storeAddress}
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
            
            <button
              onClick={nextStep}
              disabled={!isFormValid()}     
          className={`px-15 py-3 bg-[#026766] text-white font-semibold rounded-lg shadowursor-pointer transition-colors ${
                isFormValid()
                  ? "bg-[#026766] text-white cursor-pointer hover:bg-[#027876] "
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
               CHECKOUT
            </button>
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
    </div>
  );
}