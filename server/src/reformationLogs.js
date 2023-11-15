const cron = require('node-cron')
const fs = require('fs')
const path = require('path')
const { logError } = require('./errors/LoggerError')

const sourceFilePath = './error.json'
const destinationFolder = 'logDir'

if (!fs.existsSync(destinationFolder)) {
  fs.mkdirSync(destinationFolder)
}

cron.schedule(
  '23 13 * * *',
  () => {
    fs.readFile(sourceFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Ошибка при чтении исходного файла:', err)
        return
      }

      const errorLines = data.trim().split('\n')

      errorLines.forEach((errorLine, index) => {
        try {
          const parsedData = JSON.parse(errorLine)

          const timestamp = Date.now()
          const newFileName = `${timestamp}_${index}.json`
          const newFilePath = path.join(destinationFolder, newFileName)

          const transformedData = {
            message: parsedData.message,
            code: parsedData.code,
            time: timestamp
          }

          fs.writeFile(
            newFilePath,
            JSON.stringify(transformedData, null, 2),
            err => {
              if (err) {
                logError({
                  message: `Ошибка при записи в новый файл ${newFileName}:`,
                  error: err
                })
              } else {
                console.log(
                  `Данные успешно скопированы и сохранены в новый файл: ${newFileName}`
                )
              }
            }
          )
        } catch (err) {
          logError({
            message: `Ошибка при разборе JSON данных в строке ${index}:`,
            error: err
          })
        }
      })

      fs.writeFile(sourceFilePath, '', err => {
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
