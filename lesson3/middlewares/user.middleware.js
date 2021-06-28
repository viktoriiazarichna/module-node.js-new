const userService = require('../services/user.service');

module.exports = {
    checkUserExist: (req, res, next) => {
        const {userId} = req.params;

        const userById = userService.findOneById(userId);

        if(!userById) {
            throw new Error('User not found!');
        }
        req.user = userById;

        next();
    },

    checkUser: (req, res, next) => {
        const {userEmail} = req.params;

        const userByEmail = userService.findOneByEmail(userEmail);

        if(userByEmail) {
            throw new Error('User is in dataBase!');
        }
        req.user = userByEmail;

        next();
    },

};