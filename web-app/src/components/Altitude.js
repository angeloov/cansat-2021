import React, { useState, useEffect } from "react";
import { Line, defaults } from "react-chartjs-2";

import "./Altitude.sass";

import { useSelector, useDispatch } from "react-redux";
import { populateCansatState } from "../redux/slices/cansatDataSlice.js";

function Altitude({ value }) {
  const dispatch = useDispatch();
  const altitudeDatapoints = useSelector(state => state.cansat.altitudeDatapoints);
  const labels = useSelector(state => state.cansat.labels);

  const [newValueIndex, setNewValueIndex] = useState(0);

  defaults.color = "#FAFAFA"; // color of the axes

  const data = {
    labels: labels,
    datasets: [
      {
        data: altitudeDatapoints,
        backgroundColor: "#ffff0f",
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

  const newAltitudeDatapoints = altitudeDatapoints.concat([altitudeDatapoints]);
  dispatch(
    populateCansatState({
      altitudeDatapoints: newAltitudeDatapoints,
    })
  );

  useEffect(() => {
    // setLabels(labels.concat([newValueIndex]));
    setNewValueIndex(newValueIndex + 1);
  }, []);

  return (
    <div className="altitude-quadrant quadrant">
      <span className="altitude-top">
        <h1 className="title-text altitude-title">Altitude</h1>
        <h1 className="value-text">{value + " m"}</h1>
      </span>
      <Line data={data} options={options} width="450" height="250" />
    </div>
  );
}

export default Altitude;
