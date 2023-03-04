const router = require("express").Router(); 
const {
  getFunding
} = require("../controllers/fundingController");


router
.get(getFunding)
module.exports = router
