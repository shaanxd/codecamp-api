const express = require('express');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

const User = require('../models/User');
const { UserTypes } = require('../constants/User');

const router = express.Router();

router.post('/create-tc-user', async (req, res, next) => {
  const {
    userData,
    body: { username, password, email, fullname }
  } = req;
  try {
    if (!username || !password || !email || !fullname) {
      return res.status(401).json({
        message: 'Bad Request'
      });
    }
    const foundUser = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ username }, { email }]
      }
    });
    if (foundUser) {
      return res.status(401).json({
        message: 'Username or Email exists already.'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      username,
      password: hashedPassword,
      fullname,
      email,
      userType: UserTypes.TEXT_CENTER_USER
    });
    res.status(200).json({
      userId: createdUser.id
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message || 'Internal server error please try again.'
    });
  }
});

module.exports = router;
