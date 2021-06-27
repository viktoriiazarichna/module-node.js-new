const router = require('express').Router();

const userController = require('../controllers/user.controller');
const {userMiddleware} = require('../middlewares');


router.get('/', userController.getAllUsers);

router.post('/register', userMiddleware.checkUserExist, userController.registerUser);

router.post('/login', userMiddleware.checkUserExist, userController.loginUser);

router.get('/:userId', userController.getUserById);

router.delete('/:userId', userController.deleteUserById);



module.exports = router;
