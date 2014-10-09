var express    = require("express");
var app        = express();

app.set("port", 3000);

app.get("/", function(req, res, next) {
	res.send("home");
});

app.get('/nope', function(req, res) {
	throw new Error('Nope!');
});

// Caught error
app.get('/caught', function(req, res, next) {
	// User.find({id: req.param("id")})
	setTimeout(function() {
		next(new Error("Foo."));
		// next({code: 410, message: "User is gone."});
	}, 0);
	
});

// clientErrorHandler
app.use(function(req, res) {
   res.status(404).send('not-found');
});

// error handler
app.use(function(err, req, res, next) {
	console.error(err);
	res.status(500).send("error-500 " + err);
});

app.listen(app.get("port"), function() {
	console.log("Express app started, http://localhost:%d", app.get("port"));
});

pro