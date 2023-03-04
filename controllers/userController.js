const router = require("express").Router(); 
const {
  getUser
} = require("../controllers/userController");


router
.get(getUser)
module.exports = router