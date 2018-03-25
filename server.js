var express = require("express");
var multer = require("multer");
var storage = multer.diskStorage({
	destination: "uploads",
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});

var upload = multer({ storage: storage });
var app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.post("/static", upload.array("avatar"), function(req, res, next) {
	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any
	res.send("upload completed");
});

app.listen(3001, err => {
	if (err) throw err;
	console.log("> Ready on http://localhost:3001");
});
