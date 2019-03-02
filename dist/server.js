"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _meals = _interopRequireDefault(require("./api/routes/meals"));

var _menus = _interopRequireDefault(require("./api/routes/menus"));

var _orders = _interopRequireDefault(require("./api/routes/orders"));

var _users = _interopRequireDefault(require("./api/routes/users"));

var _sendMail = _interopRequireDefault(require("./api/routes/sendMail"));

var _models = require("./api/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
// import path from 'path';
// import seeders from './api/models/seeders';
var app = (0, _express.default)();
var eraseDatabaseOnSync = true;
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
})); // app.use(express.static(path.join(__dirname, '/ui')));
// app.use(express.static(__dirname.replace('src', 'ui')));

app.use(_express.default.static(__dirname.replace('dist', 'ui')));
app.use('/api/v1/meals', _meals.default);
app.use('/api/v1/menus', _menus.default);
app.use('/api/v1/orders', _orders.default);
app.use('/auth/users/', _users.default);
app.use('/sendMail', _sendMail.default);
var port = process.env.PORT || 5000;
app.get('/', function (req, res) {
  res.sendFile(__dirname.replace('dist', 'ui\\index.html')); // res.sendFile(__dirname.replace('src', 'ui\\index.html'));
});

_models.sequelize.sync({
  force: eraseDatabaseOnSync
}).then(function () {
  // if (eraseDatabaseOnSync) {
  console.log('seeding DB');
  console.log(seeders); // eslint-disable-next-line no-unused-expressions
  // seeders.seedObj();
  // }
});

app.listen(port, function () {
  console.log("Server started at port ".concat(port, " for Book-A-Meal App!"));
  console.log(__dirname.replace('src', 'ui\\index.html'));
  console.log(__dirname);
});
var _default = app; // "test": "mocha --require @babel/register --recursive",

exports.default = _default;