const { constants: { AUTHORIZATION } } = require('../constants');
const { OAuth } = require('../dataBase');
const ErrorHandler = require('../errors');
const { TOKEN_NOT_FOUND, WRONG_TOKEN } = require('../errors/error-messages');
const { authHelper } = require('../helpers');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(401, TOKEN_NOT_FOUND.message, TOKEN_NOT_FOUND.code);
      }

      await authHelper.verifyToken(token);

      const tokenObject = await OAuth.findOne({ accessToken: token });

      if (!tokenObject) {
        throw new ErrorHandler(401, WRONG_TOKEN.message, WRONG_TOKEN.code);
      }
      req.user = tokenObject.user;

      next();
    } catch (e) {
      next(e);
    }
  }
};
