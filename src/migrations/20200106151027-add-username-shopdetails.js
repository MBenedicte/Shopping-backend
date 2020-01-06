export default {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Shops', 'owner', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.removeColumn('Shops', 'ownerId')
    ]);
  },

  down: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Shops', 'owner'),
      queryInterface.addColumn('Shops', 'ownerId', {
        type: Sequelize.INTEGER,
        allowNull: false
      })
    ]);
  }
};
