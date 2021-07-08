const Joi = require('joi');

const { userRolesEnum, regexp } = require('../constants');

module.exports = {
  createUser: Joi.object().keys({
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().regex(regexp.EMAIL_REGEXP),
    password: Joi.string().min(8).max(256).required(),
    age: Joi.number().min(1).max(120),
    role: Joi.string().allow(...Object.values(userRolesEnum))
  })
};
