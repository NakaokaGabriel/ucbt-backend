module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('sub_categories', 'start_date', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      queryInterface.addColumn('sub_categories', 'end_date', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('sub_categories', 'start_date'),
      queryInterface.removeColumn('sub_categories', 'end_date'),
    ]);
  },
};
