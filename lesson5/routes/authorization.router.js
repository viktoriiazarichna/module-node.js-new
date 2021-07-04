const router = require('express').Router();
const { authorizationController } = require('../controllers');

router.post('/', authorizationController.loginUser);

module.exports = router;
