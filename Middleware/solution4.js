import express from "express";
import morgan from "morgan";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(express.static("public"));

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function bandNameGenerator(req, res, next) {
  const street = req.body?.street?.trim();
  const pet = req.body?.pet?.trim();
  if (!street || !pet) {
    return res.status(400).send("<p>Both names are needed. <a href=\"/\">Try again</a></p>");
  }
  res.locals.bandName = `${street} ${pet}`;
  next();
}

app.post("/submit", bandNameGenerator, (req, res) => {
  console.log("Band name:", res.locals.bandName);
  res.send(`<h1>Your band name is:</h1><h2>${escapeHtml(res.locals.bandName)} ✌️</h2><p><a href="/">Another</a></p>`);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
