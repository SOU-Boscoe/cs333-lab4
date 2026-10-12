import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(express.static("public"));

// Turns characters that mean something in HTML into harmless text,
// so whatever someone types can't run as code on our page.
function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Middleware for /submit only: builds the band name, or stops with a 400 if a box was empty.
function bandNameGenerator(req, res, next) {
  const street = req.body.street;
  const pet = req.body.pet;
  if (!street || !pet) {
    res.status(400).send("Both names are needed. <a href='/'>Try again</a>");
    return;
  }
  res.locals.bandName = street + " " + pet;
  next();
}

app.post("/submit", bandNameGenerator, function (req, res) {
  console.log("Band name:", res.locals.bandName);
  res.send("<h1>Your band name is:</h1><h2>" + escapeHtml(res.locals.bandName) + " ✌️</h2><a href='/'>Another</a>");
});

app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});
