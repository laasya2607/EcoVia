import { useState } from "react";

import TopBar from "../components/TopBar";
import SearchPanel from "../components/SearchPanel";
import MapView from "../components/MapView";
import SavedPlaces from "../components/SavedPlaces";
import { getRoute } from "../services/routing";
import { getWeather } from "../services/weather";
import { useNavigate } from "react-router-dom";


interface Location {
  name: string;
  lat: number;
  lng: number;
}

export default function Dashboard() {
 const [routePath, setRoutePath] = useState<[number, number][]>([]);

  

  

  const [sourcePin, setSourcePin] = useState<Location | null>(null);

  const [destinationPin, setDestinationPin] =
    useState<Location | null>(null);
     const navigate = useNavigate();
  const searchRoutes = async (data: {
    source: string;
    destination: string;
    sourceLocation: Location;
    destinationLocation: Location;
    travelMode: string;
    travellerType: string;
  }) => {
    const {
      sourceLocation,
      destinationLocation,
      travelMode,
      travellerType,
    } = data;

    if (!sourceLocation || !destinationLocation) {
      alert("Please select both locations");
      return;
    }

    try {
      const result = await getRoute(
        sourceLocation,
        destinationLocation,
        travelMode
      );

      if (!result.features || result.features.length === 0) {
        alert("No route found");
        return;
      }

      const feature = result.features[0];

      const segment = feature.properties.segments[0];

      console.log("Travel Mode:", travelMode);
console.log("Distance (m):", segment.distance);
console.log("Duration (sec):", segment.duration);
console.log("Duration (hrs):", segment.duration / 3600);

      const coordinates = feature.geometry.coordinates;

      const path: [number, number][] = coordinates.map(
        (point: number[]) => [point[1], point[0]]
      );

      setRoutePath(path);
      console.log("Route Path:", path);
      setSourcePin(sourceLocation);
      setDestinationPin(destinationLocation);

      const weatherData = await getWeather(
        sourceLocation.lat,
        sourceLocation.lng
      );


      navigate("/results", {
  state: {
    source: data.source,
    destination: data.destination,

    sourcePin: sourceLocation,
    destinationPin: destinationLocation,

    routePath: path,

    routeDetails: {
  distance: segment.distance / 1000,
  duration: segment.duration,
  travelMode,
},
    weather: weatherData,

    travellerType,
  },
});

         } catch (error: any) {
  console.error("FULL ERROR:", error);

  if (error.response) {
    console.log(error.response);
  }

  alert(error.message);
}
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F6FBF4] via-[#EEF8EA] to-[#E6F4E2]">
      <TopBar />

      <main className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* LEFT */}

<div className="col-span-2 flex flex-col gap-5">

  <SearchPanel onSearch={searchRoutes} />

  <SavedPlaces />

  <div className="h-150 bg-white rounded-3xl shadow-lg p-3 overflow-hidden">
    <MapView
      source={sourcePin}
      destination={destinationPin}
      routePath={routePath}
    />
  </div>

  

</div>

          {/* RIGHT */}

<div className="flex flex-col gap-5">

  <div className="bg-white rounded-3xl shadow-lg p-6">

    <h2 className="text-2xl font-bold text-[#2E7D32]">
      EcoVia
    </h2>

    <p className="mt-4 text-gray-600">
      Plan your journey by selecting:
    </p>

    <ul className="mt-4 space-y-3 text-gray-700">

      <li>📍 Source & Destination</li>

      <li>⭐ Saved Places</li>

      <li>🚗 Travel Mode</li>

      <li>👤 Traveller Type</li>

      <li>🗺 Route Planning</li>

    </ul>

    <div className="mt-6 bg-green-50 rounded-2xl p-4">

      <p className="font-semibold text-[#2E7D32]">
        After searching you'll receive:
      </p>

      <ul className="mt-3 space-y-2 text-sm">

        <li>✔ AI Comfort Score</li>

        <li>✔ Weather Report</li>

        <li>✔ Route Summary</li>

        <li>✔ Travel Safety Tips</li>

        <li>✔ Eco Recommendations</li>

      </ul>

    </div>

  </div>

</div>
        </div>
      </main>
    </div>
  );
}