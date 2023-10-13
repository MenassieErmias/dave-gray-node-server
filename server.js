const logEvents = require("./logEvents");
const eventEmitter = require("events");

class Emitter extends eventEmitter {}

const myEmitter = new Emitter();

myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => myEmitter.emit("log", "Log event emitted"), 2000);
setTimeout(() => myEmitter.emit("log", "Log event emitted, once more"), 2000);
