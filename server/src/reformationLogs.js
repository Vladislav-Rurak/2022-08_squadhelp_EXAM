const cron = require('node-cron')
const fs = require('fs')
const path = require('path')
const { logError } = require('./errors/LoggerError')
import CONSTANT from './constants'

const destinationFolder = 'logDir'

const reformationLogs = () => {
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder)
  }

  cron.schedule(
    '50 15 * * *',
    () => {
      fs.readFile(CONSTANT.ERROR_LOG, 'utf8', (err, data) => {
        if (err) {
          console.error('Ошибка при чтении исходного файла:', err)
          return
        }

        const errorLines = data.trim().split('\n')
        const timestamp = Date.now()
        const newFileName = `${timestamp}.json`
        const newFilePath = path.join(destinationFolder, newFileName)

        let combinedData = []

        errorLines.forEach((errorLine, index) => {
          try {
            const parsedData = JSON.parse(errorLine)

            const timestamp = Date.now()

            const transformedData = {
              message: parsedData.message,
              code: parsedData.code,
              time: timestamp
            }

            combinedData.push(transformedData)
          } catch (err) {
            logError({
              message: `Ошибка при разборе JSON данных в строке ${index}:`,
              error: err
            })
          }
        })

        fs.writeFile(
          newFilePath,
          JSON.stringify(combinedData, null, 2),
          err => {
            if (err) {
              logError({
                message: `Ошибка при записи в комбинированный файл ${newFileName}:`,
                error: err
              })
            } else {
              console.log(
                `Данные успешно добавлены в комбинированный файл: ${newFileName}`
              )
            }
          }
        )

        fs.writeFile(CONSTANT.ERROR_LOG, '', err => {
          if (err) {
            logError({
              message: 'Ошибка при очистке исходного файла:',
              error: err
            })
          } else {
            console.log('Исходный файл успешно очищен.')
          }
        })
      })
    },
    {
      timezone: 'Europe/Kiev'
    }
  )
}
module.exports = reformationLogs
