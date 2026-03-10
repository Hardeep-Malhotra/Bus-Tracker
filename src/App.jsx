import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";
import FindBus from "./pages/FindBus";
import BusList from "./pages/BusList";
import BusMap from "./pages/BusMap";

// Saari libraries yahan ek saath define karein
const libraries = ["places", "geometry"]; 

function App() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAewCJRQNQDkERaoKMStRfxVlJl6DWEepI",
    libraries,
  });

  // Jab tak load nahi hota, tab tak wait karein
  if (!isLoaded) return <div style={{color: "white", textAlign: "center", marginTop: "20%"}}>Loading Google Maps...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FindBus />} />
        <Route path="/bus-list" element={<BusList />} />
        <Route path="/bus-map" element={<BusMap />} />
      </Routes>
    </Router>
  );
}

export default App;