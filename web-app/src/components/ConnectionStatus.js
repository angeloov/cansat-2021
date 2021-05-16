import React from "react";

import "./ConnectionStatus.sass";

/* var ConnectionStatusVar = props => {true/false}; 

var Connectionestablished = "Cansat connected";
var ConnectioNotEstablished = "Cansat disconnected";

var print; 

if (ConnectionStatusVar == true){
  print = Connectionestablished;
}
else {
  print = ConnectioNotEstablished;
}
*/
function Status({ConnectionStatusVar}) {
  let isConnected = true;

  return <div id="ConnectionStatus">
    <img src=".../web-app/src/Image/can-icon.jpg"></img>
    /*
      <div id="Status">{{background-color: (isConnected ? "green" : "red")}}</div> 
    */
    
  </div>;
}

export default Status;
