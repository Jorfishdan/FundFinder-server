const express = require("express");
const fs = require("fs");
const { type } = require("os");
const funding = require("../data/funding.json");
const { v4: uuid } = require("uuid");

exports.display = async (req, res) => {
  const { location, gender } = req.query;
  if (!location || !gender) {
    return res
      .status(400)
      .json({ message: "Missing location or gender parameter" });
  }

  try {
    const fundingGallery = fundingList();
    const displayFunding = fundingGallery
      .filter((info) => {
        return info.location.includes(location) && info.gender.includes(gender);
      })
      .map((info) => {
        return {
          id: info.id,
          name: info.name,
          type: info.type,
          location: info.location,
          gender: info.gender,
          website: info.website,
          amount: info.amount,
          due: info.due,
        };
      });
    res.send(displayFunding);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

function fundingList() {
  const fundingPreview = fs.readFileSync("./data/funding.json");
  return JSON.parse(fundingPreview);
}
