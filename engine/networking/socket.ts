import type { WebSocket as WsWebSocket } from "ws";

type SocketType = {
  id: string;
  name: string;
  room: string;
  socket: WsWebSocket;
  getId: () => string;
  getName: () => string;
  setName: (name: string) => void;
  getRoom: () => string;
};

export class Socket<T extends SocketType> {
  private socket: WsWebSocket;
  private id: string;
  private name: string;
  private room: string;
  constructor(socket: WsWebSocket, id: string, name: string, room: string) {
    this.socket = socket;
    this.id = id;
    this.name = name;
    this.room = room;
  }
  getName() {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }
  getRoom() {
    return this.room;
  }
  getId() {
    return this.id;
  }
  getConnection() {
    return this.socket.on("open", () => {
      console.log(
        `Connection established with socket ${this.id} in room ${this.room}`
      );
    });
  }
  getMessage(callback: (data: { type: string; direction: string }) => void) {
    this.socket.on("message", (data) => {
      const parsed = JSON.parse(data.toString("utf-8"));
      console.log(`Received: ${parsed}`);
      callback(parsed);
    });
  }
  sendMovementMessage(message: { type: string; direction: string }) {
    let movement = 0;
    switch (message.direction) {
      case "up":
        movement = 10;
        break;
      case "down":
        movement = -10;
        break;
      case "ArrowLeft":
        movement = -10;
        break;
      case "ArrowRight":
        movement = 10;
        break;
      default:
        this.socket.send(
          JSON.stringify({
            error: "Improper direction provided. direction is not valid",
          })
        );
        return;
    }

    this.socket.send(JSON.stringify({ type: "move", movement }));
  }
  closeSocket() {
    return this.socket.on("close", () => {
      console.log(`Connection of ${this.id} closed`);
    });
  }
}

export class SocketManager<T extends SocketType> {
  private sockets: Socket<SocketType>[] = [];
  private rooms: Map<string, Socket<SocketType>[]> = new Map();
  constructor() {
    this.sockets = [];
    this.rooms = new Map();
  }
  addSocket(socket: Socket<SocketType>) {
    this.sockets.push(socket);
  }
  removeSocket(socket: Socket<SocketType>) {
    this.sockets = this.sockets.filter((s) => s.getId() !== socket.getId());
  }
  addRoom(room: string) {
    this.rooms.set(room, []);
  }
  removeRoom(room: string) {
    this.rooms.delete(room);
  }
  getSocket(id: string) {
    return this.sockets.find((s) => s.getId() === id);
  }
  getRoom(room: string) {
    return this.rooms.get(room);
  }
}
