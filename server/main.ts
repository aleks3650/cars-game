import { Server } from "https://deno.land/x/socket_io@0.2.1/mod.ts";

const io = new Server({
  cors: {
    origin: true,
    allowedHeaders: ["my-header"],
    credentials: true,
  },
});

const TICK_RATE = 1000 / 60;
let tick = 0;
let lastTickTime = Date.now();

const gameState = {
  time: new Date().toISOString(),
  tick: tick,
};

function gameLoop() {
  const now = Date.now();
  lastTickTime = now;

  tick++;
  gameState.tick = tick;
  gameState.time = new Date().toISOString();

  io.emit("gameState", gameState);

  const nextTickTime = lastTickTime + TICK_RATE;
  const timeout = Math.max(0, nextTickTime - Date.now());
  
  setTimeout(gameLoop, timeout);
}

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
});

Deno.serve({
  handler: io.handler(),
  port: 8000,
});

gameLoop();
console.log("Server Socket.IO is listening on port 8000...");
