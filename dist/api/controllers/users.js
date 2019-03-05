"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _users = _interopRequireDefault(require("../models/users"));

var _index = _interopRequireDefault(require("../auth/index"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var validUser = function validUser(user) {
  var validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(user.email) && user.email.trim() !== '';
  var validPassword = typeof user.password === 'string' && user.password.trim() !== '' && user.password.trim().length >= 6;
  return validEmail && validPassword;
};

var UsersController = {
  signup: function signup(req, res, next) {
    var user = new _users.default(null, req.body.name, req.body.email, req.body.password); // check validity of user name & password

    if (validUser(req.body)) {
      // check if user is already registered
      _models.default.User.findAll().then(function (response) {
        var userIds = response.map(function (value) {
          return value.id;
        });
        var userEmails = response.map(function (value) {
          return value.email;
        });
        var lastUserId = Math.max.apply(Math, _toConsumableArray(userIds));

        if (userEmails.includes(user.email)) {
          res.status(400).json({
            status: 400,
            error: 'Email already used'
          });
        } else {
          // Assign a unique ID to new user
          user.id = lastUserId + 1; // save user in Users table in DB

          _models.default.User.create(user).then(function (result) {
            var newUser = {
              id: result.id,
              name: result.name,
              email: result.email,
              isAdmin: result.isAdmin
            }; // create a jwt token for the new user for authentication purposes

            var token = _jsonwebtoken.default.sign({
              newUser: newUser
            }, 'secretKey', {
              expiresIn: '1min'
            }); // end of jwt signing


            res.status(200).json({
              status: 200,
              message: 'New User created',
              newUser: newUser,
              token: token
            });
          }); // end of models (2)

        } // end of else (user is a new user)

      }); // end of .then of models (1)

    } else {
      // send an error
      res.status(401).json({
        message: 'Please check your inputs',
        error: 'Signup Failed',
        reasons: 'Invalid Email/Password must be minimum of 6 characters'
      });
    }
  },
  login: function login(req, res, next) {
    var user = {
      email: req.body.email,
      password: req.body.password
    };

    if (user.email !== '' && user.password !== '') {
      // Query DB for credentials
      _models.default.User.findAll().then(function (response) {
        var userEmails = response.map(function (value) {
          return value.email;
        });
        var userIndex = userEmails.indexOf(user.email);
        var newUser = response[userIndex];

        if (user.email === newUser.email) {
          if (user.password === newUser.password) {
            newUser.password = null;

            var token = _jsonwebtoken.default.sign({
              newUser: newUser
            }, 'secretKey', {
              expiresIn: '1min'
            });

            res.status(200).json({
              status: 200,
              newUser: newUser,
              message: 'Login successful',
              token: token
            });
          } else {
            res.status(400).json({
              status: 400,
              error: 'Invalid password'
            });
          }
        } else {
          res.status(400).json({
            status: 400,
            error: 'Invalid email'
          });
        }
      });
    } else {
      res.status(400).json({
        status: 400,
        error: 'Please enter your email & password'
      });
    }
  },
  admin: function admin(req, res, next) {
    _models.default.User.findAll().then(function (response) {
      if (response.length > 0) {
        var userList = response;
        res.status(200).json({
          status: 200,
          message: 'Registered users displayed',
          list: userList
        });
      } else {
        res.status(400).json({
          status: 400,
          message: 'No users available'
        });
      }
    });
  }
};
var _default = UsersController;
exports.default = _default;