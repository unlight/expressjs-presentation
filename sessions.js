var express    = require("express");
var app        = express();

app.set("port", 3000);

var session    = require("express-session");
app.use(session({
	secret: "secret key",
}));

app.get("/", function(req, res, next) {
	req.session.views = ~~req.session.views + 1;
	res.send("req.session.views " + req.session.views);
});

app.listen(app.get("port"), function() {
	console.log("Express app started, http://localhost:%d", app.get("port"));
});

