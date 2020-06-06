module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        email: 'example1@example.com',
        password: '1234',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'example2@example.com',
        password: 'abcd',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'example3@example.com',
        password: 'a1b2',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
    }
  };