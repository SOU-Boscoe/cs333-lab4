// Everything from Week 4 Wednesday's class. Run: npm install, then node --watch server.js

import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

function logger(req, res, next) {
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  next();
}

app.use(logger);
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded());

app.get("/about", function (req, res) {
  console.log("Someone asked for", req.method, req.url);
  res.send("<h1>About me</h1><p>I'm learning Express.</p>");
});

app.post("/hello", function (req, res) {
  console.log(req.body);
  res.type("text").send("Hello, " + req.body.name + "!");
});

app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
