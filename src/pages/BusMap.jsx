


// import React, { useState, useEffect } from "react";
// import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
// import { useLocation } from "react-router-dom";

// const containerStyle = { width: "100vw", height: "100vh" };

// const BusMap = () => {
//   const location = useLocation();
//   const bus = location.state?.bus;
  
//   const [directions, setDirections] = useState(null);
//   const [distance, setDistance] = useState("Loading...");
//   const [duration, setDuration] = useState("...");

//   useEffect(() => {
//     console.log("1. UseEffect Triggered"); // Debug Log 1
//     console.log("2. Bus Data from State:", bus); // Debug Log 2

//     if (bus && bus.pCoords && bus.dCoords && window.google) {
//       console.log("3. Google Object and Coords are Ready"); // Debug Log 3
      
//       const directionsService = new window.google.maps.DirectionsService();
      
//       directionsService.route(
//         {
//           origin: { lat: Number(bus.pCoords[0]), lng: Number(bus.pCoords[1]) },
//           destination: { lat: Number(bus.dCoords[0]), lng: Number(bus.dCoords[1]) },
//           travelMode: window.google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           console.log("4. API Response Status:", status); // Debug Log 4
          
//           if (status === "OK") {
//             console.log("5. Full API Result:", result); // Debug Log 5
            
//             const routeLeg = result.routes[0].legs[0];
//             console.log("6. Distance:", routeLeg.distance.text); // Debug Log 6
//             console.log("7. Duration:", routeLeg.duration.text); // Debug Log 7

//             setDirections(result);
//             setDistance(routeLeg.distance.text); 
//             setDuration(routeLeg.duration.text);
//           } else {
//             console.error("8. Route calculation failed due to " + status);
//           }
//         }
//       );
//     } else {
//       console.log("9. Waiting for Google Maps or Bus Data..."); // Debug Log 9
//     }
//   }, [bus]);

//   if (!bus) return <div style={{padding: "20px", color: "white"}}>No bus data found in state!</div>;

//   return (
//     <div style={{ position: "relative", height: "100vh", width: "100vw", background: "#242424" }}>
//       {/* Overlay Box */}
//       <div style={{
//         position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)",
//         zIndex: 1000, background: "white", padding: "12px 25px", borderRadius: "30px",
//         boxShadow: "0 4px 15px rgba(0,0,0,0.5)", display: "flex", gap: "10px", 
//         fontWeight: "bold", alignItems: "center", minWidth: "220px", justifyContent: "center"
//       }}>
//         <span style={{color: "#ea4335"}}>📍</span> 
//         <span style={{color: "black"}}>{distance}</span> 
//         <span style={{color: "#ccc", margin: "0 5px"}}>|</span>
//         <span style={{color: "#4285f4"}}>🕒</span> 
//         <span style={{color: "black"}}>{duration}</span>
//       </div>

//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={{ lat: Number(bus.pCoords[0]), lng: Number(bus.pCoords[1]) }}
//         zoom={13}
//         options={{ disableDefaultUI: true, zoomControl: true }}
//       >
//         {directions && <DirectionsRenderer directions={directions} />}
//       </GoogleMap>
//     </div>
//   );
// };

// export default BusMap;


// import React, { useState, useEffect } from "react";
// import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
// import { useLocation } from "react-router-dom";

// const containerStyle = { width: "100vw", height: "100vh" };

// const BusMap = () => {
//   const location = useLocation();
//   const bus = location.state?.bus;

//   const [userPos, setUserPos] = useState(null); // User A ki live position
//   const [busPos, setBusPos] = useState(null);   // User B (Bus) ki position
//   const [directions, setDirections] = useState(null);

//   useEffect(() => {
//     if (bus && window.google) {
//       // 1. Initial positions set karein
//       const initialPos = { lat: Number(bus.pCoords[0]), lng: Number(bus.pCoords[1]) };
//       setUserPos(initialPos);
//       setBusPos(initialPos);

//       // 2. User A ko Real-time Track karein (Mobile leke chaloge toh ye move hoga)
//       const watchId = navigator.geolocation.watchPosition(
//         (pos) => {
//           const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//           console.log("User A Moved:", newPos); // Console mein check karein
//           setUserPos(newPos);
//         },
//         (err) => console.error("Tracking Error:", err),
//         { enableHighAccuracy: true, distanceFilter: 10 } // Thoda bhi hilne pe update hoga
//       );

//       // 3. User B (Bus) Simulation - Testing ke liye
//       const busInterval = setInterval(() => {
//         setBusPos((prev) => ({
//           lat: prev.lat + 0.00005, // Bus ko slowly move karein
//           lng: prev.lng + 0.00005,
//         }));
//       }, 2000);

//       return () => {
//         navigator.geolocation.clearWatch(watchId);
//         clearInterval(busInterval);
//       };
//     }
//   }, [bus]);

//   return (
//     <div style={{ height: "100vh", width: "100vw" }}>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={userPos || { lat: 30.15, lng: 77.29 }} // Default center
//         zoom={15}
//       >
//         {/* User A Marker - Aap jahan jaoge ye wahan jayega */}
//         {userPos && (
//           <Marker 
//             position={userPos} 
//             label="A (Me)" 
//             icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" 
//           />
//         )}

//         {/* User B Marker - Bus/Friend ki position */}
//         {busPos && (
//           <Marker 
//             position={busPos} 
//             label="B (Bus)" 
//             icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png" 
//           />
//         )}
//       </GoogleMap>
//     </div>
//   );
// };

// export default BusMap;

import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useLocation } from "react-router-dom";

const containerStyle = { width: "100vw", height: "100vh" };

const BusMap = () => {
  const location = useLocation();
  const bus = location.state?.bus;

  const [userPos, setUserPos] = useState(null);
  const [busPos, setBusPos] = useState(null);
  const [directions, setDirections] = useState(null); // Ye state line banayegi

  useEffect(() => {
    if (bus && window.google) {
      const origin = { lat: Number(bus.pCoords[0]), lng: Number(bus.pCoords[1]) };
      const destination = { lat: Number(bus.dCoords[0]), lng: Number(bus.dCoords[1]) };

      setUserPos(origin);
      setBusPos(origin);

      // --- TRACK (BLUE LINE) LOGIC ---
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result); // Yahan result set hote hi track ban jayega
          } else {
            console.error("Directions error:", status);
          }
        }
      );

      // Live Tracking
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setUserPos(newPos);
        },
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [bus]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userPos || { lat: 30.15, lng: 77.29 }}
        zoom={14}
      >
        {/* YE COMPONENT TRACK DIKHAYEGA */}
        {directions && (
          <DirectionsRenderer 
            directions={directions} 
            options={{ suppressMarkers: true }} // Taaki default markers hamare markers se na takrayein
          />
        )}

        {userPos && <Marker position={userPos} label="A" />}
        {busPos && <Marker position={busPos} label="B" />}
      </GoogleMap>
    </div>
  );
};

export default BusMap;