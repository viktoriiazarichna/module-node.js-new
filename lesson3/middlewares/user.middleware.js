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
    }


};