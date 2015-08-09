var express        = require("express");
var app            = express();
var expressDomain  = require('express-domain-middleware');
// var expressDomain  = require("connect-domain");

app.set("port", 3000);

app.use(expressDomain);

app.get("/epic-fail", function(req, res, next) {
	setTimeout(function() {
		throw new Error("Boom!");
	}, 0);
});

// error handler
app.use(function(err, req, res, next) {
	console.error(err);
	res.status(500).send("error-500 " + err);
});

app.listen(app.get("port"), function() {
	console.log("Express app started, http://localhost:%d", app.get("port"));
	require("open")("http://localhost:3000/epic-fail");
});