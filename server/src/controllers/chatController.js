const {
  Catalogs,
  Conversations,
  Messages,
  Users,
  CatalogChats
} = require('../models')
const { Sequelize, Op } = require('sequelize')
const moment = require('moment')
const db = require('../models')
const userQueries = require('./queries/userQueries')
const controller = require('../socketInit')

module.exports.addMessage = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.recipient]
  participants.sort((participant1, participant2) => participant1 - participant2)

  try {
    let conversation = await Conversations.findOne({
      where: {
        participants: participants
      }
    })

    if (!conversation) {
      conversation = await Conversations.create({
        participants: participants,
        blackList: [false, false],
        favoriteList: [false, false]
      })
    }

    const message = await Messages.create({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
      conversationId: conversation.id,
      include: { model: Conversations }
    })

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

    message.participants = participants
    const interlocutorId = participants.find(
      participant => participant !== req.tokenData.userId
    )

    const preview = {
      id: conversation.id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createAt: message.createdAt,
      participants: participants,
      blackList: conversation.blackList,
      favoriteList: conversation.favoriteList
    }

    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        id: conversation.id,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants: participants,
        blackList: conversation.blackList,
        favoriteList: conversation.favoriteList,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email
        }
      }
    })

    res.send({
      message,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor })
    })
  } catch (err) {
    next(err)
  }
}

module.exports.getChat = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.interlocutorId]
  participants.sort((participant1, participant2) => participant1 - participant2)
  try {
    const messages = await Messages.findAll({
      attributes: [
        'id',
        'sender',
        'body',
        'conversationId',
        'createdAt',
        'updatedAt'
      ],
      include: [
        {
          model: Conversations,
          as: 'conversationData',
          attributes: [],
          where: {
            participants: {
              [Op.contains]: participants
            }
          }
        }
      ],
      order: [['createdAt', 'ASC']]
    })

    const interlocutor = await userQueries.findUser({
      id: req.body.interlocutorId
    })
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar
      }
    })
  } catch (err) {
    next(err)
  }
}

module.exports.getPreview = async (req, res, next) => {
  const participants = [req.tokenData.userId]
  try {
    const conversationsInfo = await Conversations.findAll({
      attributes: ['participants', 'blackList', 'favoriteList', 'id'],
      where: {
        participants: { [Op.contains]: participants }
      },
      include: [
        {
          model: Messages,
          as: 'conversationData',
          attributes: [
            'conversationId',
            [
              Sequelize.fn('max', Sequelize.col('conversationData.createdAt')),
              'createAt'
            ]
          ]
        }
      ],
      group: ['conversationId', 'conversationData.id', 'Conversations.id'],
      order: [[Sequelize.col('conversationData.createdAt'), 'DESC']]
    })

    const conversations = conversationsInfo.map(i => i.toJSON())

    const interlocutors = []
    conversations.forEach(conversation => {
      interlocutors.push(
        conversation.participants.find(
          participant => participant !== req.tokenData.userId
        )
      )
    })

    const senders = await Users.findAll({
      where: {
        id: interlocutors
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar']
    })

    conversations.forEach(conversation => {
      senders.forEach(sender => {
        if (conversation.participants.includes(sender.dataValues.id)) {
          conversation.interlocutor = {
            id: sender.dataValues.id,
            firstName: sender.dataValues.firstName,
            lastName: sender.dataValues.lastName,
            displayName: sender.dataValues.displayName,
            avatar: sender.dataValues.avatar
          }
        }
      })
    })
    res.send(conversations)
  } catch (err) {
    next(err)
  }
}

module.exports.blackList = async (req, res, next) => {
  const participants = [req.tokenData.userId]

  try {
    const currentChat = await Conversations.findOne({
      attributes: ['participants', 'blackList', 'id'],
      where: {
        participants: { [Op.contains]: participants }
      }
    })

    if (currentChat) {
      let blackListFlag = currentChat.dataValues.blackList
      const currentblackListFlag = blackListFlag[req.tokenData.userId - 1]
      const newblackListFlag = !currentblackListFlag

      blackListFlag[req.tokenData.userId - 1] = newblackListFlag
      await Conversations.update(
        {
          blackList: blackListFlag
        },
        {
          where: { id: currentChat.dataValues.id },
          fields: ['blackList'],
          returning: true
        }
      )

      res.send(currentChat)
      const interlocutorId = req.body.participants.filter(
        participant => participant !== req.tokenData.userId
      )[0]

      controller
        .getChatController()
        .emitChangeBlockStatus(interlocutorId, currentChat)
    }
  } catch (err) {
    res.send(err)
  }
}

module.exports.favoriteChat = async (req, res, next) => {
  const participants = [req.tokenData.userId]
  try {
    const currentChat = await Conversations.findOne({
      attributes: ['participants', 'favoriteList', 'id'],
      where: {
        participants: { [Op.contains]: participants }
      }
    })

    if (currentChat) {
      let favoriteFlag = currentChat.dataValues.favoriteList
      const currentFavoriteFlag = favoriteFlag[req.tokenData.userId - 1]
      const newFavoriteFlag = !currentFavoriteFlag

      favoriteFlag[req.tokenData.userId - 1] = newFavoriteFlag
      await Conversations.update(
        {
          favoriteList: favoriteFlag
        },
        {
          where: { id: currentChat.dataValues.id },
          fields: ['favoriteList'],
          returning: true
        }
      )

      res.send(currentChat)
    }
  } catch (err) {
    res.send(err)
  }
}

module.exports.createCatalog = async (req, res, next) => {
  try {
    const catalog = await Catalogs.create({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName
    })

    res.send(catalog)
  } catch (err) {
    next(err)
  }
}

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const catalog = await Catalogs.update(
      { catalogName: req.body.catalogName },
      {
        where: {
          id: req.body.catalogId,
          userId: req.tokenData.userId
        }
      }
    )

    res.send(catalog)
  } catch (err) {
    next(err)
  }
}

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const catalogChat = await CatalogChats.create({
      catalogId: req.body.catalogId,
      chatId: req.body.chatId,
      userId: req.tokenData.userId
    })
    res.send(catalogChat)
  } catch (err) {
    next(err)
  }
}

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    await CatalogChats.destroy({
      where: {
        catalogId: req.query.catalogId,
        chatId: req.query.chatId,
        userId: req.tokenData.userId
      }
    })

    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const catalogChatsCount = await CatalogChats.count({
      where: {
        catalogId: req.params.catalogId,
        userId: req.tokenData.userId
      }
    })

    if (catalogChatsCount > 0) {
      await CatalogChats.destroy({
        where: {
          catalogId: req.params.catalogId,
          userId: req.tokenData.userId
        }
      })
    }

    const deleteCatalog = await Catalogs.destroy({
      where: {
        id: req.params.catalogId,
        userId: req.tokenData.userId
      }
    })

    if (deleteCatalog > 0) {
      res.send('Catalog deleted')
    } else {
      res.status(400).send('Error deleting Catalog and/or related CatalogChats')
    }
  } catch (err) {
    next(err)
  }
}

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await Catalogs.findAll({
      where: {
        userId: req.tokenData.userId
      },
      include: {
        model: Conversations
      }
    })

    res.send(catalogs)
  } catch (err) {
    next(err)
  }
}
