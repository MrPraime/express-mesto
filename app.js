const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', () => {
  console.log('Успех!');
});

app.use((req, res, next) => {
  req.user = {
    _id: '620401c61f05eb04de2da006',

  };
  console.log(req.user);
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on por ${PORT}`);
});