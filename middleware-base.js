var express    = require("express");
var app        = express();

app.set("port", 3000);

app.use(function(req, res, next) {
    console.log('processing request for "' + req.url + '"....');
    next();
});
app.use(function(req, res, next) {
    console.log('terminating request');
    res.send('thanks for playing!');
    // note that we do NOT call next() here... this terminates the request
});
app.use(function(req, res, next) {
    console.log("whoops, i'll never get called!");
});

app.listen(app.get("port"), function() {
	console.log("Express app started, http://localhost:%d", app.get("port"));
});