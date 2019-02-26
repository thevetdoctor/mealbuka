"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _meals = _interopRequireDefault(require("./meals"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// api/models/menus.js
var menusRecord = [{
  id: 1,
  date: new Date().toDateString(),
  list: _meals.default.filter(function (meal) {
    return meal.id <= 4;
  })
}, {
  id: 2,
  date: new Date().toDateString(),
  list: _meals.default.filter(function (meal) {
    return meal.id <= 8 && meal.id > 4;
  })
}, {
  id: 3,
  date: new Date().toDateString(),
  list: _meals.default.filter(function (meal) {
    return meal.id <= 12 && meal.id > 8;
  })
}];
var _default = menusRecord;
exports.default = _default;