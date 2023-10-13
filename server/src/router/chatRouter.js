const { Router } = require('express')
const checkToken = require('../middlewares/checkToken')
const chatController = require('../controllers/chatController')

const chatRouter = Router()

chatRouter.post('/message', checkToken.checkToken, chatController.addMessage)

chatRouter.post('/getChat', checkToken.checkToken, chatController.getChat)

chatRouter.get('/getPreview', checkToken.checkToken, chatController.getPreview)

chatRouter.post('/blackList', checkToken.checkToken, chatController.blackList)

chatRouter.post('/favorite', checkToken.checkToken, chatController.favoriteChat)

chatRouter.post('/catalog', checkToken.checkToken, chatController.createCatalog)

chatRouter.put(
  '/updateNameCatalog',
  checkToken.checkToken,
  chatController.updateNameCatalog
)

chatRouter.put(
  '/addNewChatToCatalog',
  checkToken.checkToken,
  chatController.addNewChatToCatalog
)

chatRouter.delete(
  '/removeChatFromCatalog',
  checkToken.checkToken,
  chatController.removeChatFromCatalog
)

chatRouter.delete(
  '/:catalogId',
  checkToken.checkToken,
  chatController.deleteCatalog
)

chatRouter.get(
  '/getCatalogs',
  checkToken.checkToken,
  chatController.getCatalogs
)

module.exports = chatRouter
