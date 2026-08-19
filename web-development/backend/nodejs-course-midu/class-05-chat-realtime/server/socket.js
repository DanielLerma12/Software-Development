import { Server } from "socket.io";
import { prisma } from "../lib/prisma.js";

export const SocketServer = (server) => {
  const io = new Server(server, {
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000,
      skipMiddlewares: true,
    },
  }); // socket.io se conecta al server
  // tanto app como socket.io usan el mismo server

  io.on("connection", async (socket) => {
    console.log("a user has connected");

    socket.on("chat message", async (msg) => {
      let result;
      const username = socket.handshake.auth.username;

      try {
        result = await prisma.messages.create({
          data: {
            content: msg,
            users: {
              connect: {
                user_name: username,
              },
            },
          },
          include: {
            users: true,
          },
        });
        io.emit("chat message", result);
      } catch (e) {
        console.log(e);
        return;
      }
    });

    socket.on("typing message", async (msg) => {
      const username = socket.handshake.auth.username;
      socket.broadcast.emit("typing message", username);
    });

    if (!socket.recovered) {
      try {
        const result = await prisma.messages.findMany({
          where: {
            id: {
              gt: socket.handshake.auth.serverOffset ?? 0,
            },
          },
          orderBy: {
            id: "asc",
          },
          include: {
            users: true,
          },
        });

        if (result !== undefined) {
          io.emit("chat history", result);
        }
      } catch (e) {
        console.log(e);
        return;
      }
    }

    socket.on("disconnect", () => {
      console.log("a user has disconnected");
    });
  });
};
