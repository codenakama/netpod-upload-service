var express = require("express");
var multer = require("multer");
var fs = require("fs");
var rimraf = require("rimraf");

const baseDir = "drops/";

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		let dir = baseDir + req.query.id + Date.now();

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}

		cb(null, dir);
	},

	filename: function(req, file, cb) {
		cb(null, file.originalname + ".zip");
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

app.post("/deployments", upload.array("files"), function(req, res, next) {
	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any

	res.send({ message: "upload completed" });
});

app.listen(3001, err => {
	if (err) throw err;
	console.log("> Ready on http://localhost:3001");
});
