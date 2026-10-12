import express from "express";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.urlencoded());
app.use(express.static("public"));

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send("Got it — check the server terminal.");
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
