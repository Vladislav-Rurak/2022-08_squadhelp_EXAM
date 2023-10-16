const basicMiddlewares = require('../middlewares/basicMiddlewares')
const contestController = require('../controllers/contestController')
const checkToken = require('../middlewares/checkToken')
const upload = require('../utils/fileUpload')

const { Router } = require('express')

const offerRouter = Router()

offerRouter.post(
  '/setNewOffer',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
)

offerRouter.post(
  '/setOfferStatus',
  checkToken.checkToken,
  basicMiddlewares.onlyForModerator,
  contestController.setOfferStatus
)
module.exports = offerRouter
