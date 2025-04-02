import babyServer from "./server.js";

const PORT = 4000;

const bbs = new babyServer(PORT);

bbs.start();

const request = "get this";

const response = await fetch("http://localhost:4000/get?key=somekey");