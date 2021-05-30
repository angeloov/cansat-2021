import React, { useState, useEffect } from "react";
import { Line, defaults } from "react-chartjs-2";

function AirTemperature({ value }) {
  
  return (
    <div className="quadrant">
      <h1 className="title-text">Air Temperature</h1>
      <h1 className="value-text">{value + " °C"}</h1>
    </div>
  );
}

export default AirTemperature;
