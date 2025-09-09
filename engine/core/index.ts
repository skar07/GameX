import { WebSocketServer } from "ws";
import "dotenv/config"
import path from "path";
import { fileURLToPath } from "url";
import { Socket, SocketManager } from "../networking/index.js";
import express from "express";

const app = express();
const PORT =  8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.use(
//     "/",
//     express.static(path.join(__dirname, "../../renderer-dist"), { index: "index.html" })
//   );


  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });
  
  app.get('/api/game-state', (req, res) => {
    res.json({ players: `none` });
  });


const server = app.listen(PORT, () => {
    console.log(`Game server running on ${PORT}`);
});
const wss = new WebSocketServer({server})
const socketManager = new SocketManager();

wss.on("connection", (ws) => {
    const id = Math.random().toString();
    const socket = new Socket(ws, id, "Anonymous", "room1");
    socketManager.addSocket(socket);
    socket.getMessage((data:any) => {
        if(data.type === "move"){
            socket.sendMovementMessage(data)
        } else {
            throw Error(`Type of event is incorrect. Event is not a movement type.`)
        }
    })
})

const TICK_RATE = 1000/60;

setInterval(() => {
    
}, TICK_RATE)

