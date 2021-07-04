const ErrorHandler = require('../errors/ErrorHandler');
const { WRONG_CREDENTIALS } = require('../errors/error-messages');

const { User } = require('../dataBase');
const { passwordHasher } = require('../helpers');

module.exports = {

  loginUser: async (req, res) => {
    try {
      const { password, email } = req.body;

      const userByEmail = await User.findOne({ email });

      if (!userByEmail) {
        throw new ErrorHandler(401, WRONG_CREDENTIALS.message, WRONG_CREDENTIALS.code);
      }
      await passwordHasher.compare(userByEmail.password, password);

      res.json(userByEmail);
    } catch (e) {
      console.log(e);
      res.json(e.message);
    }
  }
};
