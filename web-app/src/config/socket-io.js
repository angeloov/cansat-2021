import io from "socket.io-client";

const serverUrl = "http://localhost:5000";
const socket = io.connect(serverUrl);

socket.on("connect", () => {
  console.log("server connesso");
});

export default socket;
