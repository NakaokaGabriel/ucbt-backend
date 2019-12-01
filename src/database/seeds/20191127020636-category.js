module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'Fun Money',
          color: '#7159c1',
          priority: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Investiments',
          color: '#7159c1',
          priority: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Bills',
          color: '#7159c1',
          priority: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Category', null, {});
  },
};
