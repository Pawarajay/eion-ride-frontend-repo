"use client";

import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

interface LatLng {
  lat: number;
  lng: number;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center: LatLng = {
  lat: 19.076,
  lng: 72.8777, // Default to Mumbai
};

const PRICES: Record<string, number> = {
  bike: 10, // ₹ per km
  auto: 15,
  car: 25,
};

const RideBooking: React.FC = () => {
  const [pickup, setPickup] = useState<string>("");
  const [drop, setDrop] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("bike");
  const [distance, setDistance] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [pickupLocation, setPickupLocation] = useState<LatLng>(center);
  const [dropLocation, setDropLocation] = useState<LatLng | null>(null);

  const [pickupAutocomplete, setPickupAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [dropAutocomplete, setDropAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  // ✅ Calculate distance using Google Distance Matrix API
  const calculateDistance = async () => {
    if (!pickup || !drop) {
      alert("Please enter both pickup and drop locations!");
      return;
    }

    const origin = encodeURIComponent(pickup);
    const destination = encodeURIComponent(drop);

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    const data = await res.json();

    if (data.rows[0].elements[0].status === "OK") {
      const dist = data.rows[0].elements[0].distance.value / 1000; // meters → km
      const rate = PRICES[vehicleType];
      const total = dist * rate;

      setDistance(parseFloat(dist.toFixed(2)));
      setPrice(parseFloat(total.toFixed(2)));
    } else {
      alert("Invalid location! Please try again.");
    }
  };

  // ✅ Autocomplete handlers
  const handlePickupPlaceChanged = () => {
    if (pickupAutocomplete) {
      const place = pickupAutocomplete.getPlace();
      if (place.formatted_address) {
        setPickup(place.formatted_address);
      }
      if (place.geometry?.location) {
        const location: LatLng = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setPickupLocation(location);
      }
    }
  };

  const handleDropPlaceChanged = () => {
    if (dropAutocomplete) {
      const place = dropAutocomplete.getPlace();
      if (place.formatted_address) {
        setDrop(place.formatted_address);
      }
      if (place.geometry?.location) {
        const location: LatLng = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setDropLocation(location);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">
         Eion Ride Booking
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
          libraries={["places"]}
        >
          <div className="space-y-4 mb-4">
            <Autocomplete
              onLoad={setPickupAutocomplete}
              onPlaceChanged={handlePickupPlaceChanged}
            >
              <input
                type="text"
                placeholder="Enter Pickup Location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </Autocomplete>

            <Autocomplete
              onLoad={setDropAutocomplete}
              onPlaceChanged={handleDropPlaceChanged}
            >
              <input
                type="text"
                placeholder="Enter Drop Location"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </Autocomplete>

            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Mini">Mini</option>
              <option value="Sedan">Sedan</option>
              <option value="Suv">Suv</option>
            </select>

            <button
              onClick={calculateDistance}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all"
            >
              Calculate Fare
            </button>
          </div>

          {distance && price && (
            <div className="mt-4 text-center">
              <p className="text-lg font-medium text-gray-700">
                Distance:{" "}
                <span className="font-semibold">{distance} km</span>
              </p>
              <p className="text-xl font-bold text-indigo-600 mt-2">
                Estimated Fare: ₹{price}
              </p>
            </div>
          )}

          <div className="mt-6 rounded-xl overflow-hidden border">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={pickupLocation}
              zoom={dropLocation ? 11 : 10}
            >
              {pickupLocation && <Marker position={pickupLocation} />}
              {dropLocation && <Marker position={dropLocation} />}
            </GoogleMap>
          </div>
        </LoadScript>
      </div>
    </div>
  );
};

export default RideBooking;
