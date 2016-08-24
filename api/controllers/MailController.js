var nodemailer = require('nodemailer');

module.exports = {
  hello: function(req, res) {
    var x = 100;
    console.log("x", x);

    x += 100;

    console.log("y", x);
    res.json({sup: "conner"});
  },
  toQuizzly: function(req, res) {
    var data = req.params.all();

    var transporter = nodemailer.createTransport({
      service: 'Godaddy',
      auth: {
        user: 'conner@quizzly.com',
        pass: 'cf123'
      }
    });

    var emailDataToRedShepherd = {
      from: '"Red Shepherd Team" <conner@redshepherd.com>',
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
        user: 'conner@redshepherd.com',
        pass: 'cf123'
      }
    });

    var emailDataToUser = {
      from: '"Red Shepherd Team" <conner@redshepherd.com>',
      to: data.email,
      subject: data.subject,
      text: data.text,
      html: data.html ? data.html : data.text
    };

    transporter.sendMail(emailDataToUser, function(error, info){
      if(error){
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
  }
};
