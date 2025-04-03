import babyServer from "./server.js";

const bbs = new babyServer();

bbs.start();

const first = await fetch("http://localhost:4000/set?test1=test1");
const second = await fetch("http://localhost:4000/get?key=test1");

const third = await fetch("http://localhost:4000/set?3=three");
const fourth = await fetch("http://localhost:4000/set?4=four");
const fifth = await fetch("http://localhost:4000/set?5=five");

const sixth = await fetch("http://localhost:4000/get?key=3")

const seventh = await fetch("http://localhost:4000/get?key=4");
const eighth = await fetch("http://localhost:4000/get?key=5");

bbs.stop();