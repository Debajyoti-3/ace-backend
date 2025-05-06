require('dotenv').config()

const express = require("express");
const app = express();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/twitter", (req, res) => {
  res.send(`debajyotimitra`);
});

app.get("/login", (req, res) => {
  res.send("<h1>Hello to the Backend Journey</h1>");
});
app.get("/instagram", (req, res) => {
  res.send("<h2>Choding Karo Mast Raho</h2>");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`);
});
