import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

function MapRecenter({ pos }) {
  const map = useMap();
  useEffect(() => { if (pos) map.setView(pos, 16); }, [pos]);
  return null;
}

const LiveTracking = () => {
  const [myPos, setMyPos] = useState(null);

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      (p) => setMyPos([p.coords.latitude, p.coords.longitude]),
      (err) => console.log(err),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  if (!myPos) return <div>GPS Access Karein...</div>;

  return (
    <div style={{ height: "100vh", width: "100vw", position: "absolute", top: 0, left: 0 }}>
      <MapContainer center={myPos} zoom={15} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={myPos} />
        <MapRecenter pos={myPos} />
      </MapContainer>
    </div>
  );
};

export default LiveTracking;