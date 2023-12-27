const nodemailer = require('nodemailer')
const db = require('../models')
const ServerError = require('../errors/ServerError')
const contestQueries = require('./queries/contestQueries')
const userQueries = require('./queries/userQueries')
const controller = require('../socketInit')
const UtilFunctions = require('../utils/functions')
const CONSTANTS = require('../constants')

module.exports.dataForContest = async (req, res, next) => {
  const response = {}
  try {
    const {
      body: { characteristic1, characteristic2 }
    } = req
    const types = [characteristic1, characteristic2, 'industry'].filter(Boolean)

    const characteristics = await db.Selects.findAll({
      where: {
        type: {
          [db.Sequelize.Op.or]: types
        }
      }
    })
    if (!characteristics) {
      return next(new ServerError())
    }
    characteristics.forEach(characteristic => {
      if (!response[characteristic.type]) {
        response[characteristic.type] = []
      }
      response[characteristic.type].push(characteristic.describe)
    })
    res.send(response)
  } catch (err) {
    console.log(err)
    next(new ServerError('cannot get contest preferences'))
  }
}

module.exports.getContestById = async (req, res, next) => {
  try {
    let contestInfo = await db.Contests.findOne({
      where: { id: req.params.contestId },
      order: [[db.Offers, 'id', 'asc']],
      include: [
        {
          model: db.Users,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken']
          }
        },
        {
          model: db.Offers,
          required: false,
          where:
            req.tokenData.role === CONSTANTS.CREATOR
              ? { userId: req.tokenData.userId }
              : {},
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: db.Users,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'accessToken']
              }
            },
            {
              model: db.Ratings,
              required: false,
              where: { userId: req.tokenData.userId },
              attributes: { exclude: ['userId', 'offerId'] }
            }
          ]
        }
      ]
    })
    contestInfo = contestInfo.get({ plain: true })
    contestInfo.Offers.forEach(offer => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark
      }
      delete offer.Rating
    })
    res.send(contestInfo)
  } catch (e) {
    next(new ServerError())
  }
}

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName
  res.download(file)
}

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename
    req.body.originalFileName = req.file.originalname
  }
  const contestId = req.body.contestId
  delete req.body.contestId
  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId: req.tokenData.userId
    })
    res.send(updatedContest)
  } catch (e) {
    next(e)
  }
}

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {}
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename
    obj.originalFileName = req.file.originalname
  } else {
    obj.text = req.body.offerData
  }
  obj.userId = req.tokenData.userId
  obj.contestId = req.body.contestId
  try {
    const result = await contestQueries.createOffer(obj)
    delete result.contestId
    delete result.userId
    controller.getNotificationController().emitEntryCreated(req.body.customerId)
    const User = Object.assign({}, req.tokenData, {
      id: req.tokenData.userId
    })
    res.send(Object.assign({}, result, { User }))
  } catch (e) {
    return next(new ServerError())
  }
}

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId }
  )
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of yours offers was rejected',
      contestId
    )
  return rejectedOffer
}

const approveOffer = async offerId => {
  const approveOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_APPROVE },
    { id: offerId }
  )
}

const declineOffer = async offerId => {
  const declineOffer = await contestQueries.updateOffer(
    {
      status: CONSTANTS.OFFER_STATUS_DECLINE
    },
    { id: offerId }
  )
}

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction
) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: db.sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${
        CONSTANTS.CONTEST_STATUS_FINISHED
      }'
            WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}  THEN '${
        CONSTANTS.CONTEST_STATUS_ACTIVE
      }'
            ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
            END
    `)
    },
    { orderId },
    transaction
  )
  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId,
    transaction
  )
  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      status: db.sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
            ELSE '${CONSTANTS.OFFER_STATUS_REJECTED}'
            END
    `)
    },
    {
      contestId
    },
    transaction
  )
  transaction.commit()
  const arrayRoomsId = []
  updatedOffers.forEach(offer => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED &&
      creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId)
    }
  })
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      arrayRoomsId,
      'Someone of yours offers was rejected',
      contestId
    )
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Someone of your offers WIN', contestId)
  return updatedOffers[0].dataValues
}

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction
  const creatorData = await db.Users.findOne({
    where: req.body.creatorId
  })
  const sendEmail = async (to, subject) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'moderator@gmail.com',
          pass: 'password'
        }
      })

      const mailOptions = {
        from: 'moderator@gmail.com',
        to,
        subject
      }

      await transporter.sendMail(mailOptions)
      console.log('Email sent successfully')
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId
      )
      res.send(offer)
    } catch (err) {
      next(err)
    }
  }
  if (req.body.command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction()
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction
      )
      res.send(winningOffer)
    } catch (err) {
      transaction.rollback()
      next(err)
    }
  }
  if (req.body.command === 'approve') {
    console.log('req.body', req.body)

    try {
      const offer = await approveOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId
      )
      sendEmail({
        to: creatorData.dataValues.email,
        subject: 'Offer approved',
        text: 'Your offer approved by moderator'
      })
      res.send(offer)
    } catch (err) {
      next(err)
    }
  }
  if (req.body.command === 'decline') {
    try {
      const offer = await declineOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId
      )
      sendEmail({
        to: creatorData.dataValues.email,
        subject: 'Offer approved',
        text: 'Your offer declined by moderator'
      })
      res.send(offer)
    } catch (err) {
      next(err)
    }
  }
}

module.exports.getCustomersContests = (req, res, next) => {
  db.Contests.findAll({
    where: { status: req.headers.status, userId: req.tokenData.userId },
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: db.Offers,
        required: false,
        attributes: ['id'],
        where: { status: CONSTANTS.OFFER_STATUS_APPROVE }
      }
    ]
  })
    .then(contests => {
      contests.forEach(
        contest => (contest.dataValues.count = contest.dataValues.Offers.length)
      )
      let haveMore = true
      if (contests.length === 0) {
        haveMore = false
      }
      res.send({ contests, haveMore })
    })
    .catch(err => next(new ServerError(err)))
}

module.exports.getContests = (req, res, next) => {
  const predicates = UtilFunctions.createWhereForAllContests(
    req.query.typeIndex,
    req.query.contestId,
    req.query.industry,
    req.query.awardSort
  )
  db.Contests.findAll({
    where: predicates.where,
    order: predicates.order,
    limit: req.query.limit,
    offset: req.query.offset ? req.query.offset : 0,
    include: [
      {
        model: db.Offers,
        required: req.query.ownEntries === 'true',
        where: req.query.ownEntries ? { userId: req.tokenData.userId } : {},
        attributes: ['id']
      }
    ]
  })
    .then(contests => {
      contests.forEach(
        contest => (contest.dataValues.count = contest.dataValues.Offers.length)
      )
      let haveMore = true
      if (contests.length === 0) {
        haveMore = false
      }
      res.send({ contests, haveMore })
    })
    .catch(err => {
      next(new ServerError())
    })
}
