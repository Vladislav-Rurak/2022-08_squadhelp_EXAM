import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const EventForm = ({ onAddEvent }) => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notifyBefore, setNotifyBefore] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    onAddEvent({
      name,
      date,
      time,
      notifyBefore: parseInt(notifyBefore),
      isCompleted: false,
      id: uuidv4()
    })
    setName('')
    setDate('')
    setTime('')
    setNotifyBefore('')
  }

  return (
    <form className='event-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Event Name'
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type='date'
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />
      <input
        type='time'
        value={time}
        onChange={e => setTime(e.target.value)}
        required
      />
      <input
        type='number'
        placeholder='Notify Before (minutes)'
        value={notifyBefore}
        onChange={e => setNotifyBefore(e.target.value)}
        required
      />
      <button type='submit'>Add Event</button>
    </form>
  )
}

export default EventForm
