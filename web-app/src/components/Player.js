import React, { useState } from "react";

import "./Player.sass";
import playIcon from "../assets/images/play-icon.svg";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const maxSliderValue = 60 * 10;

  const handleChange = event => {
    setSliderValue(event.target.value);
  };

  return (
    <div className="player-component">
      <input
        className="player-slider"
        type="range"
        min="0"
        max={maxSliderValue}
        value={sliderValue}
        onChange={handleChange}
        step="1"
      />

      <button className="player-button" onClick={() => setIsPlaying(!isPlaying)}>
        <img src={playIcon} alt="Play icon" />
      </button>
    </div>
  );
}
