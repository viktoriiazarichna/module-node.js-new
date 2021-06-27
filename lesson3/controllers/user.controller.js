const userService = require('../services/user.service');

module.exports = {

    getAllUsers: (req, res) => {
        const users = userService.findAll();
        res.json(users);
    },

    registerUser: (req, res) => {
        const users = userService.findAll();
        userService.insertUser(req.body);
        res.json(users);
    },

    loginUser: (req, res) => {
        const userEmail = req.params.email
        userService.findOneByEmail(req.body);
        res.json(userEmail);
    },

    getUserById: (req, res) => {
        const user = req.user;
        res.json(user);
    },

    updateUserById: (req, res) => {
        const {user} = req;
        res.json(user);
    },

    deleteUserById: (req, res) => {
        const {user} = req;

        res.status(204).json(user);
    }
};

