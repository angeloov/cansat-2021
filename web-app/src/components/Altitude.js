import React, { useState, useEffect } from "react";
import { Line, defaults } from "react-chartjs-2";

import "./Altitude.sass";

function Altitude({ value }) {
  const [altitudeDatapoints, setAltitudeDatapoints] = useState([]);
  const [labels, setLabels] = useState([]);
  const [newValueIndex, setNewValueIndex] = useState(0);

  defaults.color = "#FAFAFA"; // color of the axes

  const data = {
    labels: labels,
    datasets: [
      {
        data: altitudeDatapoints,
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

  useEffect(() => {
    setAltitudeDatapoints(altitudeDatapoints.concat([value]));
    setLabels(labels.concat([newValueIndex]));
    setNewValueIndex(newValueIndex + 1);
  }, [value]);

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
