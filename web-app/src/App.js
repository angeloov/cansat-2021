import React from "react";

import Altitude from "./components/Altitude.js";
import AirTemperature from "./components/AirTemperature";
import Status from "./components/ConnectionStatus";
import LaunchStatus from "./components/LaunchStatus";
import Title from "./components/Title.js";
import UvFn from "./components/Uv.js";
import PressureFn from "./components/Pressure.js";

const App = () => {
  return (
    <div>
      <Altitude />
      <AirTemperature temperature="" />
      <Status />

      <Title />
      <PressureFn />
      <UvFn />
    </div>
  );
};

export default App;
