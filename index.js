const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const sequelize = require('./api/utils/database');
const cors = require('./api/utils/cors');
const userRoutes = require('./api/routes/User');
const adminRoutes = require('./api/routes/Admin');
const User = require('./api/models/User');
const { UserTypes } = require('./api/constants/User');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors);

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route unavailable'
  });
});

sequelize
  .sync({ force: false })
  /* .then(result => {
    return bcrypt.hash('12345', 10);
  })
  .then(result => {
    return User.create({
      username: 'shaanxd',
      password: result,
      fullname: 'Shahid Hassan',
      email: 'shaahid.xd@gmail.com',
      userType: UserTypes.ADMIN_USER
    });
  }) */
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening at port ${port}`);
    });
  });
