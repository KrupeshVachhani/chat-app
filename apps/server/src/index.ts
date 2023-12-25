import http from "http";
import SocketService from "./services/socket";

async function init() {
  const httpServer = http.createServer();
  const socketService = new SocketService();

  const PORT = process.env.PORT ? process.env.PORT : 8000;

  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  socketService.initListeners();
}

init();
