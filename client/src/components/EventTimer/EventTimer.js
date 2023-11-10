import React, { useState, useEffect, useRef, useCallback } from 'react'
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
    differenceInSeconds(new Date(`${date}T${time}`), new Date())
  )

  const intervalRef = useRef(null)

  const updateTimer = useCallback(() => {
    const targetDate = new Date(`${date}T${time}`)
    const currentDate = new Date()
    const secondsRemaining = differenceInSeconds(targetDate, currentDate)

    if (secondsRemaining <= 0) {
      clearInterval(intervalRef.current)
      setTimerText('Таймер истек')
      if (!isCompleted) {
        onEventCompleted(id)
      }
    } else {
      const formattedTime = format(
        new Date(0, 0, 0, 0, 0, secondsRemaining),
        'y MMM dd HH:mm:ss'
      )
      setTimerText(formattedTime)
      const remainingTimePercentage =
        (secondsRemaining / initialSecondsRemaining) * 100
      setProgress(100 - remainingTimePercentage)
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

  useEffect(() => {
    intervalRef.current = setInterval(updateTimer, 1000)

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [updateTimer])

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
