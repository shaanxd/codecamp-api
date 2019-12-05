const express = require('express');

const adminController = require('../controllers/Admin');

const router = express.Router();

router.post('/create-tc-user', adminController.create_tc_user);

module.exports = router;
