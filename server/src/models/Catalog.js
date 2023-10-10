module.exports = (sequelize, DataTypes) => {
  const Catalog = sequelize.define(
    'Catalogs',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      catalogName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      chats: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: []
      }
    },
    { timestamps: true }
  )

  Catalog.associate = function (models) {
    Catalog.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'id'
    })
  }

  Catalog.associate = function (models) {
    Catalog.belongsToMany(models.Conversation, {
      through: 'CatalogChat',
      foreignKey: 'conversation_id',
      targetKey: 'id'
    })
  }

  return Catalog
}
