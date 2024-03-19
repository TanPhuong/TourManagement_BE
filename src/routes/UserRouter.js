const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.post('/sign-up', userController.createAccount);
router.post('/sign-in', userController.loginAccount);
router.put('/update-user', userController.updateUser)

module.exports = router;