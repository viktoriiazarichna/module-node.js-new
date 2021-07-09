const { emailActionsEnum } = require('../constants');

module.exports = {
  [emailActionsEnum.WELCOME]: {
    templateName: 'welcome',
    subject: 'Welcome on board'
  },

  [emailActionsEnum.UPDATED]: {
    templateName: 'update',
    subject: 'Account is updated'
  },

  [emailActionsEnum.DELETED]: {
    templateName: 'delete',
    subject: 'Account is deleted'
  }
};
