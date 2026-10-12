import express from "express";

const app = express();
const port = process.env.PORT ?? 3000;

function logger(req, res, next) {
  const start = performance.now();
  res.on("finish", () => {
    const ms = (performance.now() - start).toFixed(1);
    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} in ${ms} ms`);
  });
  next();
}

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
