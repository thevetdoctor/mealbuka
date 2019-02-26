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
      _models.default.User.findAll().then(function (response) {
        var userIds = response.map(function (value) {
          return value.id;
        });
        var userNames = response.map(function (value) {
          return value.name;
        });
        var lastUserId = Math.max.apply(Math, _toConsumableArray(userIds));

        if (userNames.includes(user.name)) {
          res.status(400).json({
            status: 400,
            error: 'Email already used'
          });
        } else {
          user.id = lastUserId + 1; // save user in User table in DB

          _models.default.User.create(user).then(function (result) {
            res.status(200).json({
              status: 200,
              message: 'New User created',
              result: result
            });
          });
        }
      });
    } else {
      // send an error
      res.status(401).json({
        message: 'Signup Failed',
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
      _models.default.User.findAll().then(function (response) {
        var userEmails = response.map(function (value) {
          return value.email;
        });
        var userIndex = userEmails.indexOf(user.email);
        console.log(userEmails);
        console.log(userIndex);
        var newUser = response[userIndex];
        console.log(newUser);

        if (newUser.email === user.email) {
          if (newUser.password === user.password) {
            _jsonwebtoken.default.sign({
              user: user
            }, 'secretKey', {
              expiresIn: '1min'
            }, function (err, token) {
              if (err) {
                res.status(400).json({
                  status: 400,
                  error: 'Authorization failed'
                });
              }

              res.status(200).json({
                status: 200,
                newUser: newUser,
                message: 'Login successful',
                token: token
              });
            });
            /* end of jwt signing */

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
    // const userList = usersRecord.map(user => user);
    _jsonwebtoken.default.verify(req.token, 'secretKey', function (err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
        res.status(200).json({
          status: 200,
          message: 'Registered users displayed' // list: userList,

        });
      }
    });
  }
};
var _default = UsersController;
exports.default = _default;