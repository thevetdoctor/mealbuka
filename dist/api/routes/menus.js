"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _menus = _interopRequireDefault(require("../controllers/menus"));

var _index = _interopRequireDefault(require("../auth/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// api/routes/menus.js
var router = _express.default.Router();

router.post('/', _index.default, _menus.default.addMenu);
router.post('/special', _index.default, _menus.default.addMenuSpecial);
router.get('/', _index.default, _menus.default.getMenu);
router.get('/all', _index.default, _menus.default.getAllMenu);
var _default = router;
exports.default = _default;