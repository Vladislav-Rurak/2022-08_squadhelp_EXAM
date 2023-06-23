const validators = require('../middlewares/validators')
const checkToken = require('../middlewares/checkToken')
const hashPass = require('../middlewares/hashPassMiddle')
const userController = require('../controllers/userController')

const { Router } = require('express')
const authRouter = Router()

authRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
)

authRouter.post('/login', validators.validateLogin, userController.login)

authRouter.get('/getUser', checkToken.checkAuth)

module.exports = authRouter
