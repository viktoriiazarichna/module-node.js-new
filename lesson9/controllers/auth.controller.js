const {
  constants: { AUTHORIZATION }, emailActionsEnum, responseCodesEnum, responseEnum
} = require('../constants');
const { OAuth } = require('../dataBase');
const { passwordHasher, authHelper } = require('../helpers');
const ErrorHandler = require('../errors');
const { WRONG_CREDENTIALS } = require('../errors/error-messages');
const { mailService } = require('../services');

module.exports = {
  login: async (req, res, next) => {
    try {
      if (!req.user) {
        throw new ErrorHandler(responseCodesEnum.UNAUTHORIZED, WRONG_CREDENTIALS.message, WRONG_CREDENTIALS.code);
      }

      const { password: hashPassword, _id, email } = req.user;
      const { password } = req.body;

      await passwordHasher.compare(hashPassword, password);
      await mailService.sendMail(email, emailActionsEnum.WELCOME, { userName: 'Victoria' });

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
      await mailService.sendMail('viktoriiazarichna@gmail.com', emailActionsEnum.WELCOME, { userName: 'Victoria' });
      res.status(responseCodesEnum.NO_CONTENT).json(responseEnum.SUCCESS);
    } catch (e) {
      next(e);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);
      const { _id } = req.user;

      await OAuth.remove({ refreshToken: token });

      const refreshTokenPair = authHelper.generateTokenPair();
      await OAuth.create({ ...refreshTokenPair, user: _id });
      res.json(responseEnum.SUCCESS);
    } catch (e) {
      next(e);
    }
  }
};
