import { Server, Socket } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
  host: "redis-2d0adc2f-chat-app-nextjs.a.aivencloud.com",
  port: 24477,
  username: "default",
  password: "AVNS_KLEUwkoZCAroVBA4hqk",
});
const sub = new Redis({
  host: "redis-2d0adc2f-chat-app-nextjs.a.aivencloud.com",
  port: 24477,
  username: "default",
  password: "AVNS_KLEUwkoZCAroVBA4hqk",
});
class SocketService {
    private _io: Server;
  
    constructor() {
      console.log("Init Socket Service...");
      this._io = new Server({
        cors: {
          allowedHeaders: ["*"],
          origin: "*",
        },
      });
      sub.subscribe("MESSAGES");
    }
  
    public initListeners() {
      const io = this.io;
      console.log("Init Socket Listeners...");
  
      io.on("connect", (socket) => {
        console.log(`New Socket Connected`, socket.id);
        socket.on("event:message", async ({ message }: { message: string }) => {
          console.log("New Message Rec.", message);
          // publish this message to redis
          await pub.publish("MESSAGES", JSON.stringify({ message }));
        });
      });
  
      sub.on("message", (channel, message) => {
        if (channel === "MESSAGES") {
          console.log("new message from redis", message);
          io.emit("message", message);
        }
      });
    }
  
    get io() {
      return this._io;
    }
  }
  
  export default SocketService;