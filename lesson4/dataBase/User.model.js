const { Schema, model } = require('mongoose');

const { dataBaseTableEnum } = require('../constants');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true});

module.exports = model(dataBaseTableEnum.USER, userSchema);
