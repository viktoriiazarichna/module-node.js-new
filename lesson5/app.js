const express = require('express');
const mongoose = require('mongoose');

const { userRouter, authorizationRouter } = require('./routes');
const { ROUT_NOT_FOUND, UNKNOWN_ERROR } = require('./errors/error-messages');
const { PORT } = require('./constants/constant');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/auth', authorizationRouter);
app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_handleErrors);

app.listen(PORT, () => {
  console.log('App listen 3000');
});

function _handleErrors(err, req, res, next) {
  res.status(err.status).json(0, UNKNOWN_ERROR.message, UNKNOWN_ERROR.code);
}

function _notFoundHandler(err, req, res, next) {
  next(404, ROUT_NOT_FOUND.message, ROUT_NOT_FOUND.code);
}

function _mongooseConnector() {
  mongoose.connect('mongodb://localhost:27017/dec-2020', { useNewUrlParser: true, useUnifiedTopology: true });
}
