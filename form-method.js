var express        = require("express");
var app            = express();
var bodyParser     = require("body-parser");
var methodOverride = require('method-override');

app.set("port", 3000);

app.use(bodyParser());
app.use(methodOverride(function(req, next) {
	return req.body._method;
}));

app.all("/form-method", function(req, res, next) {
	console.log("request method:", req.method);
	res.render("form-method.ejs", {method: req.method});
});

app.listen(app.get("port"), function() {
	console.log("Express app started, http://localhost:%d", app.get("port"));
});