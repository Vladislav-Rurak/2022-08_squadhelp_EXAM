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
      }
    }),
      await queryInterface.createTable('CatalogChats', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
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
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CatalogChats')
    await queryInterface.dropTable('Catalogs')
  }
}
