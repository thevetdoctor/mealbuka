"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.sequelize = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _config = _interopRequireDefault(require("../../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// api/models/index.js
// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   {
//     host: config.host,
//     port: config.port,
//     dialect: 'postgres',
//     // dialectOptions: {
//     //   ssl: true,
//     // },
//   },
// );
var sequelize = new _sequelize.default(_config.default.herokuPostgresUri, {
  dialectOptions: {
    ssl: true
  }
});
exports.sequelize = sequelize;
var models = {
  Meal: sequelize.import('./mealsModel'),
  Menu: sequelize.import('./menusModel'),
  Order: sequelize.import('./ordersModel'),
  User: sequelize.import('./usersModel')
};
Object.keys(models).forEach(function (key) {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});
var _default = models;
exports.default = _default;