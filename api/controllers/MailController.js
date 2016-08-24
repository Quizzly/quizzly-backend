var nodemailer = require('nodemailer');

module.exports = {
  toQuizzly: function(req, res) {
    var data = req.params.all();

    var transporter = nodemailer.createTransport({
      service: 'Godaddy',
      auth: {
        user: 'frey.conner24@gmail.com',
        pass: '3ruptureddisks'
      }
    });

    var emailDataToRedShepherd = {
      from: '"Red Shepherd Team" <frey.conner24@gmail.com>',
      to: data.email,
      subject: data.subject,
      text: data.text,
      html: data.html ? data.html : data.text
    };

    transporter.sendMail(emailDataToRedShepherd, function(error, info){
      if(error){
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
  },
  toUser: function(req, res) {
    var data = req.params.all();

    var transporter = nodemailer.createTransport({
      service: 'Godaddy',
      auth: {
        user: 'frey.conner24@gmail.com',
        pass: 'cf123'
      }
    });

    var emailDataToUser = {
      from: '"Quizzly Team" <frey.conner24@gmail.com>',
      to: data.email,
      subject: data.subject,
      text: data.text,
      html: data.html ? data.html : data.text
    };

    transporter.sendMail(emailDataToUser, function(error, info){
      if(error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
  }
};
