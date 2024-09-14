const express = require("express");

const app = express();

function sum(n) {
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    ans += i;
  }
  return ans;
}

app.get("/", (req, res) => {
  const n = req.query.n;
  const ans = sum(n);
  res.send("Your answer is " + ans);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
