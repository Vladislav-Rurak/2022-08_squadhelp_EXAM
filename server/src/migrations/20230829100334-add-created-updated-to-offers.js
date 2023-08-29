'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Offers', 'createdAt', {
      type: Sequelize.DATE
    })

    await queryInterface.addColumn('Offers', 'updatedAt', {
      type: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Offers', 'createdAt')
    await queryInterface.removeColumn('Offers', 'updatedAt')
  }
}
