import http from "http";
import express from "express";
import { createTerminus } from "@godaddy/terminus";

//dotenv
require("dotenv").config();

const app = express();
const port = process.env.PORT || 443; // default port to listen

//#region Routes
app.get("/", (request, response) => {
    response.send(`Hello World from Node REST server!`);
});

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
        "/_health/liveness": livenessCheck,
        "/_health/readiness": readinessCheck,
    },

    // cleanup options
    timeout: 1000,
});

server.listen(port);
