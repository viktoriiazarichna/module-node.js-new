const { User } = require('../dataBase');
const { responseCodesEnum } = require('../constants');
const ErrorHandler = require('../errors');
const { USER_NOT_FOUND, USER_EXISTS } = require('../errors/error-messages');
const userValidator = require('../validators/user.validator');

module.exports = {
  checkUserExist: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const userById = await User.findById(userId);

      if (!userById) {
        throw new ErrorHandler(responseCodesEnum.NOT_FOUND, USER_NOT_FOUND.message, USER_NOT_FOUND.code);
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
        throw new ErrorHandler(responseCodesEnum.CREATED, USER_EXISTS.message, USER_EXISTS.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
