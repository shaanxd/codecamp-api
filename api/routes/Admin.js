const express = require('express');

const router = express.Router();

router.post('/create-tc-user', (req, res, next) => {
  res.status(200).json({ message: 'THIS IS CREATE TC USER' });
});

module.exports = router;
