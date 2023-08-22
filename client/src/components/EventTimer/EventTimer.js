import React, { useState, useEffect, useRef } from 'react'
import { differenceInSeconds, format } from 'date-fns'

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
  const intervalRef = useRef(null)
  const targetDate = new Date(`${date}T${time}`)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const currentDate = new Date()
      const secondsRemaining =
        differenceInSeconds(targetDate, currentDate) - notifyBefore * 60

      if (secondsRemaining <= 0) {
        clearInterval(intervalRef.current)
        setTimerText('Таймер истек')
        onEventCompleted(id)
      } else {
        const formattedTime = formatTimer(targetDate, notifyBefore)
        setTimerText(formattedTime)
      }
    }, 1000)

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [onEventCompleted, targetDate, notifyBefore])

  function formatTimeUnit (value, unit) {
    if (value !== 0) {
      return `${value}${unit}`
    }
    return ''
  }

  function formatTimer (targetDate, notifyBefore) {
    const currentDate = new Date()
    const secondsRemaining =
      differenceInSeconds(targetDate, currentDate) - notifyBefore * 60

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
    <div>
      <div>{name}</div>
      {isCompleted ? 'Таймер истек' : timerText}
      <div></div>
    </div>
  )
}

export default EventTimer
