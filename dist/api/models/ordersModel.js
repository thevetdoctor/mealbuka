"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// api/models/ordersModel.js
var order = function order(sequelize, DataTypes) {
  var Order = sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER,
      // defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: false
    },
    mealId: {
      type: DataTypes.INTEGER,
      unique: false
    },
    date: {
      // type: DataTypes.DATE,
      type: DataTypes.STRING,
      unique: false
    },
    confirmed: {
      type: DataTypes.BOOLEAN
    }
  }, {
    timestamps: false
  }); // Order.associate = (models) => {
  //   Order.belongsTo(models.User);
  // };

  return Order;
};

var _default = order;
exports.default = _default;