const Message = require('./models/mongoModels/Message')

const countMessage = async () => {
  try {
    const countMessagesWithKeyword = await Message.aggregate([
      {
        $match: {
          body: { $regex: /паровоз/i }
        }
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 }
        }
      }
    ])
    console.log(
      `Количество сообщений с ключевым словом "паровоз": ${countMessagesWithKeyword[0].count}`
    )
  } catch (error) {
    console.error('Произошла ошибка:', error)
  }
}

export default countMessage
