const { DataTypes } = require ('sequelize');
const database = require('../database/manager');

const Bill = database.define('Bill', {
  group: DataTypes.STRING,
  description: DataTypes.STRING,
  value: DataTypes.DOUBLE,
  paymentDate: DataTypes.DATE,
  dueDate: DataTypes.DATE,
  obs: DataTypes.STRING,
  isFixed: DataTypes.BOOLEAN
});

module.exports = Bill;