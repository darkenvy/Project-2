'use strict';
module.exports = function(sequelize, DataTypes) {
  var todo = sequelize.define('todo', {
    item: DataTypes.STRING,
    eventId: DataTypes.INTEGER,
    addedByUserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.todo.belongsTo(models.event, { foreignKey: 'eventId' })
      }
    }
  });
  return todo;
};
