var http = require("http"); // Include the Node HTTP library
var express = require("express"); // Include the Express module
var app = express(); // Create an instance of Express
// Start the app
var server = http.createServer(app);
server.listen(3000, function() {
	console.log("Express app started");
});