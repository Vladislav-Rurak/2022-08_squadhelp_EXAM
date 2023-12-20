import React, { useState, useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'
import styles from './EventTimer.module.sass'

const EventTimer = ({
  name,
  date,
  time,
  id,
  notifyBefore,
  isCompleted,
  onEventCompleted,
  onDeleteEvent
}) => {
  const [timerText, setTimerText] = useState('')
  const [progress, setProgress] = useState(0)
  const [initialSecondsRemaining] = useState(
    differenceInSeconds(new Date(`${date}T${time}`), new Date())
  )

  useEffect(() => {
    let intervalId

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

    const updateTimer = () => {
      const targetDate = new Date(`${date}T${time}`)
      const currentDate = new Date()
      const secondsRemaining =
        differenceInSeconds(targetDate, currentDate) - notifyBefore * 60

      if (secondsRemaining <= 0) {
        clearInterval(intervalId)
        setTimerText('Таймер истек')
        if (!isCompleted) {
          onEventCompleted(id)
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

    return () => {
      clearInterval(intervalId)
    }
  }, [
    date,
    time,
    id,
    notifyBefore,
    initialSecondsRemaining,
    isCompleted,
    onEventCompleted
  ])

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
      <button onClick={() => onDeleteEvent(id)} className={styles.deleteButton}>
        Удалить
      </button>
    </div>
  )
}

export default EventTimer
