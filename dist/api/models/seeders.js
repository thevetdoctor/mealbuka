"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import mealsRecord from './meals';
// api/models/seeders.js
var seeders = {
  seedObj: function () {
    var _seedObj = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.default.mark(function _callee() {
      return _regeneratorRuntime.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _index.default.User.create({
                id: 1,
                name: 'obafemi',
                email: 'thevetdoctor@gmail.com',
                password: '123456',
                isAdmin: true
              });

            case 2:
              _context.next = 4;
              return _index.default.User.create({
                id: 2,
                name: 'demilade',
                email: 'thevetdoctor@yahoo.com',
                password: 'demilade',
                isAdmin: false
              });

            case 4:
              _context.next = 6;
              return _index.default.User.create({
                id: 3,
                name: 'admin',
                email: 'admin@gmail.com',
                password: 'admin',
                isAdmin: true
              });

            case 6:
              _context.next = 8;
              return _index.default.Order.create({
                id: 1,
                userId: 1,
                mealId: 1,
                date: new Date().toDateString()
              });

            case 8:
              _context.next = 10;
              return _index.default.Order.create({
                id: 2,
                userId: 2,
                mealId: 1,
                date: new Date().toDateString()
              });

            case 10:
              _context.next = 12;
              return _index.default.Order.create({
                id: 3,
                userId: 1,
                mealId: 3,
                date: new Date().toDateString()
              });

            case 12:
              _context.next = 14;
              return _index.default.Order.create({
                id: 4,
                userId: 1,
                mealId: 5,
                date: new Date().toDateString()
              });

            case 14:
              _context.next = 16;
              return _index.default.Order.create({
                id: 5,
                userId: 2,
                mealId: 3,
                date: new Date().toDateString()
              });

            case 16:
              _context.next = 18;
              return _index.default.Order.create({
                id: 6,
                userId: 3,
                mealId: 6,
                date: new Date().toDateString()
              });

            case 18:
              _context.next = 20;
              return _index.default.Meal.create({
                id: 1,
                name: 'White Rice & Chicken',
                price: '30.00'
              });

            case 20:
              _context.next = 22;
              return _index.default.Meal.create({
                id: 2,
                name: 'Jollof Rice & Chicken',
                price: '40.00'
              });

            case 22:
              _context.next = 24;
              return _index.default.Meal.create({
                id: 3,
                name: 'Beans & Fried Plantain',
                price: '35.00'
              });

            case 24:
              _context.next = 26;
              return _index.default.Meal.create({
                id: 4,
                name: 'Boiled Yam & Egg Sauce',
                price: '30.00'
              });

            case 26:
              _context.next = 28;
              return _index.default.Meal.create({
                id: 5,
                name: 'Toasted Bread & Egg Sauce',
                price: '25.00'
              });

            case 28:
              _context.next = 30;
              return _index.default.Meal.create({
                id: 6,
                name: 'Indomie Special',
                price: '20.00'
              });

            case 30:
              _context.next = 32;
              return _index.default.Menu.create({
                id: 1,
                date: new Date().toDateString(),
                list: [1, 2, 3, 4, 5, 6]
              });

            case 32:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function seedObj() {
      return _seedObj.apply(this, arguments);
    }

    return seedObj;
  }()
};
var _default = seeders;
exports.default = _default;