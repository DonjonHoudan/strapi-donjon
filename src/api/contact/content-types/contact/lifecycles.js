const nodemailer = require("nodemailer");
const {
  EMAIL_HOST,
  EMAIL_PASSWORD,
  EMAIL_PORT,
  EMAIL_SECURE,
  EMAIL_TO_SEND,
  EMAIL_USED,
} = require("../../../../../constant");

module.exports = {
  beforeCreate(event) {
    const { result, params } = event;

    const transport = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: EMAIL_SECURE,
      auth: {
        user: EMAIL_USED,
        pass: EMAIL_PASSWORD,
      },
    });

    const sendMail = (mail) => {
      const emailOptions = {
        from: EMAIL_USED,
        to: EMAIL_TO_SEND,
        subject: mail.data.objet,
        text: `Utilisateur : ${mail.data.email}, 
      Message : ${mail.data.message}`,
      };

      transport.sendMail(emailOptions, (err) => {
        if (err) {
          console.error(err);
        }
      });
    };

    sendMail(params);
  },
};
