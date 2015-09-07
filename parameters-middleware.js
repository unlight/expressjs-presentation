var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var multipart = require("connect-multiparty");
var formidable = require("formidable");
var csrf = require("csurf");
var session = require("express-session");

app.set("port", 3000);

app.param("user", function(req, res, next, id) {
	setTimeout(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error("Not found."));
		req.user = user;
		req.params["user"] = user;
		next();
	}, 100, null, {
		name: "Ivan"
	});
});

app.get("/user/:user/:ref?", function(req, res) {
	var user = req.param("user");
	res.json(user);
});

app.listen(app.get("port"), function() {
	console.log("Express app started, http://localhost:%d", app.get("port"));
	require("open")("http://localhost:3000/user/1");
});