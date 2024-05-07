/*
    Imports
*/
const express = require("express");
const app = express();
require("dotenv").config();
const connectToMongoDB = require("./db/mongodb");
const logger = require("morgan");
const cors = require("cors");

// Update corsOptions to have ALL origins given access
const corsOptions = {
    origin: "*",
    optionSuccessStatus: 200,
};

/*
Middleware
*/
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false })); // This will read form data properly
app.use(express.json()); // This will read JSON properly
app.use(cors(corsOptions));

/*
Routes
*/
const McuRouter = require("./routes/mcuRouter");
app.use("/api", McuRouter);

/*
    Server listening
*/
// const PORT = 3001;
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
    connectToMongoDB();
});
