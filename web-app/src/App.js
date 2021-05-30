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

import { useDispatch, useSelector } from "react-redux";
import { populateCansatState } from "./redux/slices/cansatDataSlice.js";

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
  const dispatch = useDispatch();

  // const getDataHistoryItem = index => {
  //   return dataHistory[index]; // to do
  // };

  useSelector(state => console.log(state.cansat));

  useEffect(() => {
    socket.emit("replay-data");

    socket.on("cansat-data", data => {
      setInterval(() => {
        const currDataUnit = new CansatDataUnit(data);

        dispatch(
          populateCansatState({
            ...currDataUnit,
          })
        );
      });
    });
  }, []);

  return (
    <div>
      <Header timeInSeconds={useSelector(state => state.cansat.seconds)} />

      <div className="quadrants-container">
        <Altitude value={useSelector(state => state.cansat.altitude)} />
        <AirTemperature value={useSelector(state => state.cansat.temperature)} />
        <Pressure value={useSelector(state => state.cansat.pressure)} />
        <Humidity value={useSelector(state => state.cansat.humidity)} />

        <Player />
      </div>
    </div>
  );
};

export default App;
