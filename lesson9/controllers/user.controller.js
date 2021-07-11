const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v1;
const { promisify } = require('util');

const { responseCodesEnum, emailActionsEnum } = require('../constants');
const { User } = require('../dataBase');
const { passwordHasher, userHelper } = require('../helpers');
const { mailService } = require('../services');

const mkdirPromise = promisify(fs.mkdir);

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
      const {
        avatar,
        body: { password }
      } = req;

      const hashedPassword = await passwordHasher.hash(password);
      const registeredUser = await User.create({ ...req.body, password: hashedPassword });

      const { _id } = registeredUser;

      if (avatar) {
        const { finalPath, photoPath } = await _photoDirBuilder(avatar.name, _id, 'users');
        await avatar.mv(finalPath);

        await User.updateOne({ _id }, { avatar: photoPath });
      }

      const normalizedUser = userHelper.userNormalizator(registeredUser.toJSON());

      res.status(responseCodesEnum.CREATED).json(normalizedUser);
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

async function _photoDirBuilder(fileName, itemId, itemType) {
  const pathWithoutStatic = path.join(itemType, itemId.toString(), 'photos');
  const photoDirectory = path.join(process.cwd(), 'static', pathWithoutStatic);

  const fileExtension = fileName.split('.').pop();
  const photoName = `${uuid()}.${fileExtension}`;
  const finalPath = path.join(photoDirectory, photoName);

  await mkdirPromise(photoDirectory, { recursive: true });

  return {
    finalPath,
    photoPath: path.join(pathWithoutStatic, photoName)
  };
}
