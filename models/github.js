'use strict';
module.exports = function(sequelize, DataTypes) {
  var github = sequelize.define('github', {
    userId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return github;
};