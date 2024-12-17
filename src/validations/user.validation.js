const Joi = require('joi');
const messages = require('../utils/messages');

const login = {
  body: Joi.object().keys({
    email: Joi.string()
    .min(3) // Minimum length of 3 characters
    .required(),
    password: Joi.string()
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}'))
    .message(messages.error.invalidLoginCredentials)
    .required(),
  }),
};

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
    .min(3) // Minimum length of 3 characters
    .required(),
    password: Joi.string()
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}'))
    .message(messages.policy.password),
    country: Joi.string().required(),
  }),
};


module.exports = {
  login,
  register
};