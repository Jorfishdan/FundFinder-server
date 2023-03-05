const express = require("express");
const router = express.Router();
const fs = require("fs");
const { type } = require("os");
const funding = require("../data/funding.json");

router.get("/", (req, res) => {
  const { location, gender } = req.query;
    const fundingGallery = fundingList();
    const displayFunding = fundingGallery.filter((info) => {
      return info.location.includes(location) && info.gender.includes(gender);
  }).map((info) => {
      return {
        id: info.id,
        name: info.name,
        type : info.type,
        location: info.location,
        gender: info.gender,
        website: info.website,
        amount: info.amount,
        due : info.due

      };
    });
    res.send(displayFunding);
  });

  router.post("/", (req,res) => {
    const { name, type, location, gender, website, amount, due} = req.body;
    const newFund ={
        id: uuid(),
        name, 
        type,
        location,
        gender,
        website,
        amount, 
        due,
    };
    funding.push(newFund);
    res.json(newFund)
    fs.writeFileSync("./data/funding.json", JSON.stringify(funding))
  
  })

  function fundingList() {
    const fundingPreview = fs.readFileSync("./data/funding.json");
    return JSON.parse(fundingPreview);
  }

module.exports = router



