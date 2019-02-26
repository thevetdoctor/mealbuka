"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

var _meals = _interopRequireDefault(require("../api/controllers/meals"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */

/* eslint-disable no-unused-expressions */

/* eslint-disable no-unused-vars */
var should = _chai.default.should();

_chai.default.use(_chaiHttp.default);

describe('MealsController', function () {
  it('should exist', function () {
    _meals.default.should.exist;
  });
  describe('addMeal POST method', function () {
    it('should exist', function () {
      _meals.default.addMeal.should.exist;
    });
  });
  describe('Add a meal to Meal List', function () {
    it('POST /api/v1/meals', function (done) {
      _chai.default.request(_server.default).post('/api/v1/meals').send({
        name: 'Semolina',
        price: '30.00'
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
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('price');
      });

      done();
    });
  });
  describe('modifyMeal PUT method', function () {
    it('should exist', function () {
      _meals.default.modifyMeal.should.exist;
    });
  });
  describe('modify a meal in Meal List', function () {
    it('PUT /api/v1/meals/:id', function (done) {
      _chai.default.request(_server.default).put('/api/v1/meals/1').send({
        name: 'Jollof Rice & Chicken',
        price: '30.00'
      }).end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('status');
        res.body.status.should.equal(200);
        res.body.should.have.property('data'); // res.body.data.should.be.a('object');
        // res.body.should.have.property('message');
        // res.body.message.should.be.a('string');

        res.body.data.should.have.property('id');
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('price');
      });

      done();
    });
  });
  describe('deleteMeal DELETE method', function () {
    it('should exist', function () {
      _meals.default.deleteMeal.should.exist;
    });
  });
  describe('delete a meal off the Meal List', function () {
    it('DELETE /api/v1/meals/1', function (done) {
      _chai.default.request(_server.default).delete('/api/v1/meals/1').end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('status');
        res.body.status.should.equal(200);
        res.body.should.have.property('message');
        res.body.message.should.be.a('string');
      });

      done();
    });
  });
  describe('getAllMeals GET method', function () {
    it('should exist', function () {
      _meals.default.getAllMeals.should.exist;
    });
  });
  describe('display all meals in the Meal List', function () {
    it('GET /api/v1/meals/', function (done) {
      _chai.default.request(_server.default).get('/api/v1/meals').end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('status');
        res.body.status.should.equal(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.should.have.property('message');
        res.body.message.should.be.a('string');
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('price');
      });

      done();
    });
  });
});