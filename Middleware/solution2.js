import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan("dev"));

app.get("/", function (req, res) {
  res.send("Hello");
});

app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
