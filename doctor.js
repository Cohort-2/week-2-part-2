const express = require("express");

const app = express();

app.use(express.json());

var user = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

// For getting the number of kidney and number of healthy kidney ...

app.get("/", (req, res) => {
  const jhonKidneys = user[0].kidneys;
  const numberofKidneys = jhonKidneys.length;
  const numberOfHealthyKidneys = jhonKidneys.filter(
    (kidney) => kidney.healthy === true
  ).length;
  const numberofUnhealthyKidneys = numberofKidneys - numberOfHealthyKidneys;
  res.json({
    numberofKidneys,
    numberOfHealthyKidneys,
    numberofUnhealthyKidneys,
  });
});

app.post("/", (req, res) => {
  const { name, age } = req.query;
  res.send(`Hello ${name}, you are ${age} years old.`);
});

app.put("/", (req, res) => {
  const { name, age } = req.query;
  res.send(`Hello ${name}, you are ${age} years old.`);
});

app.delete("/", (req, res) => {
  const { name, age } = req.query;
  res.send(`Hello ${name}, you are ${age} years old.`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
