'use strict';
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

function sendEmailService(data, callback) {
  let transporter = nodemailer.createTransport('smtp',{
    service: 'Gmail',
    auth: {
      user: global.config.email.account,
      pass: global.config.email.password
    }
  });

  let mailOptions = {
    from: '"DatioBD" <'+ global.config.email.account +'>', // sender address
    to: data.to.join(','), // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plaintext body
    html: data.html // html body
  };

  transporter.sendMail(mailOptions, function(err){
    if (err){
      global.logger.error(err);
    } else {
      global.logger.debug('Message sent');
    }
    callback(err)
  });
}

module.exports = sendEmailService;