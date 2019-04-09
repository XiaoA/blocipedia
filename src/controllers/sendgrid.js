const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendMail(subject, text, to, from="default@blocipedia.com") {
  sgMail.send({ to, from, subject, text });
}

module.exports = sendMail;