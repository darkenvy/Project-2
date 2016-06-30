'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    // add slackId and slackToken as columns
    return queryInterface.addColumn('users', 'slackId', Sequelize.STRING).then(function() {
      return queryInterface.addColumn('users', 'slackToken', Sequelize.STRING);
    });
  },

  down: function (queryInterface, Sequelize) {
    // remove slackId and slackToken as columns
    return queryInterface.removeColumn('users', 'slackToken').then(function() {
      return queryInterface.removeColumn('users', 'slackId');
    });
  }
};
