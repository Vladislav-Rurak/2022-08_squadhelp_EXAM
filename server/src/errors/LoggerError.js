const { createLogger, transports, format } = require('winston')
const { combine, timestamp, printf } = format

const customFormat = printf(({ message, timestamp, code, stackTrace }) => {
  return JSON.stringify({
    message,
    time: timestamp,
    code,
    stackTrace
  })
})

const LoggerError = createLogger({
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), customFormat),
  transports: [new transports.File({ filename: 'error.log' })]
})
export const logError = data => {
  LoggerError.error(data)
}
