import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
const logger = require("morgan");
import {AuthenticationRouter} from "./app/routes/AuthenticationRouter";
import {SearchRouter} from "./app/routes/SearchRouter";
import {ProjectsRouter} from "./app/routes/ProjectsRouter";
const config = require("config");
import {utils} from "./app/utils/utils";

const app = express();
const PORT = process.env.PORT || 3000;
const connectionString = process.env.MONGODB_URI || config.get("momgoDBConnectionUrl");

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
    console.log(`Mongoose default connection open to ${connectionString}`);
}); 

// If the connection throws an error
mongoose.connection.on("error", function (err) {
  console.log(`Mongoose default connection error: ${err}`);
}); 

// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected"); 
});

// If the Node process ends, close the Mongoose connection 
process.on("SIGINT", function() {
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

app.use("/api", utils.checkForValidSessionMiddleware);
// Routes Mapping
app.use("/api/auth", AuthenticationRouter);
app.use("/api/search", SearchRouter);
app.use("/api/projects", ProjectsRouter);
app.use("/fileuploadtest", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/fileuploadtest.html"));
});
app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/app/index.html"));
});


app.listen(PORT, () => {
    console.log(`Express server started at localhost:${PORT}`);    
});
