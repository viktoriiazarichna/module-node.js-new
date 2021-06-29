const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./routes');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_handleErrors);

app.listen(3000, () => {
  console.log('App listen 3000');
});

function _handleErrors(err, req, res, next) {
  res
    .status(err.status)
    .json({
      message: err.message || 'Unknown error',
      customCode: err.code || 0
    });
}

function _notFoundHandler(err, req, res, next) {
  next({
    status: err.status || 404,
    message: err.message || 'Rout not found'
  });
}

function _mongooseConnector() {
  mongoose.connect('mongodb://localhost:27017/dec-2020', { useNewUrlParser: true, useUnifiedTopology: true });
}
