const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

const config = require("./server/config/key.js");

//body-parsor

app.use(express.static(path.join(__dirname, "./client/build")));
//app.use("/image", express.static("./image"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/post", require("./server/Router/post.js"));
app.use("/api/user", require("./server/Router/user.js"));
app.use("/api/apply", require("./server/Router/apply.js"));
app.use("/api/reply", require("./server/Router/reply.js"));
app.use("/api/secondary", require("./server/Router/secondary.js"));
app.use("/api/member", require("./server/Router/member.js"));

app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log(`Example app listening on port http://localhost:${port}`);
      console.log("connecting MongoDB...");
    })
    .catch(err => {
      console.log(`${err}`);
    });
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "./client/build") });
});

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "./client/build") });
});

module.exports = app;
