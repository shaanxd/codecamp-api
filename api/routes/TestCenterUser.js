const express = require('express');

const testCenterUserController = require('../controllers/TestCenterUser');

const router = express.Router();

router.post('/create-examination', testCenterUserController.addExamination);

router.post('/add-question', testCenterUserController.addQuestion);

module.exports = router;
