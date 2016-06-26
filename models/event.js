'use strict';
module.exports = function(sequelize, DataTypes) {
  var event = sequelize.define('event', {
    name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    location: DataTypes.STRING,
    venueName: DataTypes.STRING,
    venueAddress: DataTypes.VARCHAR
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return event;
};