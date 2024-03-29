const http = require('http')
const express = require('express')
const cors = require('cors')
require('./dbMongo/mongoose')
const controller = require('./socketInit')
const handlerError = require('./handlerError/handlerError')
const router = require('./router')
const path = require('path')
// const { default: countMessage } = require('./countMessage')
import reformationLogs from './reformationLogs'

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(
  '/public',
  express.static(path.resolve(__dirname, '..', '..', '..', 'public'))
)
app.use(router)
app.use(handlerError)

const server = http.createServer(app)
server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
controller.createConnection(server)

// countMessage()
reformationLogs()
