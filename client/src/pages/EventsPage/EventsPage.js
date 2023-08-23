import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Header from '../../components/Header/Header'
import EventTimer from '../../components/EventTimer/EventTimer'
import EventForm from '../../components/EventForm/EventForm'

const EventsPage = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]')
    setEvents(storedEvents)
  }, [])

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  const handleAddEvent = eventData => {
    const now = new Date().getTime()
    const targetTime = new Date(`${eventData.date}T${eventData.time}`).getTime()
    const notifyBeforeInSeconds = eventData.notifyBefore * 60

    const isEventCompleted = now > targetTime - notifyBeforeInSeconds * 1000

    if (isEventCompleted) {
      alert('Вы не можете добавить завершенное событие')
      return
    }
    if (!eventData.isCompleted) {
      const newEvent = {
        id: uuidv4(),
        ...eventData,
        isCompleted: false
      }
      setEvents(prevEvents => [...prevEvents, newEvent])
    }
  }

  const handleEventCompleted = eventId => {
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        return { ...event, isCompleted: true }
      }
      return event
    })
    setEvents(updatedEvents)
  }

  const handleClearEvents = () => {
    setEvents([])
  }

  function calculateTimeRemaining (date, time) {
    const now = new Date().getTime()
    const targetTime = new Date(`${date}T${time}`).getTime()
    const remainingTime = targetTime - now
    return Math.max(remainingTime, 0)
  }

  const sortedEvents = events.sort((a, b) => {
    if (a.isCompleted && !b.isCompleted) {
      return 1
    }
    if (!a.isCompleted && b.isCompleted) {
      return -1
    }

    const timeRemainingA = calculateTimeRemaining(a.date, a.time)
    const timeRemainingB = calculateTimeRemaining(b.date, b.time)

    return timeRemainingA - timeRemainingB
  })

  const completedEventsCount = events.filter(event => event.isCompleted).length

  return (
    <>
      <Header />
      <div className='events-page'>
        <h1>Events</h1>
        <EventForm onAddEvent={handleAddEvent} />
        <div>
          {completedEventsCount === 0
            ? ' '
            : `Events ${completedEventsCount} completed`}
        </div>
        <div className='event-list'>
          <button onClick={handleClearEvents}>Clear Events</button>
          {sortedEvents.map(event => (
            <EventTimer
              key={event.id}
              id={event.id}
              name={event.name}
              date={event.date}
              time={event.time}
              notifyBefore={parseInt(event.notifyBefore)}
              isCompleted={event.isCompleted}
              onEventCompleted={handleEventCompleted}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default EventsPage
