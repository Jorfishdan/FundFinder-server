const express = require("express");
const router = express.Router();
const fs = require("fs");
const { type } = require("os");
const funding = require("../data/funding.json");
const { v4:uuid } = require("uuid");




const fundingController = require('../controllers/fundingController')
router
  .route('/')
  .get(fundingController.display)


module.exports = router



