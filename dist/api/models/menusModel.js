"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// api/models/menusModel.js
var menu = function menu(sequelize, DataTypes) {
  var Menu = sequelize.define('menu', {
    id: {
      type: DataTypes.INTEGER,
      // defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    date: {
      // type: DataTypes.DATE,
      type: DataTypes.STRING,
      unique: false
    },
    list: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      unique: false
    }
  }, {
    timestamps: false
  });
  return Menu;
};

var _default = menu;
exports.default = _default;