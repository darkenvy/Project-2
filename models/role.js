'use strict';
module.exports = function(sequelize, DataTypes) {
  var role = sequelize.define('role', {
    role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.role.belongsToMany(models.user, { through: "usersEventsRoles" }),
        models.role.belongsToMany(models.events, { through: "usersEventsRoles" })
      }
    }
  });
  return role;
};
