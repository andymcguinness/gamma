/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  contact: function (req, res) {
    var env = require('node-env-file');
    env(__dirname + '/../../.env');

    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_EMAIL,
            pass: process.env.GOOGLE_EMAIL_PW
        }
    });
    transporter.sendMail({
        from: req.body.name + ' &lt;' + req.body.email + '&gt;',
        to: process.env.GOOGLE_EMAIL,
        subject: 'Website Contact Form',
        text: req.body.message
    }, function(error, response){
      if(error){
        return res.view('contact/sent', {
          msg: 'Sorry, there was an error!'
        });
      }else{
        return res.view('contact/sent', {
          msg: 'Message sent successfully! I\'ll get back to you as soon as I can!'
        });
     }
    });
  }
	
};

