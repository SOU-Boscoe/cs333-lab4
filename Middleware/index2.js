import express from "express";

const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send("Hello");
});

app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
