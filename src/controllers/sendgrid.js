const sgMail = require('@sendgrid/mail');
const sgApiKey = process.env.SENDGRI_API_KEY;
if (sgApiKey) sgMail.setApiKey(sgApiKey);

// function sendMail(subject, text, to, from="default@blocipedia.com") {
//   sgMail.send({ to, from, subject, text });
// }

// module.exports = sendMail;
function newUserEmail(email, name){
  if (sgApiKey) {
  const message = {
    to: email,
    from: "blocipedia@blocipedia.com",
    message: `Hi, ${name}`,
    subject: "Confirmation email",
    content: [{ type: "text/html", value: `Hi ${name}, welcome to Blocipedia!` }]
  }
  sgMail.send(message);
}
}
module.exports = {
  newUserEmail
}