import http from "http";
import express = require("express");
import os from "os";
import initHealthChecksWithServer from "./HealthChecks";
const Prometheus = require("prom-client");
const logger = require('pino')()

const basePath = "/hodappba";

//dotenv
require("dotenv").config();

const app = express();
const port = process.env.PORT || 443; // default port to listen

const apiMetrics = require("prometheus-api-metrics");
app.use(apiMetrics({ metricsPath: basePath + "/metrics" }));

const numberOfHostCalls = new Prometheus.Counter({
    name: "number_of_host_calls",
    help: "Total number of times the /host endpoint has been called",
});

//#region Routes

const router = express.Router();

router.get("/", (request, response) => {
    response.send(`Hello World from Node REST server!`);
});

router.get("/host", (request, response) => {
    numberOfHostCalls.inc();
    logger.info("Called hostname route.");
    response.send(`The hostname is: ${os.hostname()}`);
});

app.use(basePath, router);

//#endregion Routes

// start the Express server
app.listen(() => {
    logger.info(`server started at http://localhost:${port}`);
});

const server = http.createServer(app);
initHealthChecksWithServer(server);
server.listen(port);
