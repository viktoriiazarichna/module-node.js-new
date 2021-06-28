const express = require('express');
const path = require('path');
const fs = require('fs');
const utils = require('util');

const {userRouter} = require('./lesson3/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));

app.use('/users', userRouter);

const readFilePromise = utils.promisify(fs.readFile);

readFilePromise('./lesson3/dataBase/usersBase.json').then(users => {
    console.log(users.toString());
});

app.listen(3000, () => {
    console.log('App listen 3000')
});











