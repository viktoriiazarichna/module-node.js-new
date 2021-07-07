const { User } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const { USER_NOT_FOUND } = require('../errors/error-messages');
// const userService = require('../services/user.service');
const userValidator = require('../validators/user.validator');

module.exports = {
  checkUserExist: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const userById = await User.findById(userId);

      if (!userById) {
        throw new ErrorHandler(404, USER_NOT_FOUND.message, USER_NOT_FOUND.code);
      }
      req.user = userById;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkUserValidity: (req, res, next) => {
    try {
      const { error } = userValidator.createUser.validate(req.body);

      if (error) {
        throw new Error(error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsEmailExist: async (req, res, next) => {
    try {
      const { email } = req.body;

      const userByEmail = await User.findOne({ email });

      if (userByEmail) {
        throw new Error('User is already in database');
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  getUserByDynamicParam: (paramName, searchIn = 'body', dbKey = paramName) => async (req, res, next) => {
    try {
      const valueOfParams = req[searchIn][paramName];

      const user = await User.findOne({ [dbKey]: valueOfParams }).select('+password');

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }
};
