const { responseCodesEnum } = require('../constants');
const { User } = require('../dataBase');
const { passwordHasher } = require('../helpers');

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
      const userId = req.params.id;
      const user = await User.find((user) => user.id === userId);
      res.status(responseCodesEnum.OK).json(user);
    } catch (e) {
      next(e);
    }
  },

  registerUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashedPassword = await passwordHasher.hash(password);
      const registeredUser = await User.create({ ...req.body, password: hashedPassword });

      res.status(responseCodesEnum.CREATED).json(registeredUser);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const userName = req.params.name;
      const deletedUser = await User.deleteOne(userName);
      res.status(responseCodesEnum.NO_CONTENT).json(deletedUser);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const userName = req.params.name;
      const userData = req.body;
      const updatedUser = await User.findOneAndUpdate(userName, userData);
      res.status(responseCodesEnum.OK).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
};
