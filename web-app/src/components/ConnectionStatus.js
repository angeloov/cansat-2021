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
  return <div id="ConnectionStatus">
    <span id="Status">{/*print*/}</span>
  </div>;
}

export default Status;
