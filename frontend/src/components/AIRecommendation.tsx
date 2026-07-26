interface Props {
  travellerType: string;
  distance: number;
  duration: number;
  weather: any;
}

export default function AIRecommendation({
  travellerType,
  distance,
  duration,
  weather,
}: Props) {
  console.log(weather);
  const temperature = weather?.current?.temperature_2m ?? "--";
  const rain = weather?.current?.rain ?? 0;

  const recommendations: Record<
    string,
    {
      title: string;
      icon: string;
      tips: string[];
    }
  > = {
    senior: {
      title: "Senior Friendly Route",
      icon: "🧓",
      tips: [
        "Choose roads with pedestrian crossings.",
        "Avoid unnecessary turns and stairs.",
        "Carry water if walking more than 15 minutes.",
      ],
    },

    wheelchair: {
      title: "Wheelchair Accessible Route",
      icon: "♿",
      tips: [
        "Prefer wider roads and sidewalks.",
        "Avoid steep paths whenever possible.",
        "Use crossings with ramps.",
      ],
    },

    fitness: {
      title: "Fitness Route",
      icon: "🏃",
      tips: [
        "Maintain a steady walking pace.",
        "Stretch before starting.",
        "Stay hydrated.",
      ],
    },

    student: {
      title: "Student Safe Route",
      icon: "🎓",
      tips: [
        "Stick to well-lit roads.",
        "Avoid isolated shortcuts.",
        "Cross only at designated crossings.",
      ],
    },

    office: {
      title: "Office Fast Route",
      icon: "💼",
      tips: [
        "Leave 5 minutes earlier during peak hours.",
        "Use the fastest available road.",
        "Monitor weather before departure.",
      ],
    },
  };

  const selected =
    recommendations[travellerType] ??
    recommendations.office;
const aiTips: string[] = [...selected.tips];

// Temperature based
if (temperature >= 35) {
  aiTips.push("🥤 High temperatures expected. Carry plenty of water.");
  aiTips.push("🧴 Apply sunscreen and wear sunglasses.");
  aiTips.push(
    distance > 3
      ? "🚗 Prefer a vehicle instead of walking or cycling."
      : "🚶 Short walks are fine but avoid peak afternoon heat."
  );
}

if (temperature >= 25 && temperature < 35) {
  aiTips.push("😎 Pleasant weather for outdoor travel.");
  aiTips.push(
    distance < 5
      ? "🚴 Cycling is an eco-friendly option today."
      : "🚗 Driving can reduce travel time."
  );
}

if (temperature < 20) {
  aiTips.push("🧥 Carry a light jacket.");
}

if (temperature < 10) {
  aiTips.push("🧣 Wear warm clothing before travelling.");
}

// Rain
if (rain > 0) {
  aiTips.push("🌂 Carry an umbrella or raincoat.");
  aiTips.push("🚗 Prefer travelling by car or public transport.");
  aiTips.push("⚠ Drive carefully as roads may be slippery.");
}

// Long trips
if (distance > 100) {
  aiTips.push("⛽ Check fuel or battery level before departure.");
  aiTips.push("☕ Plan a short break every 2 hours.");
}

if (distance > 250) {
  aiTips.push("🍱 Carry snacks and drinking water.");
}

if (duration > 7200) {
  aiTips.push("📱 Keep your phone fully charged.");
}

// Eco suggestions
if (distance < 2) {
  aiTips.push("🌱 Walking is the healthiest and greenest choice.");
}

if (distance >= 2 && distance <= 8) {
  aiTips.push("🚴 Cycling offers a great balance of speed and sustainability.");
}

if (distance > 8 && distance < 30) {
  aiTips.push("🚌 Consider public transport to reduce emissions.");
}
  return (
    <div className="rounded-3xl bg-linear-to-br from-[#77B66E] to-[#2E7D32] text-white p-6 shadow-lg">

      <h2 className="text-2xl font-bold">
        🤖 EcoVia AI
      </h2>

      <p className="mt-2 text-green-100">
        Personalized journey insights
      </p>

      <div className="mt-5 bg-white/15 rounded-2xl p-5">

  <h3 className="font-semibold text-xl">
    {selected.icon} {selected.title}
  </h3>

  <div className="grid grid-cols-2 gap-4 mt-5">

    <div className="bg-white/10 rounded-xl p-3">
      <p className="text-sm text-green-100">
        Distance
      </p>

      <h3 className="text-2xl font-bold">
        {distance.toFixed(1)} km
      </h3>
    </div>

    <div className="bg-white/10 rounded-xl p-3">
      <p className="text-sm text-green-100">
        Duration
      </p>

      <h3 className="text-2xl font-bold">
        {Math.round(duration / 60)} min
      </h3>
    </div>

    <div className="bg-white/10 rounded-xl p-3">
      <p className="text-sm text-green-100">
        Temperature
      </p>

      <h3 className="text-2xl font-bold">
        {temperature}°C
      </h3>
    </div>

    <div className="bg-white/10 rounded-xl p-3">
      <p className="text-sm text-green-100">
        Rain
      </p>

      <h3 className="text-2xl font-bold">
        {rain > 0 ? "Yes" : "No"}
      </h3>
    </div>

  </div>

</div>

      <div className="mt-5">

        <h3 className="font-semibold">
          AI Suggestions
        </h3>

        <ul className="mt-3 space-y-3">

          {aiTips.map((tip, index) => (
            <li
              key={index}
              className="bg-white/15 rounded-xl p-3"
            >
              ✓ {tip}
            </li>
          ))}

        </ul>

      </div>

    </div>
  );
}