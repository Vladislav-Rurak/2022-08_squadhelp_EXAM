const { Router } = require('express')
const checkToken = require('../middlewares/checkToken')
const contestController = require('../controllers/contestController')

const downloadRouter = Router()

downloadRouter.post(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile
)

module.exports = downloadRouter
