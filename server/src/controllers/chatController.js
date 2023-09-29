const { Catalogs, Conversations, Messages, Users } = require('../models')
const { Sequelize, Op } = require('sequelize')
const moment = require('moment')
const db = require('../models')
const userQueries = require('./queries/userQueries')
const controller = require('../socketInit')
const _ = require('lodash')

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
      conversationId: conversation.id
    })

    message.participants = participants
    const interlocutorId = participants.find(
      participant => participant !== req.tokenData.userId
    )

    const preview = {
      _id: conversation.id,
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
        _id: conversation.id,
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
      where: {
        conversationId: {
          [Op.in]: [
            Sequelize.literal(`(
              SELECT "conversationId" FROM "Messages" WHERE "conversationId" = ${participants[0]} AND "conversationId" = ${participants[1]}
            )`)
          ]
        }
      },
      order: [['createdAt', 'ASC']],
      attributes: [
        'id',
        'sender',
        'body',
        'conversationId',
        'createdAt',
        'updatedAt'
      ]
    })

    const interlocutor = await Users.findOne({
      where: {
        id: req.body.interlocutorId
      },
      attributes: ['firstName', 'lastName', 'displayName', 'id', 'avatar']
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
  try {
    const conversations = await Messages.findAll({
      attributes: [
        [Sequelize.fn('max', Sequelize.col('createdAt')), 'createdAt'],
        'sender',
        'body',
        'conversationId',
        'createdAt'
      ],
      where: {
        conversationId: {
          [Op.in]: [
            Sequelize.literal(`(
              SELECT "conversationId" FROM "Messages" WHERE "conversationId" IN (
                SELECT id FROM "Conversations" WHERE ${req.tokenData.userId} = ANY (participants)
              )
            )`)
          ]
        }
      },
      group: ['conversationId', 'sender', 'body', 'createdAt'],
      raw: true
    })

    const interlocutors = conversations.map(conversation => {
      return conversation.sender !== req.tokenData.userId
        ? conversation.sender
        : null
    })

    const senders = await Users.findAll({
      where: {
        id: {
          [Op.in]: interlocutors.filter(id => id !== null)
        }
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar']
    })

    conversations.forEach(conversation => {
      const sender = senders.find(sender => sender.id === conversation.sender)
      if (sender) {
        conversation.interlocutor = {
          id: sender.id,
          firstName: sender.firstName,
          lastName: sender.lastName,
          displayName: sender.displayName,
          avatar: sender.avatar
        }
      }
    })

    res.send(conversations)
  } catch (err) {
    next(err)
  }
}

module.exports.blackList = async (req, res, next) => {
  const predicate =
    'blackList.' + req.body.participants.indexOf(req.tokenData.userId)

  try {
    const [numAffectedRows, affectedRows] = await Conversations.update(
      { [predicate]: req.body.blackListFlag },
      {
        where: { participants: req.body.participants },
        returning: true
      }
    )

    if (numAffectedRows > 0) {
      const chat = affectedRows[0]
      res.send(chat)

      const interlocutorId = req.body.participants.find(
        participant => participant !== req.tokenData.userId
      )

      controller.getChatController().emitChangeBlockStatus(interlocutorId, chat)
    } else {
      res.status(404).send({ message: 'Чат не найден' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Произошла ошибка при обновлении чата' })
  }
}

module.exports.favoriteChat = async (req, res, next) => {
  const predicate =
    'favoriteList.' + req.body.participants.indexOf(req.tokenData.userId)

  try {
    const [numAffectedRows, affectedRows] = await Conversations.update(
      { [predicate]: req.body.favoriteFlag },
      {
        where: { participants: req.body.participants },
        returning: true
      }
    )

    if (numAffectedRows > 0) {
      const chat = affectedRows[0]
      res.send(chat)
    } else {
      res.status(404).send({ message: 'Чат не найден' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Произошла ошибка при обновлении чата' })
  }
}

module.exports.createCatalog = async (req, res, next) => {
  const { userId, catalogName, chatId } = req.body

  try {
    const catalog = await Catalogs.create({
      userId: req.tokenData.userId,
      catalogName,
      chats: [chatId]
    })

    res.send(catalog)
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports.updateNameCatalog = async (req, res, next) => {
  const { catalogId, catalogName } = req.body

  try {
    const [numAffectedRows, affectedRows] = await Catalogs.update(
      { catalogName },
      {
        where: {
          id: catalogId,
          userId: req.tokenData.userId
        },
        returning: true
      }
    )

    if (numAffectedRows > 0) {
      const updatedCatalog = affectedRows[0]
      res.send(updatedCatalog)
    } else {
      res.status(404).send({ message: 'Каталог не найден' })
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports.addNewChatToCatalog = async (req, res, next) => {
  const { catalogId, chatId } = req.body

  try {
    const catalog = await Catalogs.findOne({
      where: {
        id: catalogId,
        userId: req.tokenData.userId
      }
    })

    if (catalog) {
      await catalog.addChat(chatId)
      await catalog.reload()
      res.send(catalog)
    } else {
      res.status(404).send({ message: 'Каталог не найден' })
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports.removeChatFromCatalog = async (req, res, next) => {
  const { catalogId, chatId } = req.body

  try {
    const catalog = await Catalogs.findOne({
      where: {
        id: catalogId,
        userId: req.tokenData.userId
      }
    })

    if (catalog) {
      await catalog.removeChat(chatId)
      await catalog.reload()
      res.send(catalog)
    } else {
      res.status(404).send({ message: 'Каталог не найден' })
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports.deleteCatalog = async (req, res, next) => {
  const { catalogId } = req.body

  try {
    const numDeletedRows = await Catalogs.destroy({
      where: {
        id: catalogId,
        userId: req.tokenData.userId
      }
    })

    if (numDeletedRows > 0) {
      res.end()
    } else {
      res.status(404).send({ message: 'Каталог не найден' })
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await Catalogs.findAll({
      where: {
        userId: req.tokenData.userId
      },
      attributes: ['id', 'catalogName', 'chats']
    })

    res.send(catalogs)
  } catch (err) {
    console.error(err)
    next(err)
  }
}
