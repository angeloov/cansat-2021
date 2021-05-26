import React from "react";

import "./Header.sass";
import LaunchTimer from "./LaunchTimer";
import StartButton from "./StartButton";
import ConnectionStatus from "./ConnectionStatus";

export default function Header() {
  return (
    <header className="header-component">
      <div>
        <h1 className="header-title">CanDashboard</h1>
        <h2 className="header-subtitle">Oli 3AI Team</h2>
      </div>
      <LaunchTimer isVisible={true} time={"0:12"} />

      <div className="left-container">
        <ConnectionStatus />
        <StartButton />
      </div>
    </header>
  );
}
