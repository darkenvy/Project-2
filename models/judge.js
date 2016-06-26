'use strict';
module.exports = function(sequelize, DataTypes) {
  var judge = sequelize.define('judge', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    companyName: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return judge;
};