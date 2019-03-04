"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _orders = _interopRequireDefault(require("../controllers/orders"));

var _index = _interopRequireDefault(require("../auth/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// api/routes/orders.js
var router = _express.default.Router();

router.post('/', _index.default, _orders.default.makeOrder);
router.get('/', _index.default, _orders.default.getOrders);
router.get('/:id', _index.default, _orders.default.getSpecificOrders);
router.put('/:id', _index.default, _orders.default.modifyOrder);
var _default = router;
exports.default = _default;