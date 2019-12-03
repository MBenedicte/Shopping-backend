export default {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      (queryInterface.addColumn('Users', 'verificationCode', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('Users', 'isVerified', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }))
    ]);
  },

  down: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'verificationCode'),
      queryInterface.removeColumn('Users', 'isVerified')
    ]);
  }
};
