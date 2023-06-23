const { Router } = require('express')
const checkToken = require('../middlewares/checkToken')
const userController = require('../controllers/userController')
const upload = require('../utils/fileUpload')

const userRouter = Router()

userRouter.put(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser
)

module.exports = userRouter
