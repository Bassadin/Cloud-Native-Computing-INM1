import express from "express";

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
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
