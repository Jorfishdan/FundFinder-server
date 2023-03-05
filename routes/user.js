const express = require("express");
const router = express.Router();

const usersController = require('../controllers/userController')
router
    .route('/signup')
    .post(usersController.signUp)

router 
    .route('/login')
    .post(usersController.login)


module.exports = router