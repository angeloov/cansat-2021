import React, { useEffect } from "react";

import "./styles/global/quadrant.sass";
import "./styles/global/text.sass";
import "./styles/global/dashboard.sass";

import Altitude from "./components/Altitude.js";
import AirTemperature from "./components/AirTemperature";
import Uv from "./components/Uv";
import Header from "./components/Header";
import Pressure from "./components/Pressure";

import socket from "./config/socket-io.js";
// import axios from "axios";

const App = () => {
  useEffect(() => {
    socket.on("cansat-data", data => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      <Header />

      <div className="quadrants-container">
        <Altitude value="20" />
        <AirTemperature value="30" />
        <Pressure value={20} />
        <Uv value={20} />
      </div>
    </div>
  );
};

export default App;
