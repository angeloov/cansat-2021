import React from "react";

import "./AirTemperature.sass";

// <AirTemperature temperature="Valore" />

function AirTemperature(props) {
  return (
    <div id="air-temperature-comp">
      <span id="title-text">AirTemperature</span>
      <span id="title-text">{props.temperature}</span>
    </div>
  );
}

export default AirTemperature;
