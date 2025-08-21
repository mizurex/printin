"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker issue
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
    <div>
      <div className="flex justify-center text-black mb-8">
        <h2 className="text-4xl font-bold">Last clicks to complete your order</h2>
      </div>

      {!showDetails ? (
        // STEP 1: Delivery vs Pickup Selection
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => handleMethodChange("delivery")}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                selectedMethod === "delivery"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="serviceMethod"
                  checked={selectedMethod === "delivery"}
                  onChange={() => handleMethodChange("delivery")}
                  className="w-5 h-5"
                />
                <div>
                  <h3 className="text-xl font-semibold">🚚 Delivery</h3>
                  <p className="text-gray-600">We'll deliver to your address</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleMethodChange("pickup")}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                selectedMethod === "pickup"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="serviceMethod"
                  checked={selectedMethod === "pickup"}
                  onChange={() => handleMethodChange("pickup")}
                  className="w-5 h-5"
                />
                <div>
                  <h3 className="text-xl font-semibold">📍 Pickup</h3>
                  <p className="text-gray-600">Collect from our store</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Continue
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
            // Pickup Map
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-4">Select Pickup Store</h3>
              
              {orderData.service.pickup.selected && orderData.service.pickup.storeAddress && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">
                    <strong>Selected Store:</strong> {orderData.service.pickup.storeAddress}
                  </p>
                </div>
              )}

              <div className="h-[400px] border rounded-lg overflow-hidden">
                <MapContainer
                  center={[22.9734, 78.6569]} // India center
                  zoom={5}
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
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Select This Store
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Pickup Date
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
          )}

          <div className="flex justify-between items-center pt-6">
            <button
              onClick={() => setShowDetails(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Options
            </button>
            
            <button
              onClick={nextStep}
              disabled={!isFormValid()}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                isFormValid()
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue to Checkout
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