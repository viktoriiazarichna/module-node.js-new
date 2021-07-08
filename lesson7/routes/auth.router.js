const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post('/login', userMiddleware.checkIsEmailExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkAccessToken, authController.refresh);

module.exports = router;