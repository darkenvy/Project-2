'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersEventsRoles = sequelize.define('usersEventsRoles', {
    usersId: DataTypes.INTEGER,
    eventsId: DataTypes.INTEGER,
    rolesId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersEventsRoles;
};