'use strict';
module.exports = function(sequelize, DataTypes) {
  var event = sequelize.define('event', {
    name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    location: DataTypes.STRING,
    description: DataTypes.STRING,
    venuename: DataTypes.STRING,
    venueaddress: DataTypes.STRING,
    venueurl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.event.belongsToMany(models.user, { through: "usersEventsRoles", foreignKey: 'usersId' }),
        models.event.belongsToMany(models.role, { through: "usersEventsRoles", foreignKey: 'rolesId' })
      }
    }
  });
  return event;
};
