module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Kindness', [{
        action: 'Create a holiday to celebrate someone you love',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'Find opportunities to give compliments',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'Help an elderly person with their groceries',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'Call your mum',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'Call a friend',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'Mow the lawn for your neighbours',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'Hold open the door for someone',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'Pay for someone\'s meal at a restaurant',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'Pick up litter on the beach',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'Send an email to a family member or friend',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'Take the time to listen to someone',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'Spend time with your grandparents',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        action: 'Cook a meal for a neighbour',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Kindness', null, {});
    }
  };