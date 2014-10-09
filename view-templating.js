var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");

app.set("port", 3000);

app.use(bodyParser.urlencoded());

app.get("/", function(req, res) {
	res.send("Hello from Express, this is homepage.");
});

app.get("/home1", function(req, res) {
	res.render("home.ejs");
});

app.get("/home2", function(req, res) {
	res.render("home2.jade");
});

app.locals.title = "Site title";
app.get("/home3", function(req, res) {
	res.locals.pagetitle = "Home"
	res.render("home3.ejs", {subtitle: "Me"});
});

app.listen(app.get("port"), function() {
	console.log("Express app started, http://localhost:%d", app.get("port"));
});