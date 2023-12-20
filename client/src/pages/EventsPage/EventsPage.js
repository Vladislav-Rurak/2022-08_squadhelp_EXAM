import React, { useEffect, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import EventTimer from '../../components/EventTimer/EventTimer'
import EventForm from '../../components/EventForm/EventForm'
import styles from './EventsPage.module.sass'
import CONSTANTS from '../../constants'
import { updateEventsData } from '../../actions/actionCreator'

const EventsPage = () => {
  const dispatch = useDispatch()
  const events = useSelector(state => state.userStore.events)

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]')
    dispatch(updateEventsData(storedEvents))
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  const handleAddEvent = eventData => {
    const now = Date.now()
    const targetTime = new Date(`${eventData.date}T${eventData.time}`).getTime()
    const notifyBeforeInSeconds = eventData.notifyBefore * 60

    const isEventCompleted = now > targetTime - notifyBeforeInSeconds * 1000
    if (!eventData.isCompleted) {
      const newEvent = {
        id: uuidv4(),
        ...eventData,
        isCompleted: false
      }
      dispatch(updateEventsData([...events, newEvent]))
    }
  }

  const handleEventCompleted = eventId => {
    const updatedEvents = events.map(event =>
      event.id === eventId ? { ...event, isCompleted: true } : event
    )
    dispatch(updateEventsData(updatedEvents))
  }

  const handleClearEvents = () => {
    dispatch(updateEventsData([]))
  }

  const handleDeleteEvent = eventId => {
    const updatedEvents = events.filter(event => event.id !== eventId)
    dispatch(updateEventsData(updatedEvents))
  }

  const calculateTimeRemaining = (date, time) => {
    const now = Date.now()
    const targetTime = new Date(`${date}T${time}`).getTime()
    return Math.max(targetTime - now, 0)
  }

  const sortedEvents = useMemo(() => {
    return events.slice().sort((a, b) => {
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
  }, [events])

  return (
    <>
      <Header />
      <div className={styles.eventPage}>
        <h1>Events</h1>
        <EventForm onAddEvent={handleAddEvent} />
        <button className={styles.clearEvents} onClick={handleClearEvents}>
          Clear Events
        </button>
        <div className={styles.listContainer}>
          <div className={styles.listHeader}>
            <p>Live upcoming checks</p>
            <p>
              Remaining time{' '}
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}icons8-часы-16.png`}
                alt='clock'
              />
            </p>
          </div>
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
              onDeleteEvent={handleDeleteEvent}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default EventsPage
