"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _sendMail = _interopRequireDefault(require("../controllers/sendMail"));

var _index = _interopRequireDefault(require("../auth/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// api/routes/meals.js
// import { Route } from 'express';
var router = _express.default.Router();

router.post('/', _index.default, _sendMail.default.sendMail);
var _default = router;
exports.default = _default;