import http from "http";
import express = require("express");
import os from "os";
import initHealthChecksWithServer from "./HealthChecks";

const basePath = "/hodappba";

//dotenv
require("dotenv").config();

const app = express();
const port = process.env.PORT || 443; // default port to listen

const apiMetrics = require("prometheus-api-metrics");
app.use(apiMetrics({ metricsPath: basePath + "/metrics" }));

//#region Routes

const router = express.Router();

router.get("/", (request, response) => {
    response.send(`Hello World from Node REST server!`);
});

router.get("/host", (request, response) => {
    response.send(`The hostname is: ${os.hostname()}`);
});

app.use(basePath, router);

//#endregion Routes

// start the Express server
app.listen(() => {
    console.log(`server started at http://localhost:${port}`);
});

const server = http.createServer(app);

initHealthChecksWithServer(server);

server.listen(port);
