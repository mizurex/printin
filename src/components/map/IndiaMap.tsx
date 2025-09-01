"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import React from "react";

// Custom SVG pin icon (change color below)
const createSvgIcon = (color: string) =>
  L.divIcon({
    className: "",
    html:
      `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 5-9 13-9 13S3 15 3 10a9 9 0 1 1 18 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>`,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -36],
  });

const MARKER_COLOR = "#026766"; 
const markerIcon = createSvgIcon(MARKER_COLOR);

const locations = [
  { id: 1, lat: 28.6139, lng: 77.209, name: "Connaught Place Store", price: "₹20", address: "Block A, Inner Circle, Connaught Place, New Delhi - 110001" }, // Delhi - Central Delhi
  { id: 2, lat: 19.076, lng: 72.8777, name: "Colaba Print Hub", price: "₹25", address: "123 Colaba Causeway, Mumbai - 400001" }, // Mumbai
  { id: 3, lat: 12.9716, lng: 77.5946, name: "MG Road Store", price: "₹15", address: "45 MG Road, Bangalore - 560001" }, // Bangalore
  { id: 4, lat: 28.7041, lng: 77.1025, name: "Karol Bagh Outlet", price: "₹18", address: "67 Ajmal Khan Road, Karol Bagh, New Delhi - 110005" }, // Delhi - North Delhi
  { id: 5, lat: 28.5355, lng: 77.391, name: "Sector 18 Store", price: "₹22", address: "B-12 Sector 18, Noida, Uttar Pradesh - 201301" }, // Delhi - Noida
  { id: 6, lat: 28.4595, lng: 77.0266, name: "DLF Cyber City", price: "₹19", address: "Tower B, DLF Phase 2, Gurgaon, Haryana - 122002" }, // Delhi - Gurgaon
  { id: 7, lat: 28.6692, lng: 77.4538, name: "Laxmi Nagar Branch", price: "₹21", address: "89 Laxmi Nagar Main Road, East Delhi - 110092" }, // Delhi - East Delhi
  { id: 8, lat: 13.0827, lng: 80.2707, name: "T Nagar Store", price: "₹18", address: "156 Pondy Bazaar, T Nagar, Chennai - 600017" }, // Chennai
  { id: 9, lat: 22.5726, lng: 88.3639, name: "Park Street Outlet", price: "₹12", address: "234 Park Street, Kolkata - 700016" }, // Kolkata
  { id: 10, lat: 17.385, lng: 78.4867, name: "Banjara Hills Store", price: "₹16", address: "Road No. 12, Banjara Hills, Hyderabad - 500034" }, // Hyderabad
  { id: 11, lat: 23.0225, lng: 72.5714, name: "CG Road Branch", price: "₹10", address: "78 CG Road, Navrangpura, Ahmedabad - 380009" }, // Ahmedabad
  { id: 12, lat: 26.9124, lng: 75.7873, name: "MI Road Store", price: "₹14", address: "45 MI Road, Jaipur, Rajasthan - 302001" }, // Jaipur
  { id: 13, lat: 21.1458, lng: 79.0882, name: "Sadar Branch", price: "₹9", address: "123 Sadar Main Road, Nagpur - 440001" }, // Nagpur
  { id: 14, lat: 9.9312, lng: 76.2673, name: "MG Road Outlet", price: "₹11", address: "67 MG Road, Kochi, Kerala - 682016" }, // Kochi
  { id: 15, lat: 18.5204, lng: 73.8567, name: "FC Road Store", price: "₹17", address: "89 Fergusson College Road, Pune - 411004" }, // Pune
  { id: 16, lat: 30.7333, lng: 76.7794, name: "Sector 17 Branch", price: "₹13", address: "Shop 45, Sector 17-C, Chandigarh - 160017" }, // Chandigarh
  { id: 17, lat: 19.0330, lng: 72.8570, name: "Worli Print Center", price: "₹26", address: "Unit 12, Atria Mall, Dr Annie Besant Road, Worli, Mumbai - 400018" }, // Mumbai - Worli
  { id: 18, lat: 19.1136, lng: 72.8697, name: "Andheri Express", price: "₹24", address: "Store 78, Infinity Mall, Andheri East, Mumbai - 400069" }, // Mumbai - Andheri
  { id: 19, lat: 12.9352, lng: 77.6245, name: "Koramangala Hub", price: "₹16", address: "Shop 34, 5th Block, Koramangala, Bengaluru - 560095" }, // Bangalore - Koramangala
  { id: 20, lat: 12.9698, lng: 77.7500, name: "Whitefield Store", price: "₹18", address: "Store 67, Phoenix MarketCity, Whitefield, Bengaluru - 560066" }, // Bangalore - Whitefield
  { id: 21, lat: 13.0569, lng: 80.2423, name: "Mylapore Branch", price: "₹17", address: "Unit 89, Luz Corner, Mylapore, Chennai - 600004" }, // Chennai - Mylapore
  { id: 22, lat: 17.4400, lng: 78.3489, name: "Gachibowli Tech", price: "₹15", address: "Store 56, DLF Cyber City, Gachibowli, Hyderabad - 500032" }, // Hyderabad - Gachibowli
  { id: 23, lat: 22.5448, lng: 88.3426, name: "Salt Lake Center", price: "₹13", address: "Unit 234, City Centre, Salt Lake Sector 1, Kolkata - 700064" }, // Kolkata - Salt Lake
  { id: 24, lat: 21.1702, lng: 72.8311, name: "Athwa Gate Store", price: "₹11", address: "Shop 76, VR Mall, Athwa Gate, Surat - 395007" }, // Surat
  { id: 25, lat: 15.2993, lng: 74.1240, name: "Panaji Print Hub", price: "₹20", address: "Unit 45, Caculo Mall, St Inez, Panaji, Goa - 403001" }, // Goa
  { id: 26, lat: 25.5941, lng: 85.1376, name: "Boring Road Outlet", price: "₹8", address: "Store 67, P&M Mall, Boring Road, Patna - 800001" }, // Patna
  { id: 27, lat: 26.8467, lng: 80.9462, name: "Hazratganj Store", price: "₹12", address: "Shop 134, Sahara Ganj Mall, Hazratganj, Lucknow - 226001" }, // Lucknow
  { id: 28, lat: 23.2599, lng: 77.4126, name: "New Market Branch", price: "₹14", address: "Unit 89, DB City Mall, New Market, Bhopal - 462003" }, // Bhopal
  { id: 29, lat: 31.1048, lng: 77.1734, name: "Mall Road Store", price: "₹22", address: "Shop 12, The Mall Road Complex, Mall Road, Shimla - 171001" }, // Shimla
  { id: 30, lat: 32.2431, lng: 77.1892, name: "Dharamshala Hub", price: "₹19", address: "McLeod Ganj Road, Dharamshala, HP - 176219" }, // Dharamshala
  { id: 31, lat: 28.2180, lng: 83.9856, name: "Lakeside Center", price: "₹16", address: "Lakeside Road, Pokhara, Nepal - 33700" }, // Pokhara (if including Nepal)
  { id: 32, lat: 20.2961, lng: 85.8245, name: "Kalinga Store", price: "₹10", address: "Unit 23, Esplanade One Mall, Bhubaneswar - 751009" }, // Bhubaneswar
  { id: 33, lat: 25.3176, lng: 82.9739, name: "Vishwanath Branch", price: "₹9", address: "D-64/120, Lahartara, Varanasi - 221002" }, // Varanasi
  { id: 34, lat: 27.1767, lng: 78.0081, name: "Taj City Store", price: "₹15", address: "Fatehabad Road, Near Taj Mahal, Agra - 282001" }, // Agra
  { id: 35, lat: 24.5854, lng: 73.7125, name: "City Palace Hub", price: "₹13", address: "City Palace Road, Udaipur, Rajasthan - 313001" }, // Udaipur
  { id: 36, lat: 25.1972, lng: 75.8573, name: "Ajmer Gate Store", price: "₹12", address: "Ajmer Gate, Jaipur Road, Kota - 324007" }, // Kota
  { id: 37, lat: 34.1526, lng: 77.5771, name: "Leh Print Center", price: "₹28", address: "Main Bazaar Road, Leh, Ladakh - 194101" }, // Leh
  { id: 38, lat: 11.0168, lng: 76.9558, name: "Coimbatore Mall", price: "₹14", address: "Shop 45, Brookefields Mall, Coimbatore - 641001" }, // Coimbatore
  { id: 39, lat: 8.5241, lng: 76.9366, name: "Trivandrum Central", price: "₹12", address: "MG Road, Thiruvananthapuram - 695001" }, // Thiruvananthapuram
  { id: 40, lat: 15.8497, lng: 74.4977, name: "Margao Store", price: "₹18", address: "Margao Market, South Goa - 403601" }, // Margao, Goa
  { id: 41, lat: 26.4499, lng: 80.3319, name: "Kanpur Central", price: "₹11", address: "Mall Road, Kanpur, UP - 208001" }, // Kanpur
  { id: 42, lat: 22.3039, lng: 70.8022, name: "Rajkot Hub", price: "₹10", address: "Race Course Road, Rajkot - 360001" }, // Rajkot
  { id: 43, lat: 19.9975, lng: 73.7898, name: "Nashik Branch", price: "₹16", address: "College Road, Nashik - 422005" }, // Nashik
  { id: 44, lat: 16.2160, lng: 77.3566, name: "Gulbarga Store", price: "₹9", address: "Station Road, Gulbarga, Karnataka - 585101" }, // Gulbarga
  { id: 45, lat: 14.6816, lng: 77.5946, name: "Anantapur Outlet", price: "₹8", address: "Main Road, Anantapur, AP - 515001" }, // Anantapur
  { id: 46, lat: 16.9891, lng: 82.2475, name: "Kakinada Center", price: "₹10", address: "Main Road, Kakinada, AP - 533001" }, // Kakinada
  { id: 47, lat: 13.3409, lng: 74.7421, name: "Mangalore Hub", price: "₹15", address: "Hampankatta, Mangalore - 575001" }, // Mangalore
  { id: 48, lat: 15.3173, lng: 75.7139, name: "Hubli Store", price: "₹11", address: "Lamington Road, Hubli, Karnataka - 580020" }, // Hubli
  { id: 49, lat: 17.6868, lng: 83.2185, name: "Vizag Beach Road", price: "₹13", address: "Beach Road, Visakhapatnam - 530003" }, // Visakhapatnam
  { id: 50, lat: 28.3670, lng: 79.4304, name: "Bareilly Branch", price: "₹10", address: "Civil Lines, Bareilly, UP - 243001" }, // Bareilly
  { id: 51, lat: 24.6208, lng: 77.7236, name: "Chindwara Store", price: "₹8", address: "Sadar Bazaar, Chhindwara, MP - 480001" }, // Chhindwara
  { id: 52, lat: 23.1815, lng: 79.9864, name: "Jabalpur Hub", price: "₹12", address: "Civil Lines, Jabalpur, MP - 482001" }, // Jabalpur
  { id: 53, lat: 24.8318, lng: 79.9176, name: "Sagar Center", price: "₹9", address: "University Road, Sagar, MP - 470002" }, // Sagar
  { id: 54, lat: 22.9734, lng: 78.6569, name: "Bhopal North", price: "₹13", address: "TT Nagar, Bhopal - 462003" }, // Bhopal - TT Nagar
  { id: 55, lat: 28.9845, lng: 77.7064, name: "Meerut Store", price: "₹11", address: "Sadar Bazaar, Meerut, UP - 250001" }, // Meerut
  { id: 56, lat: 29.3919, lng: 76.9693, name: "Karnal Branch", price: "₹12", address: "GT Road, Karnal, Haryana - 132001" }, // Karnal
];

export function IndiaMap() {
  return (
    <div className="w-full h-[600px]">
         <MapContainer
      center={[22.9734, 78.6569]}
      zoom={5}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://www.carto.com/">CARTO</a>'
        subdomains={["a", "b", "c", "d"]}
      />
      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={markerIcon}>
          <Popup>
            <div className="space-y-1">
              <h3 className="font-semibold">{loc.name}</h3>
              <p className="text-sm text-gray-700">{loc.address}</p>
              <p className="text-sm">Price: {loc.price}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
   
  );
}
