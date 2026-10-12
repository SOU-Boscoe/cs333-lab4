import express from "express";

const app = express();
const port = 3000;

function logger(req, res, next) {
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  next();
}

app.use(logger);

app.get("/", function (req, res) {
  res.send("Hello");
});

app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
