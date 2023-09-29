'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Catalogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      catalogName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      chats: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
        defaultValue: []
      }
    }),
      await queryInterface.createTable('CatalogChat', {
        catalogId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Catalogs',
            key: 'id'
          }
        },
        chatId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Conversations',
            key: 'id'
          }
        }
      })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CatalogChat')
    await queryInterface.dropTable('Catalogs')
  }
}