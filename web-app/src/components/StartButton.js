import React from "react";

import "./StartButton.sass";
import socket from "../config/socket-io.js";

export default function StartButton() {
  const startReceivingDataFromServer = () => {
    socket.emit("start-receiving-data");
  };

  return (
    <div className="start-button-component">
      <button onClick={startReceivingDataFromServer}>
        Start receiving data
      </button>
    </div>
  );
}
