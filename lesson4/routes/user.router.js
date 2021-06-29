const router = require('express').Router();

const userController = require('../controllers/user.controller');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.checkUserExist, userController.getUserById);

router.post('/', userController.registerUser);

router.delete('/:id', userMiddleware.checkUserExist, userController.deleteUserById);

// router.patch('/:username', userMiddleware.checkUserExist, userController.updateUserById);

module.exports = router;
