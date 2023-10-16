import React, { useState, useEffect, useRef } from 'react'
import { differenceInSeconds, format } from 'date-fns'
import styles from './EventTimer.module.sass'

const EventTimer = ({
  name,
  date,
  time,
  id,
  notifyBefore,
  isCompleted,
  onEventCompleted
}) => {
  const [timerText, setTimerText] = useState('')
  const [progress, setProgress] = useState(0)
  const [initialSecondsRemaining] = useState(
    differenceInSeconds(new Date(`${date}T${time}`), new Date()) -
      notifyBefore * 60
  )

  const intervalRef = useRef(null)

  useEffect(() => {
    let intervalId

    const updateTimer = () => {
      const targetDate = new Date(`${date}T${time}`)
      const currentDate = new Date()
      const secondsRemaining =
        differenceInSeconds(targetDate, currentDate) - notifyBefore * 60

      if (secondsRemaining <= 0) {
        clearInterval(intervalId)
        setTimerText('Таймер истек')
        if (!isCompleted) {
          onEventCompleted(id) // Вызывается только если событие не завершено
        }
      } else {
        const formattedTime = formatTimer(secondsRemaining)
        setTimerText(formattedTime)
        const remainingTimePercentage =
          (secondsRemaining / initialSecondsRemaining) * 100
        setProgress(100 - remainingTimePercentage)
      }
    }

    intervalId = setInterval(updateTimer, 1000)

    // Очищаем интервал при размонтировании компонента
    return () => {
      clearInterval(intervalId)
    }
  }, [
    onEventCompleted,
    date,
    time,
    id,
    notifyBefore,
    initialSecondsRemaining,
    isCompleted
  ])

  function formatTimeUnit (value, unit) {
    if (value !== 0) {
      return `${value}${unit}`
    }
    return ''
  }

  function formatTimer (secondsRemaining) {
    if (secondsRemaining <= 0) {
      return 'Таймер истек'
    }

    const years = Math.floor(secondsRemaining / (365 * 24 * 60 * 60))
    const months = Math.floor(
      (secondsRemaining % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60)
    )
    const days = Math.floor(
      (secondsRemaining % (30 * 24 * 60 * 60)) / (24 * 60 * 60)
    )
    const hours = Math.floor((secondsRemaining % (24 * 60 * 60)) / (60 * 60))
    const minutes = Math.floor((secondsRemaining % (60 * 60)) / 60)
    const seconds = secondsRemaining % 60

    const formattedTime =
      formatTimeUnit(years, 'y ') +
      formatTimeUnit(months, 'mon ') +
      formatTimeUnit(days, 'd ') +
      formatTimeUnit(hours, 'h ') +
      formatTimeUnit(minutes, 'm ') +
      formatTimeUnit(seconds, 's ')

    return formattedTime.trim()
  }

  return (
    <div
      style={{ width: !isCompleted ? `${progress}%` : ' ' }}
      className={`${
        isCompleted ? styles.eventListCompleted : styles.eventList
      }`}
    >
      <div>{name}</div>
      <div className={styles.timerItems}>
        {isCompleted ? 'Таймер истек' : timerText}
      </div>
    </div>
  )
}

export default EventTimer
