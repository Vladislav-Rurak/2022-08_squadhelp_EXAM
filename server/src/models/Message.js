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
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    { timestamps: true }
  )

  Message.associate = function (models) {
    Message.belongsTo(models.Conversation, {
      foreignKey: 'conversation_id',
      targetKey: 'id',
      as: 'conversationData'
    })
  }
  return Message
}
