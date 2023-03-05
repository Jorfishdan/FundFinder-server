const express = require("express");
const router = express.Router();

const usersController = require('../controllers/userController')
router 
    .route('/')
    .get(usersController.list)
router
    .route('/signup')
    .post(usersController.signUp)

router 
    .route('/login')
    .post(usersController.login)
router 
    .route('/reset-email')
    .patch(usersController.resetEmail)
router 
    .route('/reset-password')
    .patch(usersController.resetPassword)


module.exports = router