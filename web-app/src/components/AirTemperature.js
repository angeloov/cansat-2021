import React from "react";

import "./AirTemperature.sass";

// <AirTemperature temperature="Valore" />

function AirTemperature(props) {
  return (
    <div class="air-temperature-comp">
      <h1 class="title-text">AirTemperature</h1>
      <h1 class="title-text">{props.temperature}</h1>
    </div>
  );
}

export default AirTemperature;
