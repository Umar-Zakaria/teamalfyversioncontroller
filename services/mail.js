const nodemailer = require("nodemailer");
const config = require("config");
const ejs = require("ejs");
module.exports = (version, updates) => {
  const transport = {
    service: "gmail",
    auth: {
      user: config.get("user"),
      pass: config.get("pass"),
    },
  };

  const mailTrans = nodemailer.createTransport(transport);

  ejs.renderFile(
    __dirname + "/mailtemplate.ejs",
    { version: version, updates: updates },
    (err, data) => {
      options = {
        from: "Umar Abanga matroodzak78@gmail.com",
        to: "umarabanga78@gmail.com",
        subject: "Tuaneka Updates Mails",
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