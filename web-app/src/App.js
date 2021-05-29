import React, { useState, useEffect } from "react";

import "./styles/global/quadrant.sass";
import "./styles/global/text.sass";
import "./styles/global/dashboard.sass";

import Altitude from "./components/Altitude.js";
import AirTemperature from "./components/AirTemperature";
import Humidity from "./components/Humidity";
import Header from "./components/Header";
import Pressure from "./components/Pressure";

import Player from "./components/Player";

import socket from "./config/socket-io.js";

class CansatDataUnit {
  constructor(data) {
    const { seconds, temperatura, umidita, pressione, altitudine } = data;

    this.seconds = seconds;
    this.temperature = temperatura;
    this.humidity = umidita;
    this.pressure = pressione;
    this.altitude = altitudine;
  }
}

const App = () => {
  const [dataHistory, setDataHistory] = useState([]);

  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const getDataHistoryItem = index => {
    return dataHistory[index];
  };

  useEffect(() => {
    socket.emit("replay-data");

    socket.on("cansat-data", data => {
      const currDataUnit = new CansatDataUnit(data);
      setDataHistory(dataHistory.concat([currDataUnit]));
    });
  }, []);

  return (
    <div>
      <Header timeInSeconds={timeInSeconds} />

      <div className="quadrants-container">
        <Altitude value={altitude} />
        <AirTemperature value={temperature} />
        <Pressure value={pressure} />
        <Humidity value={humidity} />

        <Player />
      </div>
    </div>
  );
};

export default App;
