import {
  MapPin,
  Clock,
  Footprints,
  Bike,
  Car,
} from "lucide-react";
import { formatDuration } from "../utils/formatDuration";
interface Props {
  distance: number;
  duration: number; // seconds from API
}

export default function RouteInfo({
  distance,
  duration,
}: Props) {
  const walkingTime = Math.round((distance / 5) * 60);
  const cyclingTime = Math.round((distance / 15) * 60);
  const drivingTime = Math.round((distance / 40) * 60);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-[#2E7D32] mb-6">
        Route Summary
      </h2>

      {/* Distance & API Time */}
      <div className="grid grid-cols-2 gap-4">

        <div className="bg-green-50 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <MapPin className="text-green-600" />
            <span className="text-gray-600">
              Distance
            </span>
          </div>

          <h3 className="text-3xl font-bold mt-3">
            {distance.toFixed(2)} km
          </h3>
        </div>

        <div className="bg-green-50 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <Clock className="text-green-600" />
            <span className="text-gray-600">
              Estimated Time
            </span>
          </div>

          <h3 className="text-3xl font-bold mt-3">
  {formatDuration(duration)}
</h3>
        </div>

      </div>

      {/* Travel Modes */}
      <h3 className="font-semibold text-[#2E7D32] mt-8 mb-4">
        Travel Time by Mode
      </h3>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-gray-50 rounded-2xl p-4 text-center">
          <Footprints
            size={28}
            className="mx-auto text-green-700"
          />

          <p className="mt-2 font-medium">
            Walking
          </p>

          <p className="text-xl font-bold">
            {formatDuration(walkingTime * 60)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 text-center">
          <Bike
            size={28}
            className="mx-auto text-green-700"
          />

          <p className="mt-2 font-medium">
            Cycling
          </p>

          <p className="text-xl font-bold">
            {formatDuration(cyclingTime * 60)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 text-center">
          <Car
            size={28}
            className="mx-auto text-green-700"
          />

          <p className="mt-2 font-medium">
            Driving
          </p>

          <p className="text-xl font-bold">
            {formatDuration(drivingTime * 60)}
          </p>
        </div>

      </div>

      {/* AI Tip */}
      <div className="mt-8 bg-green-100 rounded-2xl p-4 border border-green-300">
        <h4 className="font-semibold text-[#2E7D32]">
          💡 EcoVia Insight
        </h4>

        <p className="text-gray-700 mt-2">
          {distance < 2
            ? "This destination is close by. Walking is the healthiest and most convenient option."
            : distance < 8
            ? "Cycling offers a good balance between travel time and sustainability."
            : "Driving is the quickest option for this distance, while cycling is a greener alternative if time permits."}
        </p>
      </div>

    </div>
  );
}