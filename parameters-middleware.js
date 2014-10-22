var express        = require("express");
var app            = express();
var bodyParser     = require("body-parser");
var multipart      = require('connect-multiparty');
var formidable     = require('formidable');
var csrf           = require('csurf');
var session        = require("express-session");

app.set("port", 3000);

app.param('user', function(req, res, next, id) {
  setTimeout(function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Not found.'));
    req.user = user;
	req.params["user"] = user;
    next();
  }, 100, null, {name: "Ivan"});
});

app.get('/user/:user/:ref?', function(req, res) {
  res.send(req.params);
});


// app.use(bodyParser.urlencoded({extended: true}));
// app.use(multipart({uploadDir: "./uploads"}));
// app.use(session({secret: "secret key"}));
// app.use(csrf());

// app.get("/", function(req, res) {
// 	res.send("Hello from Express, this is homepage.");
// });

// app.all("/form-m", function(req, res) {
// 	if (req.method == "POST") {
// 		console.log(req.body);
// 		console.log(req.files);
// 	}
// 	res.render("form-m.ejs");
// });

// app.all("/form-b", function(req, res) {
// 	if (req.method == "POST") {
// 		console.log(req.body);
// 		console.log(req.files);
// 	}
// 	res.render("form-b.ejs");
// });

// app.all("/form-f", function(req, res) {
// 	if (req.method == "POST") {
// 		var util = require('util');
// 		var form = new formidable.IncomingForm();
// 		form.parse(req, function(err, fields, files) {
// 			if (err) throw err;
// 			console.log(fields);
// 			console.log(files);
// 		});
// 	}
// 	res.render("form-m.ejs");
// });

// app.all('/form-csrf', function(req, res) {
//   res.render('form-csrf.ejs', { csrfToken: req.csrfToken() });
// });

// // error handler
// app.use(function (err, req, res, next) {
//   if (err.code !== 'EBADCSRFTOKEN') return next(err);

//   // handle CSRF token errors here
//   res.status(403);
//   res.send('session has expired or form tampered with.');
// })

app.listen(app.get("port"), function() {
	console.log("Express app started, http://localhost:%d", app.get("port"));
});