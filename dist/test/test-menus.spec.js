"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

var _menus = _interopRequireDefault(require("../api/controllers/menus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */

/* eslint-disable no-unused-expressions */

/* eslint-disable no-unused-vars */
var should = _chai.default.should();

_chai.default.use(_chaiHttp.default);

describe('MenusController', function () {
  it('should exist', function () {
    _menus.default.should.exist;
  });
  describe('addMenu POST method', function () {
    it('should exist', function () {
      _menus.default.addMenu.should.exist;
    });
  });
  describe('Set up a Menu List', function () {
    it('POST /api/v1/menus', function (done) {
      _chai.default.request(_server.default).post('/api/v1/menus').send({
        list: []
      }).end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(201);
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.a('string');
      });

      done();
    });
  });
  describe('getMenu GET method', function () {
    it('should exist', function () {
      _menus.default.getMenu.should.exist;
    });
  });
  describe('get the MENU for a specific day', function () {
    it('GET /api/v1/menus', function (done) {
      _chai.default.request(_server.default).get('/api/v1/menus/').end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('status');
        res.body.status.should.equal(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data.should.have.property('list');
        res.body.data.list.should.be.a('array');
        res.body.should.have.property('message');
        res.body.message.should.be.a('string');
      });

      done();
    });
  });
});