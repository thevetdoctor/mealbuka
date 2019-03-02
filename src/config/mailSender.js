import nodemailer from 'nodemailer';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  // host: 'smtp.gmail.com',
  auth: {
    user: 'thevetdoctor@gmail.com',
    pass: 'olajumokegmail',
  },
});

export default mailTransport;
