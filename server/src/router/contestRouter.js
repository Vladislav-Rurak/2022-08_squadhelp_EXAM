const basicMiddlewares = require('../middlewares/basicMiddlewares')
const checkToken = require('../middlewares/checkToken')
const contestController = require('../controllers/contestController')
const upload = require('../utils/fileUpload')

const { Router } = require('express')
const contestRouter = Router()

contestRouter.post(
  '/contest',
  checkToken.checkToken,
  contestController.dataForContest
)

contestRouter.post(
  '/getCustomersContests',
  checkToken.checkToken,
  contestController.getCustomersContests
)

contestRouter.get(
  '/contest/:contestId',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById
)

contestRouter.get(
  '/contests',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  contestController.getContests
)

contestRouter.put(
  '/updateContest',
  checkToken.checkToken,
  upload.updateContestFile,
  contestController.updateContest
)

module.exports = contestRouter
