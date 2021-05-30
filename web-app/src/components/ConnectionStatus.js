import React from "react";

import "./ConnectionStatus.sass";
import CanIcon from "../assets/images/can-icon.svg";

function Status({ isConnected }) {
  return (
    <div id="ConnectionStatus">
      <img src={CanIcon} id="Image" />

      <div className="status" style={{ backgroundColor: isConnected ? "green" : "red" }}></div>
      <p id="Text">CanSat {isConnected ? " connected" : " disconnected"}</p>
    </div>
  );
}

export default Status;
