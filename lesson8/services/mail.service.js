const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { ADMIN_EMAIL_PASSWORD, ADMIN_EMAIL } = require('../constants/constant');
const templateInfo = require('../email-templates/index');

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

const sendMail = async (userMail, action) => {
  const templateToSend = templateInfo[action];

  if (!templateToSend) {
    throw new Error('Wrong template');
  }
  const html = await templateParser.render(templateToSend.templateName);

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
