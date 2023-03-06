const express = require("express");
const router = express.Router();
const fs = require("fs");
const { type } = require("os");
const funding = require("../data/funding.json");
const { v4:uuid } = require("uuid");

// router.get("/", (req, res) => {
//   const { location, gender } = req.query;
//     const fundingGallery = fundingList();
//     const displayFunding = fundingGallery.filter((info) => {
     
//   }).map((info) => {
//       return {
//         id: info.id,
//         name: info.name,
//         type : info.type,
//         location: info.location,
//         gender: info.gender,
//         website: info.website,
//         amount: info.amount,
//         due : info.due

//       };
//     });
//     res.send(displayFunding);
//   });

router.get("/", (req, res) => {
  const { location, gender } = req.query;
  if (!location || !gender) {
    return res.status(400).json({ message: "Missing location or gender parameter" });
  }

  try {
    const fundingGallery = fundingList();
    const displayFunding = fundingGallery.filter((info) => {
      return info.location.includes(location) && info.gender.includes(gender);
    }).map((info) => {
      return {
        id: info.id,
        name: info.name,
        type: info.type,
        location: info.location,
        gender: info.gender,
        website: info.website,
        amount: info.amount,
        due: info.due
      };
    });
    res.send(displayFunding);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

  router.post("/", (req,res) => {
    const { name, type, location, gender, website, amount, due} = req.body;
    const newFund ={
        id: uuid(),
        type,
        location,
        gender,
       
    };
    funding.push(newFund);
    res.json(newFund)
    fs.writeFileSync("./data/funding.json", JSON.stringify(funding))
  
  })

  router.put("/:id", (req, res) => {
    const fundId = req.params.id;
    const fundToUpdate = funding.find((f) => f.id === fundId);
  
    if (!fundToUpdate) {
      return res.status(404).json({ message: "Fund not found" });
    }
  
    const { name, type, location, gender, website, amount, due } = req.body;
  
    // Update the fund properties
    fundToUpdate.name = name;
    fundToUpdate.type = type;
    fundToUpdate.location = location;
    fundToUpdate.gender = gender;
    fundToUpdate.website = website;
    fundToUpdate.amount = amount;
    fundToUpdate.due = due;
  
    fs.writeFileSync("./data/funding.json", JSON.stringify(funding));
  
    res.json(fundToUpdate);
  });
  

  function fundingList() {
    const fundingPreview = fs.readFileSync("./data/funding.json");
    return JSON.parse(fundingPreview);
  }

module.exports = router



