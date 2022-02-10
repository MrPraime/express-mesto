
const express = require('express');
const mongoose = require('mongoose');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());

app.use('/users', routesUsers);
app.use('/cards', routesCards);

mongoose.connect('mongodb://localhost:27017/mestodb', () => {
  console.log('Успех!');
});

app.use((req, res, next) => {
  req.user = {
    _id: '620401c61f05eb04de2da006'
  };

  next();
});


app.listen(PORT, () => {
  console.log(`App listening on por ${PORT}`);
});
