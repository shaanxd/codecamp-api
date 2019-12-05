const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const cors = require('./api/utils/cors');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors);

app.use((req, res) => {
  res.status(200).json({
    message: 'API WORKS BBY'
  });
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
