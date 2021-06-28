const router = require('express').Router();

const userController = require('../controllers/user.controller');
const {userMiddleware} = require('../middlewares');


router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getUserById);

router.post('/register', userMiddleware.checkUser, userController.registerUser);

router.post('/login',  userController.loginUser);

router.delete('/:userId', userMiddleware.checkUserExist, userController.deleteUserById);

router.patch('/:username', userController.updateUser);

module.exports = router;

