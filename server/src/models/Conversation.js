const { BelongsToMany } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    'Conversations',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      participants: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      blackList: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        allowNull: false
      },
      favoriteList: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  )

  Conversation.associate = function (models) {
    Conversation.belongsTo(models.User, {
      foreignKey: 'participants',
      targetKey: 'id'
    })
  }

  Conversation.associate = function (models) {
    Conversation.hasMany(models.Message, {
      foreignKey: 'conversation_id',
      targetKey: 'id',
      as: 'conversationData'
    })
  }

  Conversation.associate = function (models) {
    Conversation.belongsToMany(models.Catalog, {
      through: 'CatalogChat',
      foreignKey: 'conversation_id',
      targetKey: 'id'
    })
  }

  return Conversation
}
