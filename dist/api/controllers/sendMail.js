"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../models"));

var _mailSender = _interopRequireDefault(require("../../config/mailSender"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// api/controllers/sendMail.js
var mailController = {
  sendMail: function sendMail(req, res) {
    var userEmails = [];

    _models.default.User.findAll().then(function (response) {
      userEmails = response.map(function (user) {
        return user.email;
      });
      var sender = '<a href="https://mealbuka.herokuapp.com">Meal Buka</a>';
      var recipients = userEmails;
      var mailOptions = {
        from: 'thevetdoctor@gmail.com',
        to: recipients,
        subject: 'We have updated our menu, please visit our website now!',
        html: "Hello esteemed customer, we are glad to be your preferred choice\n                 for great meals with the best of ease and convenience,\n                 kindly check out our latest menu for today, right NOW!\n                <h4>".concat(sender, "</h4>")
      };

      _mailSender.default.sendMail(mailOptions, function (err, info) {
        if (err) {
          res.status(400).json({
            status: 400,
            data: {
              message: "Error sending mail to ".concat(recipients),
              info: info,
              err: err
            }
          });
        } else {
          res.status(200).json({
            status: 200,
            data: {
              message: "Email sent to ".concat(recipients),
              info: info
            }
          });
        }
      });
    });
  }
};
var _default = mailController;
exports.default = _default;