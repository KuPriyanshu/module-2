// const express = require("express");
// const { PeerServer } = require("peer");

// const app = express();

// app.get("/", (req, res) => {
//   res.send("Express server is running");
// });

// // Start the Express server on a different port
// const expressPort = process.env.EXPRESS_PORT || 5001;
// app.listen(expressPort, () => {
//   console.log(`Express server running on http://localhost:${expressPort}`);
// });

// // Create the PeerJS server running on port 5001
// const peerServer = PeerServer({
//   host: "localhost",
//   port: 5002, // Use a different port for PeerJS
//   path: "/",
//   secure: false,
// });

// // Use PeerJS server as middleware
// app.use("/", peerServer); // Attach PeerJS server to a specific path

// app.use((req, res, next) => {
//   console.log(`Received request for ${req.path}`);
//   next();
// });

// // Define a route for testing
// app.get("/", (req, res) => {
//   res.send("PeerJS server is running");
// });

// const port = process.env.PORT || 5002;

// app.listen(port, () => {
//   console.log(`PeerJS server running on http://localhost:${port}`);
// });

// peerServer.on("connection", (client) => {
//   console.log("Peer connected:", client.id);
// });

// peerServer.on("disconnect", (client) => {
//   console.log("Peer disconnected:", client.id);
// });

// console.log("PeerJS server running on port 5002");



const express = require("express");
const { PeerServer } = require("peer");
const cors = require("cors");


const app = express();

// Enable CORS
app.use(cors());

// Express route
app.get("/", (req, res) => {
  res.send("Express server is running");
});

// Start the Express server on port 5001
const expressPort = process.env.EXPRESS_PORT || 5001;
const expressServer = app.listen(expressPort, () => {
  console.log(`Express server running on http://localhost:${expressPort}`);
});

// Create the PeerJS server
const peerServer = PeerServer({
  port: 5002, // PeerJS runs on its own port
  path: "/", // Path for PeerJS connections
  allow_discovery: true,
});

// PeerJS events
peerServer.on("connection", (client) => {
  console.log("Peer connected:", client.getId());
});

peerServer.on("disconnect", (client) => {
  console.log("Peer disconnected:", client.getId());
});

console.log("PeerJS server running on http://localhost:5002");
