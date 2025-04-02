import { createServer } from "http";
import type { Server, IncomingMessage, ServerResponse } from "http";
import { URL } from "url";

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
    this.server = createServer();
    this.listenForErrors();
    this.listenForRequests();
    this.server.listen(this.port);
    console.log(`[babyServer] Server listening on port ${this.port}.`);
  }

  stop = (): void => {
    this.server?.close();
    this.server?.closeAllConnections();
    console.log(`[babyServer] Server on port ${this.port} closed successfully.`);
  }

  listenForRequests = (): void => {
    this.server?.on('request', (req, res) => {
      if (!req.url) {
        res.statusCode = 400;
        res.end("No URL in request");
        return;
      };

      const parsedUrl = new URL(req.url, `http://localhost:${this.port}`);

      if (parsedUrl.pathname == "/get") {
        this.handleGetRequest(parsedUrl, req, res);
      } else if (parsedUrl.pathname == "/set") {
        this.handleSetRequest(parsedUrl, req, res);
      } else {
        res.statusCode = 404;
        res.end('No such method');
        return;
      }
    });
  }

  handleSetRequest = (
    url: URL,
    req: IncomingMessage,
    res: ServerResponse
  ): void => {
    console.log(`[babyServer] SET: ${url.searchParams}`);
    url.searchParams.forEach((value, key) => {
      this.memory.set(key, value);
    })

    res.statusCode = 200;
    res.end();
    return;
  }

  handleGetRequest = (
    url: URL,
    req: IncomingMessage,
    res: ServerResponse
  ): void => {
    console.log(`[babyServer] GET: ${url.searchParams}`);
    const key = url.searchParams.get('key');

    if (!key) {
      res.statusCode = 400;
      res.end('cant get');
      return;
    }

    const value = this.memory.get(key);

    if (!value) {
      res.statusCode = 404;
      res.end('Key not found');
      return;
    }

    res.statusCode = 200;
    res.end(value);
    return;
  }

  listenForErrors = (): void => {
    this.server?.on('error', (err) => {
      console.error(err);
      /**
       * TODO: More detailed errors -> name, msg, stack, code & context (request info, etc.)
       */
    })
  }
};