'use strict';
module.exports = function(sequelize, DataTypes) {
  var role = sequelize.define('role', {
    role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.role.belongsToMany(models.user, { through: "usersEventsRoles", foreignKey: 'usersId' }),
        models.role.belongsToMany(models.event, { through: "usersEventsRoles", foreignKey: 'eventsId' })
      }
    }
  });
  return role;
};
