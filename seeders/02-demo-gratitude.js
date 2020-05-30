module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Gratitude', [{
        description: 'Saw nana today and we had a great chat.',
        action: 'Helped someone carry their groceries.',
        shareable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },
      {
        description: 'Had a coffee with my friends',
        action: 'Donated to the local food bank.',
        shareable: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2
      },
      {
        description: 'Went for a long walk along the beach',
        action: 'Paid for someone elses meal the the restaurant.',
        shareable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Gratitude', null, {});
    }
  };