import React from "react";

import "./ConnectionStatus.sass";
import CanIcon from "../assets/images/can-icon.jpg";

function Status({ ConnectionStatusVar }) {
  let isConnected = true;

  return (
    <div id="ConnectionStatus">
      <img src={CanIcon} />

      <div id="Status" style={{ backgroundColor: isConnected ? "green" : "red" }}></div>
    </div>
  );
}

export default Status;
