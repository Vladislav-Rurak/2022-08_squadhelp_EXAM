'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.sequelize.query(
        'ALTER TYPE "public"."enum_Users_role" ADD VALUE IF NOT EXISTS \'moderator\'',
        { transaction }
      )
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async transaction => {
      'ALTER TYPE "public"."enum_Users_role" DROP VALUE IF NOT EXISTS \'moderator\'',
        { transaction }
    })
  }
}
