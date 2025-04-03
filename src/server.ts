import { createServer } from "http";
import type { Server, IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import { writeFile as fsWriteFile, readFile as fsReadFile } from "fs/promises"

export default class babyServer {
  port: number;
  memory: Map<string, string>;
  server: Server | null;
  filePath: string;

  constructor(port = 4000) {
    this.port = port;
    this.memory = new Map();
    this.server = null;
    this.filePath = './src/file.json';
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

      if (parsedUrl.pathname == "/get") { // this should be done by checking that req.method is get
        this.handleGetRequest(parsedUrl, req, res);
      } else if (parsedUrl.pathname == "/set") { // this should be done by checking that req.method is set
        this.handleSetRequest(parsedUrl, req, res);
      } else {
        res.statusCode = 405;
        res.end('No such method');
      }
    });
  }

  handleSetRequest = async (
    url: URL,
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> => {
    try {
      console.log(`[babyServer] SET: ${url.searchParams}`);

      url.searchParams.forEach(async (value, key) => {
        // this.memory.set(key, value);
        await this.writeFile(this.filePath, value, key);
      })

      const file = await this.readFile(this.filePath);
      console.log(file);

      res.statusCode = 200;
      res.end("SET (POST) request successful"); // should really be a json.stringified { message: "..."}
      
    } catch (err) {
      console.error(err);

      res.statusCode = 500;
      res.end();
    }
  }

  readFile = async (path = this.filePath) => {
    try {
      const fileContent = await fsReadFile(path, 'utf-8');

      if (!fileContent.trim()) {
        return {};
      }

      const data = JSON.parse(fileContent);
      return data;
    } catch (err) {
      console.error(err);
      return {};
    }
  }

  writeFile = async (path = this.filePath, value: string, key: string) => {
    try {
      const data = await this.readFile(path);
      data[key.toString()] = value.toString();

      await fsWriteFile(path, JSON.stringify(data, null, 2), 'utf-8');
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  handleGetRequest = async (
    url: URL,
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> => {
    try {
      console.log(`[babyServer] GET: ${url.searchParams}`);
      const key = url.searchParams.get('key');

      if (!key) {
        res.statusCode = 400;
        res.end('Missing key in query params');
        return;
      }

      const file = await this.readFile(this.filePath);

      if (!file) {
        res.statusCode = 400;
        res.end();
      }
      const value = file[key.toString()];

      if (!value) {
        res.statusCode = 404;
        res.end('Key not found');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(value);
    } catch (err) {
      console.error(err);

      res.statusCode = 500;
      res.end();
    }
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