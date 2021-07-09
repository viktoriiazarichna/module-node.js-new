const { responseCodesEnum, emailActionsEnum } = require('../constants');
const { User } = require('../dataBase');
const { passwordHasher } = require('../helpers');
const { mailService } = require('../services');

module.exports = {

  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const userId = req.params;
      const user = await User.find((user) => user.id === userId);
      res.status(responseCodesEnum.OK).json(user);
    } catch (e) {
      next(e);
    }
  },

  registerUser: async (req, res, next) => {
    try {
      const { password, email } = req.body;
      const hashedPassword = await passwordHasher.hash(password);
      const registeredUser = await User.create({ ...req.body, password: hashedPassword });
      await mailService.sendMail(email, emailActionsEnum.WELCOME, { userName: 'Victoria' });
      res.status(responseCodesEnum.CREATED).json(registeredUser);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { userId, email } = req.user;
      const userData = req.body;
      const updatedUser = await User.findOneAndUpdate(userId, userData);
      await mailService.sendMail(email, emailActionsEnum.UPDATED, { userName: 'Victoria' });
      res.status(responseCodesEnum.OK).json(updatedUser);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { userId, email } = req.user;
      const deletedUser = await User.deleteOne(userId);
      await mailService.sendMail(email, emailActionsEnum.DELETED, { userName: 'Victoria' });
      res.status(responseCodesEnum.NO_CONTENT).json(deletedUser);
    } catch (e) {
      next(e);
    }
  }
};
