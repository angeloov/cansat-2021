import React, { useEffect } from "react";

import "./styles/global/quadrant.sass";
import "./styles/global/text.sass";
import "./styles/global/dashboard.sass";

import Altitude from "./components/Altitude.js";
import AirTemperature from "./components/AirTemperature";
import Status from "./components/ConnectionStatus";
import LaunchStatus from "./components/LaunchStatus";
import Uv from "./components/Uv";
import Header from "./components/Header";
import Pressure from "./components/Pressure";

import io from "socket.io-client";
import axios from "axios";

const App = () => {
  const socket = io.connect("http://localhost:5000");

  const startReceivingDataFromServer = () => {
    socket.emit("start-receiving-data");
  };

  useEffect(() => {
    socket.on("cansat-data", data => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      <Header />

      <div className="quadrants-container">
        <button onClick={startReceivingDataFromServer}>Start receiving data</button>
        <Altitude value="20" />
        <AirTemperature value="30" />
        <Pressure value={20} />
        <Uv value={20} />
        <Status />
        <LaunchStatus ConnectionStatusVar={true} />
      </div>
    </div>
  );
};

export default App;
