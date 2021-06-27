const userService = require('../services/user.service');

module.exports = {
    checkUserExist: (req, res, next) => {
        const {userEmail} = req.params;

        const userByEmail = userService.findOneByEmail(userEmail);

        if(userByEmail) {
            throw new Error('User already in database!');
        }
        req.user = userByEmail;

        next();
    }

};