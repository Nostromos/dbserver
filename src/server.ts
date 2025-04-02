import * as http from "http";
import type { Server } from "http";

const PORT = 4000;

// Create the server
const server = http.createServer();

// Listen to requests
server.listen(PORT);

class babyServer {
  port: number;
  memory: Map<string, string>;
  server: Server | null;

  constructor(port = 4000) {
    this.port = port;
    this.memory = new Map();
    this.server = null;
  }

  start = (): void => {
    this.server = http.createServer();
    this.server.listen(this.port);
    console.log(`[babyServer] Server started and listening on port ${this.port}.`)
  }

  stop = (): void => {
    this.server?.close();
    this.server?.closeAllConnections();
    console.log(`[babyServer] Server on port ${this.port} closed successfully.`)
  }
}