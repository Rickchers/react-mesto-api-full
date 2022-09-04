const express = require('express');
const { celebrate, Joi } = require('celebrate');

const userControllers = require('../controller/user');

const userRoutes = express.Router();

userRoutes.get('/me', userControllers.getUserProfile);
userRoutes.get('/', userControllers.getUsers);

userRoutes.get('/:id', celebrate({
  // валидируем параметры id
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), userControllers.getUserbyId);

userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), userControllers.updateUser);

userRoutes.patch('/me/avatar', celebrate({
  // валидируем параметры тела запроса
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
}), userControllers.updateUserAvatar);

module.exports = {
  userRoutes,
};
