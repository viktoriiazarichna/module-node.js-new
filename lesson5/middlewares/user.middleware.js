const { User } = require('../dataBase');
const userValidator = require('../validators/user/user.validator');
const ErrorHandler = require('../errors/ErrorHandler');
const { USER_NOT_FOUND } = require('../errors/error-messages');
// const userService = require('../services/user.service');

module.exports = {
  checkUserExist: async (req, res, next) => {
    try {
      const { userId } = req.params.id;

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

  checkEmailExist: async (req, res, next) => {
    try {
      const { email } = req.body;

      const userByEmail = await User.findOne({ email });
      if (userByEmail) {
        throw new Error('user with this email already exists');
      }
      next();
    } catch (e) {
      next(e);
    }
  }
};
