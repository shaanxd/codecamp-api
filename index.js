const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const sequelize = require('./api/utils/database');
const cors = require('./api/utils/cors');
const userRoutes = require('./api/routes/User');
const adminRoutes = require('./api/routes/Admin');
const testUserRoutes = require('./api/routes/TestCenterUser');
const User = require('./api/models/User');
const Examination = require('./api/models/Examination');
const Question = require('./api/models/Question');
const Answer = require('./api/models/Answer');

/* const { UserTypes } = require('./api/constants/User'); */

const {
  checkAuth,
  checkAdmin,
  checkTestUser
} = require('./api/utils/checkAuth');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors);

app.use('/api/users', userRoutes);
app.use('/api/admin', checkAuth, checkAdmin, adminRoutes);
app.use('/api/test-center-user', checkAuth, checkTestUser, testUserRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route unavailable'
  });
});

Examination.hasMany(Question);
Question.belongsTo(Examination);

Question.hasMany(Answer);
Answer.belongsTo(Question);

sequelize
  .sync({ force: false })
  /* .then(result => {
    return bcrypt.hash('12345', 10);
  })
  .then(result => {
    return User.create({
      username: 'sidraxd',
      password: result,
      fullname: 'Sidra Mowlana',
      email: 'sidra.xd@gmail.com',
      userType: UserTypes.STUDENT_USER
    });
  }) */
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening at port ${port}`);
    });
  });
