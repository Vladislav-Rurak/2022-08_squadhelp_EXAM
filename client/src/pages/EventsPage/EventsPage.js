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

  const handleAddEvent = event => {
    const newEvent = { ...event, id: uuidv4() }
    setEvents(prevEvents => [...prevEvents, newEvent])
  }

  const handleEventCompleted = id => {
    const updatedEvents = events.map(event => {
      if (event.id === id) {
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

  return (
    <>
      <div className='events-page'>
        <h1>Events</h1>
        <EventForm onAddEvent={handleAddEvent} />
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
              onEventCompleted={() => handleEventCompleted(event.id)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default EventsPage
