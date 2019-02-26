"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// api/models/usersModel.js
var user = function user(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      // defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      unique: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
    }
  }, {
    timestamps: true
  }); // User.associate = (models) => {
  //   User.hasMany(models.Order, { onDelete: 'CASCADE' });
  // };

  return User;
};

var _default = user;
exports.default = _default;