var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var net = require('net');

app.set("port", 3000);

app.use(cookieParser("xfre"));
app.use(bodyParser.urlencoded({
	extended: true
}));

var session = require("express-session");
app.use(session({
	secret: "xxx",
	// resave: true,
	// saveUninitialized: true,
}));

app.get('/', function(req, res, next) {
	req.session.views = (req.session.views >> 0) + 1;
	res.send("<pre>req.session.views " + req.session.views + "</pre>");
	console.log(req.session.views);
	next();
});

app.get('/abc', function(req, res, next) {
	console.log('abc');
	res.write('abc');
	// res.send('abcd');
	next();
});
app.get('/abc*', function(req, res) {
	console.log('abc*');
	res.write('abc*');
	res.write(req.originalUrl + " " + req.url);
	res.end();
});

app.get("/jsonp", function(req, res, next) {
	res.jsonp({
		x: 2
	});
});

app.head("/jsonp", function(req, res, next) {
	res.jsonp({
		x: 2
	});
});

app.get("/json", function(req, res, next) {
	var x = JSON.stringify(null);
	console.log(x);
	res.json(null);
});


app.get("/send", function(req, res, next) {
	res.send([12, 3]);
});

app.get("/products/:productId(\\d+)", function(req, res, next) {
	res.send("Requested " + req.params.productId);
});

app.get("/", function(req, res, next) {

	// res.cookie("key", "value", {signed: true});
	//	res.cookie('rememberme', 'xxxxx', { expires: new Date(Date.now() + 900000000), httpOnly: true , signed: true});
	res.write("\n" + JSON.stringify(req.headers));
	res.write("\n" + JSON.stringify(req.cookies));
	res.write("\n" + JSON.stringify(req.signedCookies));
	res.write("\n" + JSON.stringify(req.header('User-Agent')));
	res.write("\n" + JSON.stringify(req.accepts('text')));
	res.write("\n" + JSON.stringify(req.accepts('html')));
	res.write("\n" + JSON.stringify(req.accepts('xml')));
	res.write("\n" + JSON.stringify(req.accepts('json')));
	res.write("\n" + JSON.stringify(req.accepts('application')));
	res.write("\n" + JSON.stringify(req.accepts('image')));
	res.write("\n" + JSON.stringify(req.accepts(['application/json', 'text'])));
	res.end();

	// next();
});

app.get("/p", function(req, res) {
	res.send(req.params);
});

app.get("/profile/:name", function(req, res) {
	res.send([req.params, req.query]);
});

app.get('/domain-caught2', function(req, res, next) {
	var client = net.connect({
		port: 8124
	}, function() {
		res.end("ok");
	});

});

// domains
app.get('/domain-caught', function(req, res, next) {
	// create a domain for this request
	var domain = require('domain').create();
	domain.run(function() {
		var client = net.connect({
			port: 8124
		});
	});
	// handle errors on this domain
	domain.on('error', function(err) {
		console.error('DOMAIN ERROR CAUGHT\n', err.stack);
		res.end('Server error.');
		// server.close(); // server - result of app.listen()
	});
});


// Test par.
function p1(req, res, next) {
	setTimeout(function() {
		console.log("p1");
		next();
	}, 0);
}

function p2a(req, res, next) {
	setTimeout(function() {
		console.log("p2a");
		next();
	}, 2000);
}

function p2b(req, res, next) {
	setTimeout(function() {
		console.log("p2b");
		next();
	}, 2000);
}

function p2(req, res, next) {
	var async = require('async');
	async.parallel({
			one: function(done) {
				p2a(req, res, done);
			},
			two: function(done) {
				p2b(req, res, done);
			},
		},
		function(err, results) {
			// results now equals: {one: 1, two: 2}
			next(err);
		});
}

app.get('/par', p1, p2, function(req, res, next) {
	console.log("ok");
	res.send("ok");
});

var r = express.Router();
r.use("/", function(req, res, next) {
	console.log("use r");
	next();
});
r.get("/1", function(req, res, next) {
	console.log("use r 1");
	next();
});

app.use("/use", r);

// app.use("/use", function(req, res, next) {
// 	console.log("use");
// 	next();
// });

// app.get("/use/1", function(req, res, next) {
// 	console.log("use 1");
// 	next();
// });


app.listen(app.get("port"), function() {
	console.log("Express app started, port %d", app.get("port"));
});