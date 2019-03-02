"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controllers/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// api/routes/users.js
// import auth from '../auth/index';
var router = _express.default.Router();

router.post('/signup', _users.default.signup);
router.post('/login', _users.default.login); // router.get('/admin', auth, UsersController.admin);
// router.post('/manageUser', auth, UsersController.manageUser);

var _default = router;
exports.default = _default;