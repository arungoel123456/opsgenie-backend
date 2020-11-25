require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const express = require("express");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());

const userRouter = require("./api/users/user.router");
app.use("/api/users", userRouter);

const alertRouter = require("./api/alerts/alert.router");
app.use("/api/alerts", alertRouter);

const incidentRouter = require("./api/incidents/incident.router");
app.use("/api/incidents", incidentRouter);

// app.get("/api", (req, res) => {
//   res.json({
//     success: 1,
//     message: "This is rest api",
//   });
// });
app.listen(3001, (req, res) => {
  console.log("server started running on : ", 3001);
});
