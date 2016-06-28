'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    linkedinlink: DataTypes.STRING,
    githublink: DataTypes.STRING,
    dribblelink: DataTypes.STRING,
    personalurl: DataTypes.STRING,
    companyname: DataTypes.STRING,
    companyurl: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.belongsToMany(models.event, { through: "usersEventsRoles" }),
        models.user.belongsToMany(models.role, { through: "usersEventsRoles" })
      }
    }
  });
  return user;
};
