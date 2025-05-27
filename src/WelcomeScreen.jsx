import React, { useState } from "react";
import CustomCursor from "./CustomCursor";

const WelcomeScreen = ({ children }) => {
  const [revealed, setRevealed] = useState(false);

  const handleDoubleClick = () => {
    setRevealed(true);
  };

  return (
    <div onDoubleClick={handleDoubleClick} style={{ position: "relative" }}>
      <CustomCursor color="#00FFFF" size={14} torchMode={!revealed} />

      {!revealed && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "black",
            color: "#00FFFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            zIndex: 9996,
          }}
        >
          <div>Welcome</div>
          <div style={{ fontSize: "1rem", marginTop: "1rem" }}>
            Double-click to reveal
          </div>
        </div>
      )}

      <div
        style={{
          opacity: revealed ? 1 : 0,
          pointerEvents: revealed ? "auto" : "none",
          transition: "opacity 1s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default WelcomeScreen;
