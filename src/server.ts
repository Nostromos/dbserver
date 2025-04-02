import * as http from "http";
import type { Server } from "http";

const PORT = 4000;

export default class babyServer {
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
    this.listenForErrors();
    this.listenForRequests();
    this.server.listen(this.port);
    console.log(`[babyServer] Server listening on port ${this.port}.`)
  }

  stop = (): void => {
    this.server?.close();
    this.server?.closeAllConnections();
    console.log(`[babyServer] Server on port ${this.port} closed successfully.`)
  }

  listenForRequests = (): void => {
    console.log(`[babyServer] Listening for requests...`);
    this.server?.on('request', (req, res) => {
      console.log(`[babyServer] Incoming Request:`)
      console.log(req.headers)
      console.log(req.url)
      // parse requests

      // call the right method

      // return a response
    })
  }

  handleSetRequest = (): void => {
    console.log(`[babyServer] SET Request received: /* ADD REQ PARAMS */`)
  }

  handleGetRequest = (): void => {
    console.log(`[babyServer] GET Request received: /* ADD REQ PARAMS */`)
  }

  listenForErrors = (): void => {
    console.log(`[babyServer] Listening for errors...`);
  }
};