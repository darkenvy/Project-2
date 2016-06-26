'use strict';
module.exports = function(sequelize, DataTypes) {
  var organizer = sequelize.define('organizer', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    bio: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return organizer;
};