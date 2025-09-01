"use client";
import { Map, Marker } from "pigeon-maps";
import { useState } from "react";

const stores = [
  { id: 1, lat: 28.6139, lng: 77.209, price: "₹3.50", address: "Shop 15, Block A, Connaught Place, New Delhi - 110001" },
  { id: 2, lat: 28.7041, lng: 77.1025, price: "₹4.20", address: "Store 42, Unity One Mall, Rohini Sector 7, Delhi - 110085" },
  { id: 3, lat: 28.5355, lng: 77.391, price: "₹2.80", address: "Shop 8, Central Market, Lajpat Nagar IV, New Delhi - 110024" },
  { id: 4, lat: 19.076, lng: 72.8777, price: "₹5.50", address: "Unit 205, R City Mall, Dadar West, Mumbai - 400028" },
  { id: 5, lat: 19.0330, lng: 72.8570, price: "₹6.20", address: "Shop 12, Atria Mall, Dr Annie Besant Road, Worli, Mumbai - 400018" },
  { id: 6, lat: 19.1136, lng: 72.8697, price: "₹4.80", address: "Store 78, Infinity Mall, Andheri East, Mumbai - 400069" },
  { id: 7, lat: 18.5204, lng: 73.8567, price: "₹3.90", address: "Shop 23, Deccan Gymkhana, Shivaji Nagar, Pune - 411005" },
  { id: 8, lat: 12.9716, lng: 77.5946, price: "₹7.50", address: "Unit 156, Forum Mall, MG Road, Bengaluru - 560001" },
  { id: 9, lat: 12.9352, lng: 77.6245, price: "₹5.80", address: "Shop 34, 5th Block, Koramangala, Bengaluru - 560095" },
  { id: 10, lat: 12.9698, lng: 77.7500, price: "₹4.50", address: "Store 67, Phoenix MarketCity, Whitefield, Bengaluru - 560066" },
  { id: 11, lat: 13.0827, lng: 80.2707, price: "₹6.80", address: "Shop 45, Express Avenue Mall, T Nagar, Chennai - 600017" },
  { id: 12, lat: 13.0569, lng: 80.2423, price: "₹5.20", address: "Unit 89, Luz Corner, Mylapore, Chennai - 600004" },
  { id: 13, lat: 17.3850, lng: 78.4867, price: "₹4.70", address: "Shop 123, GVK One Mall, Banjara Hills, Hyderabad - 500034" },
  { id: 14, lat: 17.4400, lng: 78.3489, price: "₹3.80", address: "Store 56, DLF Cyber City, Gachibowli, Hyderabad - 500032" },
  { id: 15, lat: 22.5726, lng: 88.3639, price: "₹8.20", address: "Shop 91, Forum Mall, Park Street, Kolkata - 700016" },
  { id: 16, lat: 22.5448, lng: 88.3426, price: "₹6.90", address: "Unit 234, City Centre, Salt Lake Sector 1, Kolkata - 700064" },
  { id: 17, lat: 23.0225, lng: 72.5714, price: "₹5.40", address: "Shop 167, Alpha One Mall, Satellite, Ahmedabad - 380015" },
  { id: 18, lat: 26.9124, lng: 75.7873, price: "₹3.60", address: "Store 28, Crystal Palm Mall, C-Scheme, Jaipur - 302001" },
  { id: 19, lat: 21.1702, lng: 72.8311, price: "₹4.10", address: "Shop 76, VR Mall, Athwa Gate, Surat - 395007" },
  { id: 20, lat: 15.2993, lng: 74.1240, price: "₹7.80", address: "Unit 45, Caculo Mall, St Inez, Panaji, Goa - 403001" },
  { id: 21, lat: 30.7333, lng: 76.7794, price: "₹9.20", address: "Shop 198, Sector 17 Plaza, Sector 17, Chandigarh - 160017" },
  { id: 22, lat: 25.5941, lng: 85.1376, price: "₹2.40", address: "Store 67, P&M Mall, Boring Road, Patna - 800001" },
  { id: 23, lat: 26.8467, lng: 80.9462, price: "₹3.20", address: "Shop 134, Sahara Ganj Mall, Hazratganj, Lucknow - 226001" },
  { id: 24, lat: 23.2599, lng: 77.4126, price: "₹4.60", address: "Unit 89, DB City Mall, New Market, Bhopal - 462003" },
  { id: 25, lat: 31.1048, lng: 77.1734, price: "₹8.90", address: "Shop 12, The Mall Road Complex, Mall Road, Shimla - 171001" },
];

export default function PriceMap() {
  const [center, setCenter] = useState<[number, number]>([20.5937, 78.9629]); // India center
  const [zoom, setZoom] = useState(5);
  const [selected, setSelected] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const filtered = stores.filter((s) =>
    s.address.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = () => {
    if (filtered.length > 0) {
      const store = filtered[0];
      setCenter([store.lat, store.lng]);
      setZoom(12);
      setSelected(store.id);
    } else {
      alert("No store found for that address!");
    }
  };

  return (
    <div className="w-full h-fit relative">
      {/* 🔍 Search bar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2 bg-white shadow p-2 rounded">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by address..."
          className="border px-2 py-1 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="px-3 py-1 bg-[#026766] text-white rounded"
        >
          Search
        </button>
      </div>

      {/* 🗺️ Map */}
      <Map
        height={600}
        center={center}
        zoom={zoom}
        provider={(x, y, z, dpr) =>
          `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}${
            dpr && dpr >= 2 ? "@2x" : ""
          }.png`
        }
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
        }}
      >
        {stores.map((store) => (
          <Marker
            key={store.id}
            anchor={[store.lat, store.lng]}
            onClick={() => setSelected(store.id)}
          />
        ))}
      </Map>

      {/* 📍 Floating price labels */}
      {stores.map(
        (store) =>
          selected === store.id && (
            <div
              key={store.id}
              className="absolute bottom-4 left-4 bg-white p-4 shadow-lg rounded w-64 shadow-lg"
            >
              <h3 className="font-bold">{store.price}</h3>
              <p>{store.address}</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-2 px-2 py-1 bg-[#026766] text-white rounded shadow-lg"
              >
                Close
              </button>
            </div>
          )
      )}
    </div>
  );
}
