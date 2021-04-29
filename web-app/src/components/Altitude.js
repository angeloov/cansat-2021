import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

import "./Altitude.sass";

function Altitude({ value }) {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState({});

  let config = {
    options: {
      chart: {
        id: "apexchart-example",
        foreColor: "#0D1E39",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 1,
          opacityFrom: 0.7,
          inverseColors: true,

          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
  };

  return (
    <div className="altitude-quadrant">
      <span className="altitude-top">
        <h1 className="title-text altitude-title">Altitude</h1>
        <h1 className="value-text">{value + " m"}</h1>
      </span>
      <Chart
        options={config.options}
        series={config.series}
        type="area"
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
}

export default Altitude;
