import { useEffect, useRef } from "react";
import L from "leaflet";

export default function FullMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);

  // Coordenadas precisas de El Roble, Mazatlán
  const elRobleCoords: [number, number] = [23.2456, -106.2058];

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Inicializar el mapa centrado en El Roble
      mapInstance.current = L.map(mapRef.current, {
        center: elRobleCoords,
        zoom: 15,       // Zoom cercano para solo la zona de El Roble
        zoomControl: true,
        attributionControl: false,
      });

      // Agregar capa de OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapInstance.current);

      // Opcional: marcador en El Roble
      L.marker(elRobleCoords).addTo(mapInstance.current)
        .bindPopup("El Roble, Mazatlán, Sinaloa")
        .openPopup();
    }

    // Cleanup al desmontar
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        height: "100vh",  // Ocupa toda la altura de la pantalla
        width: "100%",    // Ocupa todo el ancho disponible
      }}
    />
  );
}
