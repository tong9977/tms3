// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const job = context.result;
    console.log("Email : " + job.Email);

    const nodemailer = require('nodemailer');

    // config สำหรับของ gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'icesoftware2016m@gmail.com', // your email
        pass: 'Sinetong9977' // your email password
      }
    });

    let mailOptions = {
      from: 'icesoftware2016m@gmail.com',                // sender
      to: 'suriyapong_s@hotmail.com',                // list of receivers
      subject: 'Hello from sender',              // Mail subject
      html: '<b>Do you receive this mail?</b>'   // HTML body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err)
        console.log(err)
      else
        console.log(info);
    });


    return context;
  };
};
