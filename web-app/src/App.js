import React, { useState, useEffect } from "react";

import "./styles/global/quadrant.sass";
import "./styles/global/text.sass";
import "./styles/global/dashboard.sass";

import Altitude from "./components/Altitude.js";
import AirTemperature from "./components/AirTemperature";
import Humidity from "./components/Humidity";
import Header from "./components/Header";
import Pressure from "./components/Pressure";

import socket from "./config/socket-io.js";


const App = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [humidity, setHumidity] = useState(0);

  useEffect(() => {
    socket.on("cansat-data", (data) => {
      const { seconds, temperature, humidity, pressure, altitude } = data;
      console.log(data);

      setTimeInSeconds(seconds);
      setTemperature(temperature);
      setPressure(pressure);
      setAltitude(altitude);
      setHumidity(humidity);
    });
  }, []);

  return (
    <div>
      <Header timeInSeconds={timeInSeconds} socket={socket} />

      <div className="quadrants-container">
        <Altitude value={altitude} />
        <AirTemperature value={temperature} />
        <Pressure value={pressure} />
        <Humidity value={humidity} />
      </div>
    </div>
  );
};

export default App;
