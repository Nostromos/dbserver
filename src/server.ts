import * as http from "http";

const PORT = 4000;

// Create the server
const server = http.createServer();

// Listen to requests
server.listen(PORT);