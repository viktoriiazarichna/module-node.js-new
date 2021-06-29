const { User } = require('../dataBase');
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
  }
};
