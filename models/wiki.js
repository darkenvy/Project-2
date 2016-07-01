'use strict';
module.exports = function(sequelize, DataTypes) {
  var wiki = sequelize.define('wiki', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    eventId: DataTypes.INTEGER,
    published: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.wiki.belongsTo(models.event, { foreignKey: 'eventId' })
      }
    }
  });
  return wiki;
};
