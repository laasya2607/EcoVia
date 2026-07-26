import { useLocation, useNavigate } from "react-router-dom";
import { formatDuration } from "../utils/formatDuration";
import MapView from "../components/MapView";
import RouteInfo from "../components/RouteInfo";
import WeatherInfo from "../components/WeatherInfo";
import AIRecommendation from "../components/AIRecommendation";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { formatArrivalTime } from "../utils/formatArrivalTime";
import { ArrowLeft } from "lucide-react";

export default function Results() {
  const navigate = useNavigate();

  const { state } = useLocation();
const now = new Date();

const defaultTime =
  `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

const [departureTime, setDepartureTime] =
  useState(defaultTime);

const [arrivalTime, setArrivalTime] =
  useState("");
  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#2E7D32] text-white px-6 py-3 rounded-xl"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const {
    source,
    destination,
    sourcePin,
    destinationPin,
    routePath,
    routeDetails,
    weather,
    travellerType,
  } = state;
  const distance = routeDetails.distance;

const walkingHours = distance / 5;
const cyclingHours = distance / 15;
const drivingHours = distance / 40;

let estimatedHours = drivingHours;

if (routeDetails.travelMode === "walking") {
  estimatedHours = walkingHours;
}

if (routeDetails.travelMode === "cycling") {
  estimatedHours = cyclingHours;
}

if (routeDetails.travelMode === "driving") {
  estimatedHours = drivingHours;
}

const estimatedDuration = Math.round(
  estimatedHours * 3600
);
console.log(routeDetails);
console.log("Duration seconds:", routeDetails.duration);
console.log("Duration hours:", routeDetails.duration / 3600);
  return (
    <div className="min-h-screen bg-[#F6FBF4] p-8">

      {/* Back */}

      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-[#2E7D32] font-semibold mb-6"
      >
        <ArrowLeft />
        Back to Dashboard
      </button>

      {/* Source Destination */}

      <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">

        <h2 className="text-xl font-bold text-[#2E7D32]">
          Journey
        </h2>

        <div className="mt-4">

          <p>
            📍 <b>Source:</b> {source}
          </p>

          <p className="mt-2">
            📍 <b>Destination:</b> {destination}
          </p>

        </div>

      </div>

      {/* Map */}

      <div className="h-125 bg-white rounded-3xl shadow-lg overflow-hidden">

        <MapView
          source={sourcePin}
          destination={destinationPin}
          routePath={routePath}
        />

      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">

  <div className="col-span-2 flex flex-col gap-6">

    <AIRecommendation
      travellerType={travellerType}
      distance={routeDetails.distance}
      duration={estimatedDuration}
      weather={weather}
/>

    {/* Departure Planner */}

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-xl font-bold text-[#2E7D32]">
        Departure Planner
      </h2>

      <p className="text-gray-500 mt-2">
        Choose your departure time to estimate your arrival.
      </p>

      <div className="flex items-center gap-3 mt-5">

        <input
          type="time"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
          className="border rounded-xl px-4 py-3"
        />

        <Pencil
          size={18}
          className="text-gray-500"
        />

      </div>

      <button
        onClick={() =>
          setArrivalTime(
            formatArrivalTime(
    departureTime,
    estimatedDuration
)
          )
        }
        className="mt-5 bg-[#2E7D32] text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
      >
        Estimate Arrival
      </button>

      {arrivalTime && (

        <div className="mt-5 bg-green-50 rounded-2xl p-5">

          <p className="text-gray-600">
            Estimated Arrival
          </p>

          <h2 className="text-3xl font-bold text-[#2E7D32] mt-2">
            {arrivalTime}
          </h2>

          <p className="text-gray-500 mt-2">
           Travel Duration: {formatDuration(estimatedDuration)}
           </p>

        </div>

      )}

    </div>

    <WeatherInfo weather={weather} />

  </div>

  <div className="flex flex-col gap-6">

  <RouteInfo
    distance={routeDetails.distance}
    duration={estimatedDuration}
  />

  {routeDetails.distance > 100 && (

    <div className="bg-orange-50 border border-orange-200 rounded-3xl p-6">

      <h2 className="text-xl font-bold text-orange-600">
        🚗 Long Distance Travel Tips
      </h2>

      <ul className="mt-4 space-y-2 text-gray-700">

        <li>💧 Carry enough drinking water.</li>

        <li>⛽ Ensure sufficient fuel or battery charge.</li>

        <li>☕ Take a short break every 2 hours.</li>

        <li>📱 Keep your phone fully charged.</li>

        <li>🩹 Carry a basic first-aid kit.</li>

      </ul>

    </div>

  )}

</div>

</div>


    </div>
  );
}