'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Message', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sender: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      conversation: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Conversation',
          key: 'id'
        },
        createAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Message')
  }
}
