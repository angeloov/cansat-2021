import React from "react";

import "./LaunchTimer.sass";

function LaunchStatus({ isVisible, time }) {
  return (
    <div className="quadrant launch-status-component" style={{ opacity: isVisible ? 1 : 0 }}>
      <h1 className="header-subtitle">CanSat was launched! 🚀</h1>
      <h2 className="time header-subtitle">{time}</h2>
    </div>
  );
}

export default LaunchStatus;
