import React, { useState, useEffect } from "react";

import "./Player.sass";
import playIcon from "../assets/images/play-icon.svg";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    // setInterval(() => {
    //   setCurrentIndex(currentIndex + 1);
    // }, 100);
  }, []);

  return (
    <div className="player-component">
      <button className="player-button" onClick={() => setIsPlaying(!isPlaying)}>
        <img src={playIcon} alt="Play icon" />
      </button>
    </div>
  );
}
