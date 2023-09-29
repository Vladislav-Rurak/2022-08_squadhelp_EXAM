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
    Catalog.hasMany(models.Conversations, {
      foreignKey: 'catalogId',
      as: 'chats'
    })
  }

  return Catalog
}
