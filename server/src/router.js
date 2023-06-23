const express = require('express')
const authRouter = require('./router/authRouter')
const contestRouter = require('./router/contestRouter')
const payRouter = require('./router/payRouter')
const offerRouter = require('./router/offerRouter')
const downloadRouter = require('./router/downloadRouter')
const markRouter = require('./router/markRouter')
const userRouter = require('./router/userRouter')
const chatRouter = require('./router/chatRouter')
const router = express.Router()

router.use('/auth', authRouter)

router.use(contestRouter)

router.use('/payment', payRouter)

router.use('/offer', offerRouter)

router.use(downloadRouter)

router.use(markRouter)

router.use('/user', userRouter)

router.use('/chat', chatRouter)

module.exports = router
