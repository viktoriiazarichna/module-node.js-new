const { constants: { AUTHORIZATION }, responseCodesEnum } = require('../constants');
const { OAuth } = require('../dataBase');
const { passwordHasher, authHelper } = require('../helpers');
const ErrorHandler = require('../errors');
const { WRONG_CREDENTIALS } = require('../errors/error-messages');

module.exports = {
  login: async (req, res, next) => {
    try {
      if (!req.user) {
        throw new ErrorHandler(401, WRONG_CREDENTIALS.message, WRONG_CREDENTIALS.code);
      }
      const { password: hashPassword, _id } = req.user;
      const { password } = req.body;

      await passwordHasher.compare(hashPassword, password);

      const tokenPair = authHelper.generateTokenPair();

      await OAuth.create({ ...tokenPair, user: _id });

      res.status(responseCodesEnum.OK).json({
        ...tokenPair,
        user: req.user
      });
    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      await OAuth.remove({ accessToken: token });
      res.status(responseCodesEnum.NO_CONTENT).json('Success');
    } catch (e) {
      next(e);
    }
  },

  refresh: (req, res, next) => {
    try {
      const { body } = req;

      res.json(body);
    } catch (e) {
      next(e);
    }
  },
};