require('dotenv').config();
console.log(process.env.NODE_ENV);

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const validator = require('validator');

const { celebrate, Joi, errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./src/middlewares/logger');

const userControllers = require('./src/controller/user');
const auth = require('./src/middlewares/auth');
const { errorHandler } = require('./utils');

const { routes } = require('./src/routes/index');

const { PORT = 3001 } = process.env;

const app = express();
app.use(cors());

// подключаемся к серверу mongo
async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('Connected to db');

  await app.listen(PORT);
  console.log(`Server listen on port ${PORT}`);
}

main();

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов до всех обработчиков роутов

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), userControllers.login);

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation error');
};

// регистрация нового пользователя
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(method),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), userControllers.createUser);

// логирование методов запроса
/*
app.use((req, res, next) => {
  console.log(`
    ${req.method}: ${req.path}
    ${JSON.stringify(req.body)}
    ${JSON.stringify(req.user._id)}
  `);
  next();
});
*/
app.use(auth);

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок после обработчиков роутов и до обработчиков ошибок

// здесь обрабатываем все ошибки

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // централизованный обработчик
