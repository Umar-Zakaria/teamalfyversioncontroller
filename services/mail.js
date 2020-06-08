const nodemailer = require("nodemailer");
const config = require("config");
const ejs = require("ejs");
module.exports = (version, updates, project, to) => {
  const transport = {
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: config.get("user"),
      pass: config.get("pass"),
    },
  };

  const mailTrans = nodemailer.createTransport(transport);

  ejs.renderFile(
    __dirname + "/mailtemplate.ejs",
    { version, updates, project },
    (err, data) => {
      const options = {
        from: "Umar Abanga matroodzak78@gmail.com",
        to: to,
        subject: `${project} Updates Mails`,
        html: data,
      };
      if (err) return console.log(err);

      mailTrans.sendMail(options, (err, info) => {
        if (err) return console.log(err);
        console.log("sent");
      });
    }
  );
};
