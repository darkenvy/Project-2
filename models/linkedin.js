'use strict';
module.exports = function(sequelize, DataTypes) {
  var linkedIn = sequelize.define('linkedIn', {
    userId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return linkedIn;
};