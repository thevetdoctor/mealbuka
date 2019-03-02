// api/controllers/sendMail.js

import models from '../models';
import mailTransport from '../../config/mailSender';

const mailController = {
  sendMail: (req, res) => {
    let userEmails = [];
    models.User.findAll()
      .then((response) => {
        userEmails = response.map(user => user.email);
        const sender = '<a href="https://mealbuka.herokuapp.com">Meal Buka</a>';
        const recipients = userEmails;
        const mailOptions = {
          from: 'thevetdoctor@gmail.com',
          to: recipients,
          subject: 'We have updated our menu, please visit our website now!',
          html: `Hello esteemed customer, we are glad to be your preferred choice
                 for great meals with the best of ease and convenience,
                 kindly check out our latest menu for today, right NOW!
                <h4>${sender}</h4>`,
        };
        mailTransport.sendMail(mailOptions, (err, info) => {
          if (err) {
            res.status(400).json({
              status: 400,
              data: {
                message: `Error sending mail to ${recipients}`,
                info,
                err,
              },
            });
          } else {
            res.status(200).json({
              status: 200,
              data: {
                message: `Email sent to ${recipients}`,
                info,
              },
            });
          }
        });
      });
  },
};


export default mailController;
