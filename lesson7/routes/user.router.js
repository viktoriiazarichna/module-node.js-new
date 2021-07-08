const router = require('express').Router();

const userController = require('../controllers/user.controller');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.checkUserExist, userController.getUserById);

router.post('/', userMiddleware.checkUserValidity, userController.registerUser);

router.delete('/:userId', userController.deleteUser);

router.patch('/:username', userMiddleware.checkUserValidity, userController.updateUser);

module.exports = router;
