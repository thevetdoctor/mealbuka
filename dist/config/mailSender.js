"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var mailTransport = _nodemailer.default.createTransport({
  service: 'gmail',
  // host: 'smtp.gmail.com',
  auth: {
    user: 'thevetdoctor@gmail.com',
    pass: 'olajumokegmail'
  }
});

var _default = mailTransport;
exports.default = _default;