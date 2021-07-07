const { constants: { AUTHORIZATION } } = require('../constants');
const { OAuth } = require('../dataBase');
const { ErrorHandler, errorMessages } = require('../errors');
const { authHelper } = require('../helpers');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(401, errorMessages.TOKEN_NOT_FOUND.message, errorMessages.TOKEN_NOT_FOUND.code);
      }

      await authHelper.verifyToken(token);

      const tokenObject = await OAuth.findOne({ accessToken: token });

      if (!tokenObject) {
        throw new ErrorHandler(401, errorMessages.WRONG_TOKEN.message, errorMessages.WRONG_TOKEN.code);
      }
      req.user = tokenObject.user;

      next();
    } catch (e) {
      next(e);
    }
  }
};
