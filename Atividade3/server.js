const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.post("/login", function (req, res) {
  const { username, password } = req.body;

  if (username === "usuario_correto" && password === "senha_correta") {
    res.status(200).send("Login successful");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

module.exports = app;
