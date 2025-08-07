import { WebSocketServer } from "ws";

import { Socket, SocketManager } from "./socket";
import { ExitStatus } from "typescript";

const wss = new WebSocketServer({port: 8080})
const socketManager = new SocketManager();

wss.on("connection", (ws) => {
    const id = Math.random().toString();
    const socket = new Socket(ws, id, "Anonymous", "room1");
    socketManager.addSocket(socket);
    socket.getMessage((data) => {
        if(data.type === "move"){
            socket.sendMovementMessage(data)
        } else {
            throw Error(`Type of event is incorrect. Event is not a movement type.`)
        }
    })
})

const TICK_RATE = 100/60;

setInterval(() => {
    
}, TICK_RATE)

