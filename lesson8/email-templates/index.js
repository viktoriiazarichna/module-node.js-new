const { emailActionsEnum } = require('../constants');

module.exports = {
  [emailActionsEnum.WELCOME]: {
    templateName: 'welcome',
    subject: 'Welcome on board'
  }
};
