const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants/constants');
const { UserTypes } = require('../constants/User');

module.exports.checkAuth = (req, res, next) => {
  try {
    const {
      headers: { authorization }
    } = req;
    const { JWT_KEY } = CONSTANTS;

    const userToken = authorization.split(' ')[1];
    const decoded = jwt.verify(userToken, JWT_KEY);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Authorization failed'
    });
  }
};

module.exports.checkAdmin = (req, res, next) => {
  try {
    const { userData } = req;
    if (req.userData && req.userData.userType === UserTypes.ADMIN_USER) {
      next();
    } else {
      res.status(401).json({
        message: 'Authorization failed. Not an Administrator'
      });
    }
  } catch (err) {
    res.status(401).json({
      message: 'Authorization failed. Not an Administrator'
    });
  }
};

module.exports.checkTestUser = (req, res, next) => {
  try {
    const { userData } = req;
    if (req.userData && req.userType === UserTypes.TEXT_CENTER_USER) {
      next();
    } else {
      res.status(401).json({
        message: 'Authorization failed. Not a Test Center User'
      });
    }
  } catch (err) {
    res.status(401).json({
      message: 'Authorization failed. Not a Test Center User'
    });
  }
};

module.exports.checkStudent = (req, res, next) => {
  try {
    const { userData } = req;
    if (req.userData && req.userType === UserTypes.STUDENT_USER) {
      next();
    } else {
      res.status(401).json({
        message: 'Authorization failed. Not a Student'
      });
    }
  } catch (err) {
    res.status(401).json({
      message: 'Authorization failed. Not a Student'
    });
  }
};
