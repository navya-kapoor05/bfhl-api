require("dotenv").config({ path: "./.env" });
const express = require("express");

const { fibonacci, primeFilter, lcm, hcf } = require("./utils/math");
const { askAI } = require("./utils/ai");

const app = express();
app.set("json spaces", 2);
app.use(express.json());

const EMAIL = process.env.OFFICIAL_EMAIL;
console.log("EMAIL FROM ENV =>", EMAIL);


/* Health*/
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

/* Main*/
app.post("/bfhl", async (req, res) => {
  try {
    const keys = Object.keys(req.body);

    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        error: "Only one key allowed"
      });
    }

    const key = keys[0];
    const value = req.body[key];
    let data;

    switch (key) {
      case "fibonacci":
        data = fibonacci(value);
        break;

      case "prime":
        data = primeFilter(value);
        break;

      case "lcm":
        data = lcm(value);
        break;

      case "hcf":
        data = hcf(value);
        break;

      case "AI":
        data = await askAI(value);
        break;

      default:
        return res.status(400).json({
          is_success: false,
          error: "Invalid key"
        });
    }

    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data
    });

  } catch (err) {
    res.status(500).json({
      is_success: false,
      error: err.message
    });
  }
});

module.exports = app;
