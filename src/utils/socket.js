import { io } from "socket.io-client"
const BASE_URL = "http://localhost:5000"
// const BASE_URL = "https://blog-backend-4y52.onrender.com"
const socket = io(BASE_URL, {
  transports: ["websocket"],
})

export default socket
