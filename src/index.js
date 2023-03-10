const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const database = require("./config");

// Define Main App
const app = express();

// Config Middlewares
app.use(express.json());
app.use(cors({ exposedHeaders: ["userToken", "authorization"] }));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test database connection

database.connect((error) => {
  if (error) {
    console.log("Error ,", error);
  }
  console.log(`database is connected, threadId: ${database.threadId}`);
});

// define main route

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to Agit Project API</h1>");
});

// routers
const routers = require("./routers");

app.use("/api", routers.userAuthRouter);
app.use("/api", routers.positionsRouter);

// binding to local port
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`API is Running at port ${PORT}`));
