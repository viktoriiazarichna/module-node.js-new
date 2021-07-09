const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { constants: { ADMIN_EMAIL_PASSWORD, ADMIN_EMAIL }, responseCodesEnum } = require('../constants');
const templateInfo = require('../email-templates/index');
const ErrorHandler = require('../errors');
const { WRONG_TEMPLATE } = require('../errors/error-messages');


const templateParser = new EmailTemplates({
  views: {
    root: path.join(process.cwd(), 'email-templates')
  }
});

const transporter = nodemailer.createTransport({

  service: 'gmail',
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_EMAIL_PASSWORD
  }
});

const sendMail = async (userMail, action, context) => {
  const templateToSend = templateInfo[action];

  if (!templateToSend) {
    throw new ErrorHandler(responseCodesEnum.WRONG_TEMPLATE, WRONG_TEMPLATE.message, WRONG_TEMPLATE.code);
  }
  const html = await templateParser.render(templateToSend.templateName, context);

  await transporter.sendMail({
    from: 'No reply',
    to: userMail,
    subject: templateToSend.subject,
    html
  });
};

module.exports = {
  sendMail
};
