export default {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Shops', 'shopName', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      })
    ]);
  },

  down: function(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('Shops', 'shopName')]);
  }
};
