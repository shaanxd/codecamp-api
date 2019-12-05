const express = require('express');

const userController = require('../controllers/User');

const router = express.Router();

router.post('/login', userController.login_user);

module.exports = router;
