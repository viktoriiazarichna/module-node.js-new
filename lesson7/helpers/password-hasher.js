const bcrypt = require('bcrypt');
const ErrorHandler = require('../errors');
const { WRONG_CREDENTIALS } = require('../errors/error-messages');

module.exports = {
  compare: async (hashedPassword, password) => {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatched) {
      throw new ErrorHandler(401, WRONG_CREDENTIALS.message, WRONG_CREDENTIALS.code);
    }
  },

  hash: (password) => bcrypt.hash(password, 10)
};
