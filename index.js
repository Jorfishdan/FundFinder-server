const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
const userRoutes = require('./routes/user')
const fundingRoutes = require('./routes/funding')

const PORT = process.env.PORT || 8000

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (
    req.method === "POST" && 
    req.headers["content-type"] !== "application/json"
  ) {
    return res.status(400).json({
      error: true,
      message: "This API only accepts JSON data for a POST/PUT request body",
    });
  }

  next();
});

app.use('/users', userRoutes)
app.use('/funding', fundingRoutes)

app.listen(PORT, function () {
    console.log(`Listening on port: ${PORT}`);
  });