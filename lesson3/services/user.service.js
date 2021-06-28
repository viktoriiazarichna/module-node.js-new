const existUsers = require('../dataBase/usersBase.json');



module.exports = {
    findAll: () => existUsers,

    insertUser: ({id, name, email, password}) => {
        existUsers.push({id, name, email, password});
    },

    findOneById: (userId) => existUsers[userId]
}