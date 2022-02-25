/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-error');
const { signInValidation, signUpValidation } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', () => {
  // eslint-disable-next-line no-console
  console.log('Успех!');
});

app.post('/signin', signInValidation, login);
app.post('/signup', signUpValidation, createUser);
app.use((req, res) => {
  throw new NotFoundError('Страница не найдена');
});
app.use('/', auth, routes);

app.use(errors());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on por ${PORT}`);
});
