const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/files", async function (req, res) {
  await fs.readdir("./files", (err, files) => {
    console.log(files);
    console.log(err);
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(files);
    }
  });
});

app.get("/files/:filename", async function (req, res) {
  const filename = req.params.filename;
  await fs.readFile(`./files/${filename}`, "utf8", (err, data) => {
    console.log(data);
    console.log(err);
    if (err) {
      res.status(404).send("File not found");
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
