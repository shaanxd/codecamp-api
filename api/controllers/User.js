const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CONSTANTS = require('../constants/constants');
const User = require('../models/User');

module.exports.login_user = async (req, res) => {
  const {
    body: { username, password }
  } = req;
  try {
    if (username && password) {
      const foundUser = await User.findOne({
        where: {
          username
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });
      if (foundUser) {
        const isValid = await bcrypt.compare(password, foundUser.password);
        if (isValid) {
          const {
            id,
            password,
            userType,
            email,
            username,
            fullname
          } = foundUser;
          const jwToken = jwt.sign(
            {
              user: id
            },
            CONSTANTS.JWT_KEY,
            {
              expiresIn: '1d'
            }
          );
          res.status(200).json({
            user: {
              user_id: id,
              authToken: jwToken,
              fullname,
              username,
              userType,
              email
            }
          });
        } else {
          res.status(404).json({
            message: 'Invalid username or password'
          });
        }
      } else {
        res.status(404).json({
          message: 'Invalid username or password'
        });
      }
    } else {
      res.status(400).json({
        message: 'Bad Request'
      });
    }
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message || 'Internal server error please try again'
    });
  }
};
