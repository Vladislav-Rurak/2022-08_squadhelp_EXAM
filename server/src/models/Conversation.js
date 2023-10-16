module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    'Conversation',
    {
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

  return Conversation
}
