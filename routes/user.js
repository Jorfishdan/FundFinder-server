const express = require("express");
const router = express.Router();

const usersController = require('../controllers/userController')
router
    .route('/signup')
    .post(usersController.signUp)

router 
    .route('/login')
    .post(usersController.login)
router 
    .route('/')
    .get(usersController.list)
router 
    .route('/')
    .patch(usersController.reset)


module.exports = router