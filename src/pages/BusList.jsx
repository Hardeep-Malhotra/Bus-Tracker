
import { useLocation, useNavigate } from "react-router-dom";

const BusList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const buses = location.state?.buses || [];

  // Container Styles
  const containerStyle = {
    padding: "20px",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
  };

  const headerStyle = {
    textAlign: "center",
    color: "#1a202c",
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "25px",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    padding: "20px",
    marginBottom: "15px",
    cursor: "pointer",
    borderRadius: "16px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const badgeStyle = {
    background: "#e3f2fd",
    color: "#1a73e8",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    width: "fit-content",
    marginBottom: "5px",
  };

  const emptyStateStyle = {
    textAlign: "center",
    marginTop: "50px",
    padding: "30px",
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  };

  const buttonStyle = {
    background: "#1a73e8",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "15px",
    width: "100%",
    maxWidth: "200px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Available Rides 🚌</h2>

      {buses.length === 0 ? (
        <div style={emptyStateStyle}>
          <p style={{ color: "#666", fontSize: "18px" }}>
            Koi bus nahi mili. Wapas jaakar search karein.
          </p>
          <button style={buttonStyle} onClick={() => navigate("/")}>
            Peeche Jayein
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          {buses.map((bus) => (
            <div
              key={bus.id}
              onClick={() => navigate("/bus-map", { state: { bus } })}
              style={cardStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.05)";
              }}
            >
              <span style={badgeStyle}>Live Tracking Enabled</span>
              <h3 style={{ margin: "0", color: "#2d3436", fontSize: "20px" }}>
                {bus.name}
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#636e72" }}>
                <span style={{ fontWeight: "600" }}>{bus.pickup}</span>
                <span style={{ color: "#1a73e8" }}>➔</span>
                <span style={{ fontWeight: "600" }}>{bus.destination}</span>
              </div>
              <p style={{ fontSize: "13px", color: "#b2bec3", margin: "5px 0 0 0" }}>
                Tap to view live location on map
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusList;