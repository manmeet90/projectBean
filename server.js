"use strict";
var express = require("express");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;
app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/app/index.html"));
});
app.listen(PORT, function () {
    console.log("Express server started at localhost:" + PORT);
});
//# sourceMappingURL=server.js.map