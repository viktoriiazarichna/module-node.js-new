const userService = require('../services/user.service');

module.exports = {

    getAllUsers: (req, res) => {
        const users = userService.findAll();
        res.send(users);
    },

    registerUser: (req, res) => {
        userService.insertUser(req.body);
        res.json('Registration is successful');
    },

    loginUser: (req, res) => {
        const users = userService.findAll();
        const userData = req.body;

        const user = users.find(user => (user.email === userData.email) && (user.password === userData.password));
        res.redirect(`/users/${user.id}`);
    },

    getUserById: (req, res) => {
        const user = userService.findOneById();
        res.render('user', {user});
    },



    updateUser: (req, res) => {

        const username = req.params.name

        const userData = req.body

        const existUsers = userService.findAll();


        const findExist = existUsers.find( user => user.name === username )
        if (!findExist) {
            return res.status(409).send({error: true, msg: 'username not exist'})
        }

        const updateUser = existUsers.filter( user => user.name !== username )

        updateUser.push(userData)

        res.send({success: true, msg: 'User data updated successfully'})
    },

    deleteUserById: (req, res) => {
        const {user} = req;

        res.status(204).json(user);
    },

    deleteUserByName: (req, res) => {
        const userName = req.params.name

        //get the existing userdata
        const users = userService.findAll();

        //filter the userdata to remove it
        const filterUser = users.filter( user => user.name !== userName )

        if ( users.length === filterUser.length ) {
            return res.status(204).send({error: true, msg: 'username does not exist'})
        }


        res.send({success: true, msg: 'User removed successfully'})

    }
};

