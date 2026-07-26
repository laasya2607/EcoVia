import { useEffect, useState } from "react";
import LocationSearch from "./LocationSearch";

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface SavedPlace {
  id: number;
  placeName: string;
  location: string;
  lat: number;
  lng: number;
}

export default function SavedPlaces() {
  const [placeName, setPlaceName] = useState("");

  const [locationText, setLocationText] = useState("");

  const [selectedLocation, setSelectedLocation] =
    useState<Location | null>(null);

  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("savedPlaces");

    if (data) {
      setSavedPlaces(JSON.parse(data));
    }
  }, []);

  
const savePlace = () => {
  if (!placeName || !selectedLocation) {
    alert("Please select a location.");
    return;
  }

  const newPlace: SavedPlace = {
    id: Date.now(),
    placeName,
    location: selectedLocation.name,
    lat: selectedLocation.lat,
    lng: selectedLocation.lng,
  };

  const updatedPlaces = [...savedPlaces, newPlace];

  console.log("Saving:", updatedPlaces);

  setSavedPlaces(updatedPlaces);

  localStorage.setItem(
    "savedPlaces",
    JSON.stringify(updatedPlaces)
  );

  setPlaceName("");
  setLocationText("");
  setSelectedLocation(null);
};
 

  const removePlace = (id: number) => {
  const updated = savedPlaces.filter((p) => p.id !== id);

  setSavedPlaces(updated);

  localStorage.setItem(
    "savedPlaces",
    JSON.stringify(updated)
  );
};

  return (
    <div className="bg-white rounded-3xl shadow-lg p-5">

      <h2 className="text-xl font-bold text-[#2E7D32] mb-5">
        ⭐ Saved Places
      </h2>

      <input
        placeholder="Place Name (Home, College...)"
        value={placeName}
        onChange={(e) => setPlaceName(e.target.value)}
        className="w-full mb-4 p-3 rounded-xl border outline-none"
      />

      <LocationSearch
        placeholder="Search Location"
        value={locationText}
        setValue={setLocationText}
        setLocation={setSelectedLocation}
      />

      <button
        onClick={savePlace}
        className="mt-4 w-full bg-[#2E7D32] text-white py-3 rounded-xl"
      >
        Save Place
      </button>

      <div className="mt-6 space-y-3">

        {savedPlaces.map((place) => (

          <div
            key={place.id}
            className="flex justify-between items-center bg-green-50 rounded-xl p-3"
          >
            <div>

              <p className="font-semibold">
                {place.placeName}
              </p>

              <p className="text-sm text-gray-500">
                {place.location}
              </p>

            </div>

            <button
              onClick={() => removePlace(place.id)}
              className="text-red-500"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}