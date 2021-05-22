import io from "socket.io-client";

const serverUrl = "http://localhost:5000";
const socket = io.connect(serverUrl);

export default socket;
