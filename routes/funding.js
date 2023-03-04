const express = require("express");
const router = express.Router();
const fs = require("fs");
const { type } = require("os");
const funding = require("../data/funding.json");

router.get("/", (req, res) => {
    const fundingGallery = fundingList();
    const displayFunding = fundingGallery.map((info) => {
      return {
        id: info.id,
        name: info.name,
      type : info.type,
      location: info.location,
      gender: info.gender,
      posted : info.posted
      };
    });
    res.send(displayFunding);
  });

  function fundingList() {
    const fundingPreview = fs.readFileSync("./data/funding.json");
    return JSON.parse(fundingPreview);
  }

module.exports = router;