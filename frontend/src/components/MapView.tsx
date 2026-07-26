import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface MapViewProps {
  source: Location | null;
  destination: Location | null;
  routePath: [number, number][];
}

function FitBounds({
  source,
  destination,
  routePath,
}: MapViewProps) {
  const map = useMap();

  useEffect(() => {
    // Force Leaflet to recalculate map size
    setTimeout(() => {
      map.invalidateSize();

      if (routePath.length > 0) {
        map.fitBounds(routePath, {
          padding: [50, 50],
          animate: true,
        });
      } else if (source && destination) {
        map.fitBounds(
          [
            [source.lat, source.lng],
            [destination.lat, destination.lng],
          ],
          {
            padding: [50, 50],
            animate: true,
          }
        );
      } else if (source) {
        map.setView([source.lat, source.lng], 15);
      }
    }, 100);
  }, [map, source, destination, routePath]);

  return null;
}

export default function MapView({
  source,
  destination,
  routePath,
}: MapViewProps) {
  return (
    <MapContainer
      center={[17.385, 78.4867]}
      zoom={13}
      className="h-full w-full rounded-3xl"
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <FitBounds
        source={source}
        destination={destination}
        routePath={routePath}
      />

      {source && (
        <Marker
          position={[source.lat, source.lng]}
        />
      )}

      {destination && (
        <Marker
          position={[destination.lat, destination.lng]}
        />
      )}

      {routePath.length > 0 && (
        <Polyline
          positions={routePath}
          pathOptions={{
            color: "#2E7D32",
            weight: 6,
          }}
        />
      )}
    </MapContainer>
  );
}