module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Messages',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      sender: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      body: {
        allowNull: false,
        type: DataTypes.STRING
      },
      conversationId: {
        type: DataTypes.INTEGER
      }
    },
    { timestamps: true, tableName: 'Messages' }
  )
  return Message
}
