import CONSTANT from '../constants'

const { createLogger, transports, format } = require('winston')
const { combine, timestamp, printf } = format

const customFormat = printf(({ message, timestamp, code, stackTrace }) => {
  return JSON.stringify({
    message,
    time: `${new Date(timestamp).valueOf()}`,
    code: `${code}`,
    stackTrace
  })
})

const LoggerError = createLogger({
  format: combine(timestamp(), customFormat),
  transports: [new transports.File({ filename: CONSTANT.ERROR_LOG })]
})
export const logError = data => {
  LoggerError.error(data)
}
