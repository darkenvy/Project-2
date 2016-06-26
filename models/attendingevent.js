'use strict';
module.exports = function(sequelize, DataTypes) {
  var attendingEvent = sequelize.define('attendingEvent', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return attendingEvent;
};