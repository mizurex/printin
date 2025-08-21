"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker issue
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: iconUrl.src,        // use .src to get the string URL
  shadowUrl: iconShadow.src, 
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const locations = [
  { id: 1, lat: 28.6139, lng: 77.2090, price: "₹20" }, // Delhi
  { id: 2, lat: 19.0760, lng: 72.8777, price: "₹25" }, // Mumbai
  { id: 3, lat: 12.9716, lng: 77.5946, price: "₹15" }, // Bangalore
  { id: 4, lat: 13.0827, lng: 80.2707, price: "₹18" }, // Chennai
  { id: 5, lat: 22.5726, lng: 88.3639, price: "₹12" }, // Kolkata
  { id: 6, lat: 17.3850, lng: 78.4867, price: "₹16" }, // Hyderabad
  { id: 7, lat: 23.0225, lng: 72.5714, price: "₹10" }, // Ahmedabad
  { id: 8, lat: 26.9124, lng: 75.7873, price: "₹14" }, // Jaipur
  { id: 9, lat: 21.1458, lng: 79.0882, price: "₹9" },  // Nagpur
  { id: 10, lat: 9.9312, lng: 76.2673, price: "₹11" }, // Kochi
];

export default function IndiaMap() {
  return (
    <MapContainer
      center={[22.9734, 78.6569]} // India center
      zoom={5}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://www.carto.com/">CARTO</a>'
        subdomains={["a", "b", "c", "d"]}
      />

      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]}>
          <Popup>
            <h3>Price: {loc.price}</h3>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
