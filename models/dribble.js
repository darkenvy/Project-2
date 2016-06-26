'use strict';
module.exports = function(sequelize, DataTypes) {
  var dribble = sequelize.define('dribble', {
    userId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return dribble;
};