import {
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  CloudSun,
  Umbrella,
} from "lucide-react";

interface Props {
  weather: any;
}

export default function WeatherInfo({ weather }: Props) {
  if (!weather) return null;

  const recommendation =
    weather.rainChance > 60
      ? "Carry an umbrella. Driving is recommended."
      : weather.temperature > 34
      ? "It's quite hot. Cycling or driving is recommended."
      : weather.wind > 25
      ? "Strong winds expected. Be cautious while cycling."
      : "Excellent weather for walking and outdoor travel.";

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-[#2E7D32]">
            Weather at Source
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Current weather conditions
          </p>
        </div>

        <CloudSun
          size={42}
          className="text-yellow-500"
        />

      </div>

      {/* Main Temperature */}
      <div className="mt-6 flex items-center gap-5">

        <Sun
          size={60}
          className="text-yellow-500"
        />

        <div>

          <h1 className="text-5xl font-bold">
            {weather.temperature}°C
          </h1>

          <p className="text-gray-500">
            Feels like {weather.feelsLike}°C
          </p>

        </div>

      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 mt-8">

        <div className="bg-green-50 rounded-2xl p-4">

          <CloudRain className="text-blue-500 mb-2" />

          <p className="text-sm text-gray-500">
            Chance of Rain
          </p>

          <h3 className="text-xl font-bold">
            {weather.rainChance}%
          </h3>

        </div>

        <div className="bg-green-50 rounded-2xl p-4">

          <Wind className="text-green-600 mb-2" />

          <p className="text-sm text-gray-500">
            Wind Speed
          </p>

          <h3 className="text-xl font-bold">
            {weather.wind} km/h
          </h3>

        </div>

        <div className="bg-green-50 rounded-2xl p-4">

          <Droplets className="text-cyan-500 mb-2" />

          <p className="text-sm text-gray-500">
            Humidity
          </p>

          <h3 className="text-xl font-bold">
            {weather.humidity ?? "--"}%
          </h3>

        </div>

        <div className="bg-green-50 rounded-2xl p-4">

          <Thermometer className="text-red-500 mb-2" />

          <p className="text-sm text-gray-500">
            Feels Like
          </p>

          <h3 className="text-xl font-bold">
            {weather.feelsLike}°C
          </h3>

        </div>

      </div>

      {/* AI Recommendation */}
      <div className="mt-8 bg-[#EEF8EA] rounded-2xl p-5">

        <div className="flex items-center gap-2">

          <Umbrella
            className="text-[#2E7D32]"
            size={22}
          />

          <h3 className="font-bold text-[#2E7D32]">
            Travel Recommendation
          </h3>

        </div>

        <p className="mt-3 text-gray-700">
          {recommendation}
        </p>

      </div>

    </div>
  );
}