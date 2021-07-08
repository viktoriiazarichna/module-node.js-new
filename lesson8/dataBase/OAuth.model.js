const { Schema, model } = require('mongoose');

const { dataBaseTableEnum } = require('../constants');

const OAuthSchema = new Schema({
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: dataBaseTableEnum.USER
  },

}, { timestamps: true });

OAuthSchema.pre('find', function() {
  this.populate('user');
});

OAuthSchema.pre('findOne', function() {
  this.populate('user');
});

module.exports = model(dataBaseTableEnum.O_AUTH, OAuthSchema);
