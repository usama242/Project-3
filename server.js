let projectData = {};
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialing
app.use(express.static("website"));
// Post Route
const data = [];
app.post("/add", (req, res) => {
  projectData["date"] = req.body.date;
  projectData["temp"] = req.body.temp;
  projectData["content"] = req.body.content;
  res.send(projectData);
});

app.get("/all", (req, res) => {
  res.send(projectData);
});

// Setup Server
const port = 3000;
const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});
