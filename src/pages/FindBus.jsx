


import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "@react-google-maps/api";

const FindBus = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pCoords, setPCoords] = useState(null);
  const [dCoords, setDCoords] = useState(null);

  const pickupRef = useRef(null);
  const destRef = useRef(null);
  const navigate = useNavigate();

  const onPickupChanged = () => {
    const place = pickupRef.current.getPlace();
    if (place?.geometry) {
      setPCoords([place.geometry.location.lat(), place.geometry.location.lng()]);
      setPickup(place.formatted_address);
    }
  };

  const onDestChanged = () => {
    const place = destRef.current.getPlace();
    if (place?.geometry) {
      setDCoords([place.geometry.location.lat(), place.geometry.location.lng()]);
      setDestination(place.formatted_address);
    }
  };

  const handleSearch = () => {
    if (pCoords && dCoords) {
      const buses = [{ 
        id: 1, 
        name: "ApexRide Express", 
        pCoords, 
        dCoords, 
        pickup, 
        destination 
      }];
      navigate("/bus-list", { state: { buses } });
    } else {
      alert("Bhai, pehle list se location select karo!");
    }
  };

  return (
    <div style={containerStyle}>
      {/* Background Glow Decor */}
      <div style={glowStyle}></div>

      <div style={cardStyle}>
        <h2 style={titleStyle}>Bus Khojein 🚌</h2>
        <p style={subtitleStyle}>Plan your journey in seconds</p>
        
        <div style={inputGroupStyle}>
          <label style={labelStyle}>📍 Pickup Point</label>
          <Autocomplete onLoad={(ref) => (pickupRef.current = ref)} onPlaceChanged={onPickupChanged}>
            <input 
              placeholder="Search pickup location..." 
              style={modernInputStyle} 
              value={pickup} 
              onChange={(e) => setPickup(e.target.value)} 
            />
          </Autocomplete>
        </div>

        <div style={{...inputGroupStyle, marginBottom: "30px"}}>
          <label style={labelStyle}>🏁 Destination</label>
          <Autocomplete onLoad={(ref) => (destRef.current = ref)} onPlaceChanged={onDestChanged}>
            <input 
              placeholder="Where to?" 
              style={modernInputStyle} 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)} 
            />
          </Autocomplete>
        </div>

        <button 
          onClick={handleSearch} 
          style={ctaButtonStyle}
          onMouseEnter={(e) => e.target.style.filter = "brightness(1.2)"}
          onMouseLeave={(e) => e.target.style.filter = "none"}
        >
          Find My Bus
        </button>
      </div>
    </div>
  );
};

// --- MODERN STYLES ---

const containerStyle = {
  padding: "40px 20px",
  textAlign: "center",
  background: "#0f172a", // Deep Navy Dark
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
};

const glowStyle = {
  position: "absolute",
  width: "300px",
  height: "300px",
  background: "radial-gradient(circle, rgba(26,115,232,0.15) 0%, rgba(15,23,42,0) 70%)",
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 0
};

const cardStyle = {
  background: "rgba(30, 41, 59, 0.7)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "40px 30px",
  borderRadius: "24px",
  width: "100%",
  maxWidth: "400px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  zIndex: 1
};

const titleStyle = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "800",
  margin: "0 0 8px 0",
  letterSpacing: "-0.5px"
};

const subtitleStyle = {
  color: "#94a3b8",
  fontSize: "14px",
  marginBottom: "35px"
};

const inputGroupStyle = {
  textAlign: "left",
  marginBottom: "20px",
};

const labelStyle = {
  display: "block",
  color: "#cbd5e1",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase",
  marginBottom: "8px",
  marginLeft: "4px"
};

const modernInputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#1e293b",
  color: "white",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.3s ease",
};

const ctaButtonStyle = {
  width: "100%",
  padding: "16px",
  background: "linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)",
  color: "white",
  border: "none",
  borderRadius: "14px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
  transition: "all 0.3s ease"
};

export default FindBus;