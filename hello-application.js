var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");

app.set("port", 3000);

app.use(bodyParser.urlencoded());

app.get("/", function(req, res) {
	res.send("Hello from Express, this is homepage.");
});

app.listen(app.get("port"), function() {
	console.log("Express app started, port %d", app.get("port"));
});