const { logError } = require('./LoggerError')

class ApplicationError extends Error {
  constructor (message, status) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message || 'Something went wrong. Please try again'
    this.code = status || 500
    this.stackTrace = this.stack
    logError({
      message: this.message,
      code: this.code,
      stackTrace: this.stackTrace
    })
  }
}

module.exports = ApplicationError
