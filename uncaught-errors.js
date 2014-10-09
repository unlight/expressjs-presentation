var express    = require("express");
var app        = express();

app.set("port", 3000);

app.get("/", function(req, res, next) {
	res.send("home");
});


app.use(function(req, res, next) {
    // create a domain for this request
    var domain = require('domain').create();
    // handle errors on this domain
    domain.on('error', function(err) {
        console.error('DOMAIN ERROR CAUGHT\n', err.stack);
        res.setHeader('content-type', 'text/plain');
        res.end('Server error.');
        server.close(); // server - result of app.listen()
    });
    // add the request and response objects to the domain
    domain.add(req);
    domain.add(res);
    // execute the rest of the request chain in the domain
    domain.run(next);
    // 
});



// Caught error
app.get('/caught', function(req, res, next) {
	// User.find({id: req.param("id")})
	setTimeout(function() {
		next(new Error("Foo."));
		// next({code: 410, message: "User is gone."});
	}, 0);
	
});

// Uncaught error
app.get('/epic-fail', function(req, res) {
	setTimeout(function() {
		throw new Error("Boom!");
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

var server = app.listen(app.get("port"), function() {
	console.log("Express app started, http://localhost:%d", app.get("port"));
});

// process.on("uncaughtException", function(err) {
// 	console.log(err);
// 	process.exit(1);
// });