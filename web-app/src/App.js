import React from "react";

import "./styles/global/quadrant.sass";
import "./styles/global/text.sass";
import "./styles/global/dashboard.sass";

import Altitude from "./components/Altitude.js";
import AirTemperature from "./components/AirTemperature";
import Status from "./components/ConnectionStatus";
import LaunchStatus from "./components/LaunchStatus";
import Title from "./components/Title.js";
import Uv from "./components/Uv.js";
import Pressure from "./components/Pressure.js";

const App = () => {
  return (
    <div>
      <div className="quadrants-container">
        <Altitude value="20" />
        <AirTemperature value="30" />
        <Pressure value={20} />
        <Uv value={20} />
        {/* 
      <Status />

      <Title /> */}
      </div>
    </div>
  );
};

export default App;
