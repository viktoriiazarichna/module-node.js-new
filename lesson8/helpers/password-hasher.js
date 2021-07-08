const bcrypt = require('bcrypt');
const ErrorHandler = require('../errors');
const { WRONG_CREDENTIALS } = require('../errors/error-messages');
const { responseCodesEnum } = require('../constants');

module.exports = {
  compare: async (hashedPassword, password) => {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatched) {
      throw new ErrorHandler(responseCodesEnum.UNAUTHORIZED, WRONG_CREDENTIALS.message, WRONG_CREDENTIALS.code);
    }
  },

  hash: (password) => bcrypt.hash(password, 10)
};
