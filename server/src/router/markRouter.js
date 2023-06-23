const { Router } = require('express')
const basicMiddlewares = require('../middlewares/basicMiddlewares')
const checkToken = require('../middlewares/checkToken')
const userController = require('../controllers/userController')

const markRouter = Router()

markRouter.post(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
)
module.exports = markRouter
