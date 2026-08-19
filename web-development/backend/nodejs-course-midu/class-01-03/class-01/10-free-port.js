const net = require("node:net");

function findAvailablePort(desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(desiredPort, () => {
      const { port } = server.address();
      server.close(() => {
        resolve(port);
      });

      server.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          findAvailablePort(0).then((port) => resolve(port)); // 0 busca el primer puerto que este disponible
        } else {
          reject(err);
        }
      });
    });
  });
}

module.exports = { findAvailablePort };
