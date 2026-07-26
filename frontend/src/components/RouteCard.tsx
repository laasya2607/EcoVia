import type { ReactNode } from "react";
import { MapPin, Clock, Star } from "lucide-react";

interface RouteCardProps {
  icon: ReactNode;
  title: string;
  score: number;
  color: string;
  distance: number;
  duration: number;
}

export default function RouteCard({
  icon,
  title,
  score,
  color,
  distance,
  duration,
}: RouteCardProps) {
  return (
    <div className="bg-[#FCFFFB] rounded-3xl shadow-[0_12px_30px_rgba(46,125,50,.12)] p-5 hover:scale-[1.02] transition-all duration-300">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className={`${color} p-3 rounded-2xl text-white`}>
          {icon}
        </div>

        <div>
          <h2 className="font-bold text-lg capitalize">
            {title} Route
          </h2>

          <p className="text-sm text-gray-500">
            Recommended for your journey
          </p>
        </div>
      </div>

      {/* Score */}
      <div className="mt-5 flex items-center gap-2">
        <Star className="text-yellow-500 fill-yellow-500" size={22} />

        <span className="text-3xl font-bold">
          {score}/100
        </span>
      </div>

      {/* Details */}
      <div className="mt-5 space-y-3">

        <div className="flex items-center gap-3">
          <MapPin className="text-green-600" size={20} />
          <span>{distance.toFixed(2)} km</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="text-blue-600" size={20} />
          <span>{Math.round(duration / 60)} mins</span>
        </div>

      </div>

      {/* Recommendation */}
      <div className="mt-5 bg-green-50 rounded-xl p-4">
        <p className="font-semibold text-[#2E7D32]">
          Why this route?
        </p>

        <p className="text-sm text-gray-600 mt-2">
          This route is optimized for <b>{title}</b> travellers,
          balancing travel time, accessibility, and comfort.
        </p>
      </div>

      <button
        className={`mt-6 w-full py-3 rounded-xl text-white font-semibold ${color}`}
      >
        Selected Route
      </button>
    </div>
  );
}