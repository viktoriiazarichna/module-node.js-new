const router = require('express').Router();

const userController = require('../controllers/user.controller');
const { userMiddleware, fileMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.checkUserExist, userController.getUserById);

router.post('/',
  fileMiddleware.checkFiles,
  fileMiddleware.checkAvatar,
  userController.registerUser);

router.delete('/:userId', userController.deleteUser);

router.patch('/:userId', userMiddleware.checkUserValidity, userController.updateUser);

module.exports = router;
