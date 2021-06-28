const userService = require('../services/user.service');

module.exports = {

    getAllUsers: (req, res) => {
        const users = userService.findAll();
        res.send(users);
    },

    getUserById: (req, res) => {
        res.json(req.params.userId);
    },

    registerUser: (req, res) => {
        userService.insertUser(req.body);
        res.json('Registration is successful');
    },

    loginUser: (req, res) => {
        const users = userService.findAll();
        const userData = req.body;

        const user = users.find(user => (user.email === userData.email) && (user.password === userData.password));
        res.json('You are logged in', {user});
    },

    deleteUserById: (req, res) => {
        res.status(204).json(req.params.userId);
    },

    deleteUserByName: (req, res) => {

        const users = userService.findAll();
        const username = req.params.username;
        const filterUser = users.filter(user => user.username !== username);

        if (users.length === filterUser.length) {
            return res.status(204).send('username not found');
        }
        res.send('User deleted successfully');
    },

    updateUser: (req, res) => {

        const username = req.params.username
        const userData = req.body
        const existUsers = userService.findAll();


        const findExist = existUsers.find( user => user.username === username )
        if (!findExist) {
            return res.status(409).send('user not found')
        }
        const updateUser = existUsers.filter( user => user.username !== username )

        updateUser.push(userData)
        res.send('User data updated successfully');
    }
};

