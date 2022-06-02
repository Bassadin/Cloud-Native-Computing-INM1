import http from "http";
import express = require("express");
import os from "os";
import initHealthChecksWithServer from "./HealthChecks";
const Prometheus = require("prom-client");
const logger = require("pino")();
import bodyParser from "body-parser";
import axios from "axios";

// Axios
axios.defaults.baseURL = process.env.BACKEND_HOST || "http://localhost:8080/hodappba";

//dotenv
require("dotenv").config();

const basePath = "/hodappba";

//MongoDB
import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import User from "./User";
// Connection URL
const url: string = process.env.MONGODB_HOST || "";
const client = new MongoClient(url);
let db: Db;
let userCollection: Collection;

//MessageQueue
// import { MessageQueue } from "./MessageQueue";
// const messageQueue = MessageQueue.getInstance();

// Database Name
async function main() {
    // Use connect method to connect to the server
    await client.connect();
    logger.info("Connected successfully to database server");
    db = client.db("cnc");
    userCollection = db.collection("users");
}

main()
    .then((e) => logger.info(e))
    .catch((e) => logger.error(e));

//Express
const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
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

router.get("/users", (request, response) => {
    logger.info("Called users get route.");
    userCollection.find({}).toArray((err, result) => {
        response.send(JSON.stringify(result));
    });
});

router.post("/users", (request, response) => {
    logger.info("Called users post route.");
    logger.info(request.body);
    userCollection.insertOne({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
    });
    response.sendStatus(200);
});

router.delete("/users", (request, response) => {
    logger.info("Called users delete route.");

    const objectID = new ObjectId(request.body.id);

    userCollection.find({ _id: objectID });
    response.sendStatus(200);
});

router.delete("/deleteAllUsers", (request, response) => {
    logger.info("Called delete all users delete route.");

    userCollection.deleteMany({});
    response.sendStatus(200);
});

router.get("/firstUser", (request, response) => {
    axios
        .get("/users")
        .then(async (restResponse: any) => {
            const responseJson = await restResponse.json;

            if (responseJson.length > 0) {
                response.send(responseJson[0]);
            } else {
                response.sendStatus(404);
            }
        })
        .catch((err) => {
            logger.error(err);
        });
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
