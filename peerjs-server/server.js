// const express = require("express");
// const { PeerServer } = require("peer");
// const cors = require("cors");


// const app = express();

// // Enable CORS
// app.use(cors());

// // Express route
// app.get("/", (req, res) => {
//   res.send("Express server is running");
// });

// // Start the Express server on port 5001
// const expressPort = process.env.EXPRESS_PORT || 5001;
// const expressServer = app.listen(expressPort, () => {
//   console.log(`Express server running on http://localhost:${expressPort}`);
// });

// // Create the PeerJS server
// const peerServer = PeerServer({
//   port: 5002, // PeerJS runs on its own port
//   path: "/", // Path for PeerJS connections
//   allow_discovery: true,
// });

// // PeerJS events
// peerServer.on("connection", (client) => {
//   console.log("Peer connected:", client.getId());
// });

// peerServer.on("disconnect", (client) => {
//   console.log("Peer disconnected:", client.getId());
// });

// console.log("PeerJS server running on http://localhost:5002");

const express = require("express");
const { ExpressPeerServer } = require("peer");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

// Express route
app.get("/", (req, res) => {
  res.send("Express and PeerJS server is running");
});

// Start the Express server
const port = process.env.PORT || 443; // Use a single port for both
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Create the PeerJS server using the same Express instance
const peerServer = ExpressPeerServer(server, {
  path: "/peerjs",
  secure: true,
  allow_discovery: true,
});

// Attach the PeerJS server to the Express app
app.use("/peerjs", peerServer);

// PeerJS events
peerServer.on("connection", (client) => {
  console.log("Peer connected:", client.getId());
});

peerServer.on("disconnect", (client) => {
  console.log("Peer disconnected:", client.getId());
});

