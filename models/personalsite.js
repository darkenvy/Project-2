'use strict';
module.exports = function(sequelize, DataTypes) {
  var personalSite = sequelize.define('personalSite', {
    userId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return personalSite;
};