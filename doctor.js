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
  // console.log(jhonKidneys);
  // console.log(req.body);
  const numberofKidneys = jhonKidneys.length;
  let numberOfHealthyKidneys = 0;
  for (let i = 0; i < jhonKidneys.length; i++) {
    if (jhonKidneys[i].healthy) {
      numberOfHealthyKidneys++;
    }
  }
  const numberofUnhealthyKidneys = numberofKidneys - numberOfHealthyKidneys;
  res.json({
    numberofKidneys,
    numberOfHealthyKidneys,
    numberofUnhealthyKidneys,
  });
});

app.post("/", (req, res) => {
  // whenever someone hits a post request we will add a unhealthy kidney to the jhon because we are engineers not doctors
  const ishealthy = req.body.ishealthy;
  user[0].kidneys.push({ healthy: false });
  res.json({
    msg: "kidney added",
  });
});

app.put("/", (req, res) => {
  for (let i = 0; i < user[0].kidneys.length; i++) {
    user[0].kidneys[i].healthy = true;
  }
  res.json({
    msg: "kidneys are healthy",
  });
});

app.delete("/", (req, res) => {
  // we will remove all the unhealthy kidneys
  // we should return a  411
  // only if there is one unhealthy kidney or else we should return 411

  function isThereOneUnhealthyKidney() {
    let alteastOneUnhealthyKidney = false;
    for (i = 0; i < user[0].kidneys.length; i++) {
      if (!user[0].kidneys[i].healthy) {
        alteastOneUnhealthyKidney = true;
      }
    }
    return alteastOneUnhealthyKidney;
  }

  if (isThereOneUnhealthyKidney()) {
    const newKidneys = [];
    for (let i = 0; i < user[0].kidneys.length; i++) {
      if (user[0].kidneys[i].healthy) {
        newKidneys.push({
          healthy: true,
        });
      }
    }
    user[0].kidneys = newKidneys;
    res.json({
      msg: "kidneys are healthy",
    });
  } else {
    res.status(411).json({
      msg: "no unhealthy kidneys",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
