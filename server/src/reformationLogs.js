const cron = require('node-cron')
const fs = require('fs')
const path = require('path')

const sourceFilePath = '../error.log'
const destinationFolder = 'logDir'

if (!fs.existsSync(destinationFolder)) {
  fs.mkdirSync(destinationFolder)
}

cron.schedule(
  '54 12 * * *',
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
          const newFileName = `${timestamp}_${index}.log`
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
                console.error(
                  `Ошибка при записи в новый файл ${newFileName}:`,
                  err
                )
              } else {
                console.log(
                  `Данные успешно скопированы и сохранены в новый файл: ${newFileName}`
                )
              }
            }
          )
        } catch (error) {
          console.error(
            `Ошибка при разборе JSON данных в строке ${index}:`,
            error
          )
        }
      })

      fs.writeFile(sourceFilePath, '', err => {
        if (err) {
          console.error('Ошибка при очистке исходного файла:', err)
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
