import http from "http";
import express = require("express");
import { createTerminus } from "@godaddy/terminus";
import os from "os";

//dotenv
require("dotenv").config();

const app = express();
const port = process.env.PORT || 443; // default port to listen

//#region Routes

const router = express.Router();

router.get("/", (request, response) => {
    response.send(`Hello World from Node REST server!`);
});

router.get("/host", (request, response) => {
    response.send(`The hostname is: ${os.hostname()}`);
});

app.use("/hodappba", router);

//#endregion Routes

// start the Express server
app.listen(() => {
    console.log(`server started at http://localhost:${port}`);
});

const server = http.createServer(app);

function readinessCheck() {
    return Promise.resolve();
}

function livenessCheck() {
    // check for stuff like db connection later
    return Promise.resolve();
}

createTerminus(server, {
    // healtcheck options
    healthChecks: {
        "/hodappba/_health/liveness": livenessCheck,
        "/hodappba/_health/readiness": readinessCheck,
    },

    // cleanup options
    timeout: 1000,
});

server.listen(port);
