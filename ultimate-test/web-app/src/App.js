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
  const [serverIsConnected, setServerIsConnected] = useState(false);

  useEffect(() => {
    socket.emit("replay-data");

    socket.on("cansat-data", data => {
      const { seconds, temperatura, umidita, pressione, altitudine, isConnected } = data;
      console.log(data);

      setTimeInSeconds(seconds);
      setTemperature(temperatura);
      setPressure(pressione);
      setAltitude(altitudine);
      setHumidity(umidita);
      setServerIsConnected(isConnected);
    });
  }, []);

  return (
    <div>
      <Header timeInSeconds={timeInSeconds} isConnected={serverIsConnected} />

      <div className="quadrants-container">
        {/* <Altitude value={altitude} /> */}
        <AirTemperature value={temperature} />
        <Pressure value={pressure} />
        <Humidity value={humidity} />
      </div>
    </div>
  );
};

export default App;
