"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _meals = _interopRequireDefault(require("../controllers/meals"));

var _index = _interopRequireDefault(require("../auth/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// api/routes/meals.js
// import { Route } from 'express';
var router = _express.default.Router();

router.post('/', _meals.default.addMeal);
router.put('/:id', _meals.default.modifyMeal);
router.delete('/:id', _meals.default.deleteMeal);
router.get('/', _meals.default.getAllMeals);
var _default = router;
exports.default = _default;