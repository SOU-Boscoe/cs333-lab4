import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded());
app.use(express.static("public"));

app.post("/submit", function (req, res) {
  console.log(req.body);
  res.send("Got it! Look at the server terminal.");
});

app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
