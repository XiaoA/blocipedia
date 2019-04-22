const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// function sendMail(subject, text, to, from="default@blocipedia.com") {
//   sgMail.send({ to, from, subject, text });
// }

// module.exports = sendMail;


function newUserEmail(email, name){
  const message = {
    to: email,
    from: "blocipedia@blocipedia.com",
    message: `Hi, ${name}`,
    subject: "Confirmation email",
    content: [{ type: "text/html", value: `Hi ${name}, welcome to Blocipedia!` }]
  }
  sgMail.send(message);
}

module.exports = {
  newUserEmail
}