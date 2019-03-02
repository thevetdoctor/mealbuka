/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// api/controllers/users.js

import jwt from 'jsonwebtoken';
import User from '../models/users';
import auth from '../auth/index';
import models from '../models';


const validUser = (user) => {
  const validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(user.email) && user.email.trim() !== '';

  const validPassword = typeof user.password === 'string' && user.password.trim() !== '' && user.password.trim().length >= 6;

  return validEmail && validPassword;
};


const UsersController = {
  signup: (req, res, next) => {
    const user = new User(null, req.body.name, req.body.email, req.body.password);

    // check validity of user name & password
    if (validUser(req.body)) {
      // check if user is already registered
      models.User.findAll()
        .then((response) => {
          const userIds = response.map(value => value.id);
          const userEmails = response.map(value => value.email);
          const lastUserId = Math.max(...userIds);
          if (userEmails.includes(user.email)) {
            res.status(400).json({
              status: 400,
              error: 'Email already used',
            });
          } else {
            // Assign a unique ID to new user
            user.id = lastUserId + 1;
            // save user in Users table in DB
            models.User.create(user)
              .then((result) => {
                const newUser = {
                  id: result.id,
                  name: result.name,
                  email: result.email,
                  isAdmin: result.isAdmin,
                };
                  // create a jwt token for the new user for authentication purposes
                const token = jwt.sign({ newUser }, 'secretKey', { expiresIn: '1min' }); // end of jwt signing
                res.status(200).json({
                  status: 200,
                  message: 'New User created',
                  newUser,
                  token,
                });
              }); // end of models (2)
          }// end of else (user is a new user)
        }); // end of .then of models (1)
    } else {
    // send an error
      res.status(401).json({
        message: 'Please check your inputs',
        error: 'Signup Failed',
        reasons: 'Invalid Email/Password must be minimum of 6 characters',
      });
    }
  },


  login: (req, res, next) => {
    const user = { email: req.body.email, password: req.body.password };
    if (user.email !== '' && user.password !== '') {
      // Query DB for credentials
      models.User.findAll()
        .then((response) => {
          const userEmails = response.map(value => value.email);
          const userIndex = userEmails.indexOf(user.email);
          const newUser = response[userIndex];
          if (user.email === newUser.email) {
            if (user.password === newUser.password) {
              newUser.password = null;
              const token = jwt.sign({ newUser }, 'secretKey', { expiresIn: '1min' });
              res.status(200).json({
                status: 200,
                newUser,
                message: 'Login successful',
                token,
              });
            } else {
              res.status(400).json({
                status: 400,
                error: 'Invalid password',
              });
            }
          } else {
            res.status(400).json({
              status: 400,
              error: 'Invalid email',
            });
          }
        });
    } else {
      res.status(400).json({
        status: 400,
        error: 'Please enter your email & password',
      });
    }
  },


  // admin: (req, res, next) => {
  //   // const userList = usersRecord.map(user => user);

  //   jwt.verify(req.token, 'secretKey', (err, data) => {
  //     if (err) {
  //       res.sendStatus(403);
  //     } else {
  //       res.status(200).json({
  //         status: 200,
  //         message: 'Registered users displayed',
  //         // list: userList,
  //       });
  //     }
  //   });
  // },
};


export default UsersController;
