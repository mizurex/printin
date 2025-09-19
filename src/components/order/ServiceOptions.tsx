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
  { id: "1", name: "Connaught Place Store", lat: 28.6139, lng: 77.209, address: "Shop 15, Block A, Connaught Place, New Delhi - 110001" },
  { id: "2", name: "Unity One Mall Store", lat: 28.7041, lng: 77.1025, address: "Store 42, Unity One Mall, Rohini Sector 7, Delhi - 110085" },
  { id: "3", name: "Lajpat Nagar Store", lat: 28.5355, lng: 77.391, address: "Shop 8, Central Market, Lajpat Nagar IV, New Delhi - 110024" },
  { id: "4", name: "R City Mall Store", lat: 19.076, lng: 72.8777, address: "Unit 205, R City Mall, Dadar West, Mumbai - 400028" },
  { id: "5", name: "Atria Mall Store", lat: 19.0330, lng: 72.8570, address: "Shop 12, Atria Mall, Dr Annie Besant Road, Worli, Mumbai - 400018" },
  { id: "6", name: "Infinity Mall Store", lat: 19.1136, lng: 72.8697, address: "Store 78, Infinity Mall, Andheri East, Mumbai - 400069" },
  { id: "7", name: "Deccan Gymkhana Store", lat: 18.5204, lng: 73.8567, address: "Shop 23, Deccan Gymkhana, Shivaji Nagar, Pune - 411005" },
  { id: "8", name: "Forum Mall Store", lat: 12.9716, lng: 77.5946, address: "Unit 156, Forum Mall, MG Road, Bengaluru - 560001" },
  { id: "9", name: "Koramangala Store", lat: 12.9352, lng: 77.6245, address: "Shop 34, 5th Block, Koramangala, Bengaluru - 560095" },
  { id: "10", name: "Phoenix MarketCity Store", lat: 12.9698, lng: 77.7500, address: "Store 67, Phoenix MarketCity, Whitefield, Bengaluru - 560066" },
  { id: "11", name: "Express Avenue Mall Store", lat: 13.0827, lng: 80.2707, address: "Shop 45, Express Avenue Mall, T Nagar, Chennai - 600017" },
  { id: "12", name: "Luz Corner Store", lat: 13.0569, lng: 80.2423, address: "Unit 89, Luz Corner, Mylapore, Chennai - 600004" },
  { id: "13", name: "GVK One Mall Store", lat: 17.3850, lng: 78.4867, address: "Shop 123, GVK One Mall, Banjara Hills, Hyderabad - 500034" },
  { id: "14", name: "DLF Cyber City Store", lat: 17.4400, lng: 78.3489, address: "Store 56, DLF Cyber City, Gachibowli, Hyderabad - 500032" },
  { id: "15", name: "Forum Mall Park Street Store", lat: 22.5726, lng: 88.3639, address: "Shop 91, Forum Mall, Park Street, Kolkata - 700016" },
  { id: "16", name: "City Centre Salt Lake Store", lat: 22.5448, lng: 88.3426, address: "Unit 234, City Centre, Salt Lake Sector 1, Kolkata - 700064" },
  { id: "17", name: "Alpha One Mall Store", lat: 23.0225, lng: 72.5714, address: "Shop 167, Alpha One Mall, Satellite, Ahmedabad - 380015" },
  { id: "18", name: "Crystal Palm Mall Store", lat: 26.9124, lng: 75.7873, address: "Store 28, Crystal Palm Mall, C-Scheme, Jaipur - 302001" },
  { id: "19", name: "VR Mall Store", lat: 21.1702, lng: 72.8311, address: "Shop 76, VR Mall, Athwa Gate, Surat - 395007" },
  { id: "20", name: "Caculo Mall Store", lat: 15.2993, lng: 74.1240, address: "Unit 45, Caculo Mall, St Inez, Panaji, Goa - 403001" },
  { id: "21", name: "Sector 17 Plaza Store", lat: 30.7333, lng: 76.7794, address: "Shop 198, Sector 17 Plaza, Sector 17, Chandigarh - 160017" },
  { id: "22", name: "P&M Mall Store", lat: 25.5941, lng: 85.1376, address: "Store 67, P&M Mall, Boring Road, Patna - 800001" },
  { id: "23", name: "Sahara Ganj Mall Store", lat: 26.8467, lng: 80.9462, address: "Shop 134, Sahara Ganj Mall, Hazratganj, Lucknow - 226001" },
  { id: "24", name: "DB City Mall Store", lat: 23.2599, lng: 77.4126, address: "Unit 89, DB City Mall, New Market, Bhopal - 462003" },
  { id: "25", name: "Mall Road Complex Store", lat: 31.1048, lng: 77.1734, address: "Shop 12, The Mall Road Complex, Mall Road, Shimla - 171001" },
];

type Props = {
  orderData: any;
  setOrderData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
};

export default function ServiceOptions({ orderData, setOrderData, nextStep, prevStep }: Props) {
  const [selectedMethod, setSelectedMethod] = useState<"delivery" | "pickup">(
    orderData.service?.method || "delivery"
  );
  const [showDetails, setShowDetails] = useState(false);

  // --- Switch between delivery and pickup ---
  const handleMethodChange = (method: "delivery" | "pickup") => {
    setSelectedMethod(method);

    if (method === "pickup") {
      setOrderData({
        service: {
          ...orderData.service,
          method: "pickup",
          pickup: {
            store_id: orderData.service?.pickup?.store_id || "",
            store_name: orderData.service?.pickup?.store_name || "",
            store_addr: orderData.service?.pickup?.store_addr || "",
            lat: orderData.service?.pickup?.lat || 0,
            lng: orderData.service?.pickup?.lng || 0,
            date: orderData.service?.pickup?.date,
          },
        },
      });
    } else {
      setOrderData({
        service: {
          ...orderData.service,
          method: "delivery",
          delivery: {
            name: orderData.service?.delivery?.name || "",
            email: orderData.service?.delivery?.email || "",
            phone: orderData.service?.delivery?.phone || "",
            address: orderData.service?.delivery?.address || "",
            city: orderData.service?.delivery?.city || "",
            postal: orderData.service?.delivery?.postal || "",
            date: orderData.service?.delivery?.date,
          },
        },
      });
    }
  };

  const handleNext = () => setShowDetails(true);

  // --- Pickup store selection ---
  const handleStoreSelect = (store: Store) => {
    setOrderData({
      service: {
        ...orderData.service,
        method: "pickup",
        pickup: {
          store_id: store.id,
          store_name: store.name,
          store_addr: store.address,
          lat: store.lat,
          lng: store.lng,
          date: orderData.service?.pickup?.date,
        },
      },
    });
  };

  // --- Map click: reverse geocode and store selection ---
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const resp = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await resp.json();
      return data?.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    } catch (e) {
      return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }
  };

  const handleMapClick = async (lat: number, lng: number) => {
    const address = await reverseGeocode(lat, lng);
    setOrderData({
      service: {
        ...orderData.service,
        method: "pickup",
        pickup: {
          store_id: orderData.service?.pickup?.store_id || "",
          store_name: orderData.service?.pickup?.store_name || "Selected location",
          store_addr: address,
          lat,
          lng,
          date: orderData.service?.pickup?.date,
        },
      },
    });
  };

  // --- Delivery field update ---
  const handleDeliveryChange = (field: keyof typeof orderData.service.delivery, value: string) => {
    setOrderData({
      service: {
        ...orderData.service,
        method: selectedMethod,
        delivery: {
          ...orderData.service.delivery,
          [field]: value,
        },
      },
    });
  };

  // --- Date update ---
  const handleDateChange = (date: string) => {
    if (selectedMethod === "delivery") {
      setOrderData({
        service: {
          ...orderData.service,
          delivery: {
            ...orderData.service.delivery,
            date,
          },
        },
      });
    } else {
      setOrderData({
        service: {
          ...orderData.service,
          pickup: {
            ...orderData.service.pickup,
            date,
          },
        },
      });
    }
  };

  // --- Validation ---
  const isFormValid = () => {
    if (selectedMethod === "delivery") {
      const d = orderData.service.delivery;
      return (
        d?.name?.trim() &&
        d?.email?.trim() &&
        d?.phone?.trim() &&   
        d?.address?.trim()   
      );
    } else {
      const p = orderData.service.pickup;
      return p?.store_id && p?.store_name && p?.store_addr;
    }
  };
  return (
    <div className="bg-[#f2fbfa] min-h-screen py-10 md:py-14">
      <div className="flex justify-center text-black mb-8 md:mb-10 px-4">
        <div className="text-center">
          <h3 className={`text-2xl md:text-4xl lg:text-5xl font-bold text-gray-700 ${heading.className} mb-2`}>
            Last clicks to complete your order
          </h3>
          <p className="text-sm md:text-base text-gray-500">Choose how you'd like to receive your prints</p>
        </div>
      </div>

      {!showDetails ? (
        <div className="space-y-8 py-5">
          <div className="flex justify-center px-4">
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-2xl">
              <button
                className={`flex-1 p-6 h-32 md:h-40 flex flex-col items-center justify-center rounded-xl shadow-lg transition-all duration-200 ${
                  selectedMethod === "delivery"
                    ? "bg-[#026766]/5 shadow-lg"
                    : "bg-white"
                }`}
                onClick={() => handleMethodChange("delivery")}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                  selectedMethod === "delivery" ? "bg-[#026766] text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  🚚
                </div>
                <h3 className={`text-lg font-semibold ${
                  selectedMethod === "delivery" ? "text-gray-900" : "text-gray-500"
                }`}>
                  Delivery to me
                </h3>
                <p className="text-xs text-gray-400 mt-1">Fast & reliable</p>
              </button>

              <button
                className={`flex-1 p-6 h-32 md:h-40 flex flex-col items-center justify-center rounded-xl shadow-lg transition-all duration-200 ${
                  selectedMethod === "pickup"
                    ? "bg-[#026766]/5 shadow-lg"
                    : "bg-white"
                }`}
                onClick={() => handleMethodChange("pickup")}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                  selectedMethod === "pickup" ? "bg-[#026766] text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  🏪
                </div>
                <h3 className={`text-lg font-semibold ${
                  selectedMethod === "pickup" ? "text-gray-900" : "text-gray-500"
                }`}>
                  I'll collect it
                </h3>
                <p className="text-xs text-gray-400 mt-1">Visit our store</p>
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-4">
             <button
          onClick={handleNext}
          className="px-8 py-3 bg-[#026766] text-white font-semibold rounded-xl shadow-lg cursor-pointer hover:bg-[#027876] transition-all duration-200 hover:shadow-xl"
        >
         CONTINUE
        </button> 
        <button
            onClick={prevStep}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
          >
            ← Back
          </button>
          </div>
        </div>
      ) : (
      
        <div className="flex justify-center px-4">
          {selectedMethod === "delivery" ? (
         
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-5">
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Delivery Details</h3>
                <p className="text-sm text-gray-500 mt-1">We'll deliver right to your door</p>
              </div>
              
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={orderData.service.delivery?.name ?? ""}
                onChange={(e) => handleDeliveryChange("name", e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#026766] focus:border-[#026766] transition-all placeholder-gray-400"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={orderData.service.delivery?.email ?? ""}
                onChange={(e) => handleDeliveryChange("email", e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#026766] focus:border-[#026766] transition-all placeholder-gray-400"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={orderData.service.delivery?.phone ?? ""}
                onChange={(e) => handleDeliveryChange("phone", e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#026766] focus:border-[#026766] transition-all placeholder-gray-400"
                required
              />
              <textarea
                placeholder="Delivery Address"
                value={orderData.service.delivery?.address ?? ""}
                onChange={(e) => handleDeliveryChange("address", e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#026766] focus:border-[#026766] transition-all placeholder-gray-400 h-20 resize-none"
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Preferred Delivery Date</label>
                <input
                  type="date"
                  value={orderData.service?.delivery?.date ?? ""}
                  onChange={(e) => handleDateChange(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#026766] focus:border-[#026766] transition-all"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8 px-4 ">
            <button
              onClick={() => setShowDetails(false)}
              className="w-full sm:w-auto px-6 py-3 font-semibold text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              Back to Options
            </button>
            
            <Link href="/order/checkout" className="w-full sm:w-auto">
              <button
                disabled={!isFormValid()}     
                className={`w-full px-8 py-3 font-semibold rounded-xl shadow-lg transition-all duration-200 ${
                  isFormValid()
                    ? "bg-[#026766] text-white hover:bg-[#027876] hover:shadow-xl cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                CHECKOUT
              </button>
            </Link>
          </div>
            </div>
          ) : (
            <div className="w-full max-w-4xl mx-auto space-y-6">
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Select Your Pickup Store</h3>
                <p className="text-sm text-gray-500 mt-1">Click on a store marker or anywhere on the map</p>
              </div>
              
              
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-[300px] md:h-[400px] w-full">
              <Map
                defaultCenter={[22.9734, 78.6569]}
                defaultZoom={6}
                height={400}
                width={800}
                provider={(x, y, z, dpr) =>
                  `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}${
                    dpr && dpr >= 2 ? "@2x" : ""
                  }.png`
                }
                onClick={({ latLng }: any) => handleMapClick(latLng[0], latLng[1])}
              >
                {stores.map((store) => (
                  <Marker
                    key={store.id}
                    width={35}
                    anchor={[store.lat, store.lng]}
                    onClick={() => handleStoreSelect(store)}
                  />
                ))}
                {orderData.service?.pickup?.lat && orderData.service?.pickup?.lng ? (
                  <Marker
                    key="selected"
                    width={40}
                    anchor={[orderData.service.pickup.lat, orderData.service.pickup.lng]}
                  />
                ) : null}
              </Map>
            </div>
          </div>
                  
                  <div className="flex justify-center">
                    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
                      
                      {/* Store Info */}
                      <div className="text-center">
                        {orderData.service.pickup?.store_addr ? (
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-800 mb-1">
                              {orderData.service.pickup?.store_name || "Selected Location"}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {orderData.service.pickup?.store_addr}
                            </p>
                            <p className="text-xs text-green-600 mt-2 font-medium">
                              Store Hours: 09:00 - 18:00
                            </p>
                          </div>
                        ) : (
                          <p className="text-gray-500 mb-4">No store selected</p>
                        )}
                      </div>

                      {/* Date Picker */}
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Preferred Pickup Date
                        </label>
                        <input
                          type="date"
                          value={orderData.service?.pickup?.date ?? ""}
                          onChange={(e) => handleDateChange(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#026766] focus:border-[#026766] transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  
             
              
            </div>
          )}

        
        </div>
      )}

  
      <div className="mt-10">
        <Footer/>
      </div>
     
    </div>
  );
}