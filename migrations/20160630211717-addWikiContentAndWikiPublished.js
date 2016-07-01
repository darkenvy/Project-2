'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('events', 'wikiContent', Sequelize.TEXT).then(function() {
      return queryInterface.addColumn('events', 'wikiPublished', Sequelize.BOOLEAN);
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('events', 'wikiContent').then(function() {
      return queryInterface.removeColumn('events', 'wikiPublished');
    });
  }
};
