"use strict";
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var AuthenticationRouter_1 = require("./app/routes/AuthenticationRouter");
var SearchRouter_1 = require("./app/routes/SearchRouter");
var ProjectsRouter_1 = require("./app/routes/ProjectsRouter");
var config = require("config");
var utils_1 = require("./app/utils/utils");
var app = express();
var PORT = process.env.PORT || 3000;
var connectionString = process.env.MONGODB_URI || config.get("momgoDBConnectionUrl");
app.use(logger("dev"));
app.use("/public", express.static(__dirname + "/public"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Connect to mongodb
mongoose.connect(connectionString);
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", function () {
    console.log("Mongoose default connection open to " + connectionString);
});
// If the connection throws an error
mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection error: " + err);
});
// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection disconnected");
});
// If the Node process ends, close the Mongoose connection 
process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log("Mongoose default connection disconnected through app termination");
        process.exit(0);
    });
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Session-Key");
    next();
});
app.use("/api", utils_1.utils.checkForValidSessionMiddleware);
// Routes Mapping
app.use("/api/auth", AuthenticationRouter_1.AuthenticationRouter);
app.use("/api/search", SearchRouter_1.SearchRouter);
app.use("/api/projects", ProjectsRouter_1.ProjectsRouter);
app.use("/fileuploadtest", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/fileuploadtest.html"));
});
app.use("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/app/index.html"));
});
app.listen(PORT, function () {
    console.log("Express server started at localhost:" + PORT);
});
//# sourceMappingURL=server.js.map