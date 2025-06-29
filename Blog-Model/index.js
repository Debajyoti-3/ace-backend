import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`your server is currently running at http://localhost:${port}`);
});
