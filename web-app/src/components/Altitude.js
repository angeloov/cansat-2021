import React, { useState, useEffect } from "react";
import { Line, defaults } from "react-chartjs-2";

import "./Altitude.sass";

function Altitude({ value }) {
  defaults.color = "#FAFAFA"; // color of the axes

  const datapoints = [0, 20, 20, 60, 60, 120, 10, 180, 120, 125, 105, 110, 170];
  const labels = [];
  for (let i = 0; i < datapoints.length; ++i) {
    labels.push(i.toString());
  }
  const data = {
    labels: labels,
    datasets: [
      {
        data: datapoints,
        backgroundColor: "#ffffff0f",
        borderColor: "#FAFAFA",
        fill: true,
        cubicInterpolationMode: "monotone",
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
  };

  return (
    <div className="altitude-quadrant">
      <span className="altitude-top">
        <h1 className="title-text altitude-title">Altitude</h1>
        <h1 className="value-text">{value + " m"}</h1>
      </span>
      <Line data={data} options={options} width="450" height="250" />
    </div>
  );
}

export default Altitude;
