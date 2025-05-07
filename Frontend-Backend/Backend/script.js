// const express = require('express')
import express from "express";

const app = express();

// app.get("/", (req, res) => {
//   res.send("Here is your Code");
// });

app.get("/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "1 joke",
      content: "a joke",
    },
    {
      id: 2,
      title: "1 joke",
      content: "another joke",
    },
    {
      id: 3,
      title: "1 joke",
      content: "another joke",
    },
    {
      id: 4,
      title: "1 joke",
      content: "another joke",
    },
    {
      id: 5,
      title: "5 joke",
      content: "another joke",
    },
  ];
  res.send(jokes);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`your server is running at port no. ${port}`);
});
