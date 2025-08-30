"use client"; // Esto también debe ir aquí

import FullMap from "../../components/FullMap";

export default function MyPage() {
  const coords: [number, number] = [23.24544, -106.20574];

  return (
    <div>
      <h1>Mi Mapa</h1>
      <FullMap coordinates={coords} />
    </div>
  );
}
