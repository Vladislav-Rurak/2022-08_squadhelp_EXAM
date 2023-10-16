module.exports = (sequelize, DataTypes) => {
  const CatalogChat = sequelize.define(
    'CatalogChats',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      catalogId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      chatId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  )

  CatalogChat.associate = function (models) {
    CatalogChat.belongsTo(models.Catalog, {
      foreignKey: 'catalogId',
      targetKey: 'id'
    })

    CatalogChat.belongsTo(models.Conversation, {
      foreignKey: 'chatId',
      targetKey: 'id'
    })
  }

  return CatalogChat
}
