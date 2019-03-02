"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var menusController = {
  addMenu: function addMenu(req, res) {
    var menu = {
      id: null,
      date: new Date().toDateString(),
      list: []
    };

    _models.default.Menu.findAll({
      where: {
        date: new Date().toDateString()
      }
    }).then(function (menus) {
      var menuIds = menus.map(function (x) {
        return x.id;
      });
      var menuDates = menus.map(function (y) {
        return y.date;
      });
      var lastId = Math.max.apply(Math, _toConsumableArray(menuIds));

      if (!menuDates.includes(menu.date)) {
        menu.id = lastId + 1;

        _models.default.Menu.create(menu).then(function (result) {
          res.status(200).json({
            status: 200,
            data: result,
            message: 'New Menu created'
          });
        });
      } else {
        res.status(400).json({
          status: 400,
          error: 'Menu already exist'
        });
      }
    });
  },
  addMenuSpecial: function addMenuSpecial(req, res) {
    var menu = {
      id: null,
      date: req.body.date,
      list: req.body.list.split(',')
    };
    console.log(menu);

    _models.default.Menu.findAll().then(function (menus) {
      var menuIds = menus.map(function (x) {
        return x.id;
      });
      var menuDates = menus.map(function (y) {
        return y.date;
      });
      var lastId = Math.max.apply(Math, _toConsumableArray(menuIds));

      if (!menuDates.includes(menu.date)) {
        menu.id = lastId + 1;

        _models.default.Menu.create(menu).then(function (result) {
          res.status(200).json({
            status: 200,
            data: result,
            message: 'New Menu created'
          });
        });
      } else {
        res.status(400).json({
          status: 400,
          error: 'Menu already exist'
        });
      }
    });
  },
  getMenu: function getMenu(req, res) {
    _models.default.Menu.findAll({
      where: {
        date: new Date().toDateString()
      }
    }).then(function (menus) {
      if (menus.length > 0) {
        res.status(200).json({
          status: 200,
          data: menus,
          message: 'Menu displayed'
        });
      } else {
        res.status(400).json({
          status: 400,
          error: 'Menu not available'
        });
      }
    });
  },
  getAllMenu: function getAllMenu(req, res) {
    _models.default.Menu.findAll().then(function (menus) {
      if (menus.length > 0) {
        res.status(200).json({
          status: 200,
          data: menus,
          message: 'All Menu(s) displayed'
        });
      } else {
        res.status(400).json({
          status: 400,
          error: 'Menu not available'
        });
      }
    });
  }
};
var _default = menusController;
exports.default = _default;