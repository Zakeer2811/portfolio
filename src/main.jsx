// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import DarkRoom from "./DarkRoom.jsx";
import CustomCursor from "./CustomCursor.jsx"; // Import the standalone cursor
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error(
    "Root element not found. Make sure there's a <div id='root'></div> in your index.html."
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* Show regular cursor globally */}
    <CustomCursor color="#00FFFF" size={14} />

    {/* DarkRoom will override cursor when active */}
    <DarkRoom>
      <App />
    </DarkRoom>
  </React.StrictMode>
);
