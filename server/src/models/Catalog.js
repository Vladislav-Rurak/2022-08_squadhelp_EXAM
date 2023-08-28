module.exports = (sequelize, DataTypes) => {
  const Catalog = sequelize.define(
    'Catalog',
    {
      userId: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      catalogName: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      }
    },
    { timestamp: true }
  )
  Catalog.assosiate = function (models) {
    Catalog.hasMany(models.Conversation, {
      foreignKey: 'catalogId',
      as: 'chats'
    })
  }
  return Catalog
}
