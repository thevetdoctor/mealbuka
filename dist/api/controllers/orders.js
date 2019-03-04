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

var ordersController = {
  makeOrder: function makeOrder(req, res) {
    var order = {
      id: null,
      userId: req.body.userId,
      mealId: req.body.mealId,
      date: new Date().toDateString()
    };

    _models.default.Order.findAll().then(function (response) {
      var ordersIds = response.map(function (value) {
        return value.id;
      });
      var lastOrderId = Math.max.apply(Math, _toConsumableArray(ordersIds));
      order.id = lastOrderId + 1;

      if (order.userId === undefined || order.mealId === undefined) {
        res.status(400).json({
          status: 400,
          data: {
            message: 'Order incomplete'
          }
        });
      } else {
        _models.default.Order.create(order).then(function (result) {
          if (result) {
            res.status(200).json({
              status: 200,
              data: order,
              message: "Order ".concat(order.id, " created")
            });
          } else {
            res.status(400).json({
              status: 400,
              error: 'Not successful'
            });
          }
        });
      }
    });
  },
  getOrders: function getOrders(req, res) {
    _models.default.Order.findAll({
      where: {
        date: new Date().toDateString()
      }
    }).then(function (orders) {
      if (orders.length > 0) {
        res.status(200).json({
          status: 200,
          data: orders,
          message: 'Orders displayed for today'
        });
      } else {
        res.status(400).json({
          status: 400,
          error: 'No orders available'
        });
      }
    });
  },
  getSpecificOrders: function getSpecificOrders(req, res) {
    var id = parseInt(req.params.id, 10);

    _models.default.Order.findAll({
      where: {
        userId: id
      }
    }).then(function (orders) {
      if (orders.length > 0) {
        res.status(200).json({
          status: 200,
          data: orders,
          message: "Orders displayed for userId ".concat(id)
        });
      } else {
        res.status(400).json({
          status: 400,
          error: 'No orders available'
        });
      }
    });
  },
  modifyOrder: function modifyOrder(req, res) {
    var orderId = parseInt(req.params.id, 10);
    var meal = req.body.mealId;

    if (!req.params.id || req.params.id === '') {
      res.status(400).json({
        status: 'orderId not supplied'
      });
    }

    if (req.body.mealId === undefined && req.body.mealId === '') {
      res.status(400).json({
        status: 400,
        error: 'Order not modified'
      });
    } else {
      _models.default.Order.update({
        mealId: meal
      }, {
        where: {
          id: orderId
        }
      }, {
        returning: true
      }).then(function (response) {
        if (response[0] === 1) {
          res.status(200).json({
            status: 200,
            data: response,
            message: 'Order updated'
          });
        } else {
          res.status(400).json({
            status: 400,
            error: "Order id ".concat(orderId, " not updated")
          });
        }
      });
    }
  }
};
var _default = ordersController;
exports.default = _default;