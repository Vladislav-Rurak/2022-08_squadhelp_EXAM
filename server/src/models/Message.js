module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      sender: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      body: {
        allowNull: false,
        type: DataTypes.STRING
      },
      body: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    { timestump: true }
  )
  return Message
}
