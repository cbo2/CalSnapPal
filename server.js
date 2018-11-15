const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const socket = require("socket.io");

let PORT = process.env.PORT || 4000;

// Initialize Express
let app = express();

// Configure middleware
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(express.json());

// axios used as a request
//app.set('axios', axios);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/CalSnap"
// Connect to the Mongo DB
// mongoose.connect(MONGODB_URI);

// Add routes, both API and view
//app.use(routes);

// Start the server
//app.listen(PORT, function () {
//    console.log("App running on port " + PORT + "!");
//});

var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function () { /* … */ });
server.listen(PORT);

// keep app alive on heroku-- since heroku sleeps all apps with 1 hour of inactivity!
var http = require("http");
URL_TO_PING = "http://calsnap.herokuapp.com/"
setInterval(function () {
    console.log(`pinging ourselves now on: ${URL_TO_PING}`)
    http.get(URL_TO_PING);
    http.get(BASE_URL);  // now ping ourselves
}, 900000); // every 15 minutes (900000)

// const io = socket(server);
io.on('connection', socket => {
    console.log(`***** made a connection with ${socket.id}`)
    socket.on('calpal', data => {
        console.log(`*** received this message [${data.handle}]: ${data.message}`)
        io.sockets.emit('calpal', data)  // emit now from server out to the clients!
    })
})


module.exports = app;
