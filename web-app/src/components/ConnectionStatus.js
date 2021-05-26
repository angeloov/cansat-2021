import React from "react";

import "./ConnectionStatus.sass";
import CanIcon from "../assets/images/can-icon.svg";

function Status({ ConnectionStatusVar }) {
  let isConnected = true;

  return (
    <div id="ConnectionStatus">
      <img src={CanIcon} id="Image" />
      <div className="status" style={{ backgroundColor: isConnected ? "green" : "red" }}></div>
      <p id="Text">CanSat Connected</p>
    </div>
  );
}

export default Status;
