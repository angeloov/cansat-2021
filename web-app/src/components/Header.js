import React from "react";

import "./Header.sass";
import LaunchTimer from "./LaunchTimer";
import StartButton from "./StartButton";
import ConnectionStatus from "./ConnectionStatus";

const secondsToFormattedString = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

export default function Header({ timeInSeconds, socket }) {
  return (
    <header className="header-component">
      <div>
        <h1 className="header-title">CanDashboard</h1>
        <h2 className="header-subtitle">Oli 3AI Team</h2>
      </div>
      <LaunchTimer
        isVisible={true}
        time={secondsToFormattedString(timeInSeconds)}
      />

      <div className="left-container">
        <ConnectionStatus />
        <StartButton socket={socket} />
      </div>
    </header>
  );
}
