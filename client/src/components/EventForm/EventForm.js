import React from 'react'
import { useFormik } from 'formik'
import { v4 as uuidv4 } from 'uuid'
import styles from './EventForm.module.sass'
import Schems from '../../validators/validationSchems'
const EventForm = ({ onAddEvent }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      date: '',
      time: '',
      notifyBefore: ''
    },
    validationSchema: Schems.EventValidationSchema,
    onSubmit: values => {
      const eventDateTime = new Date(`${values.date}T${values.time}`)
      const currentTime = new Date()

      if (eventDateTime <= currentTime) {
        alert('Event time must be in the future')
        return
      }

      if (eventDateTime - currentTime <= values.notifyBefore * 60 * 1000) {
        alert('Notify Before must be less than the time remaining to the event')
        return
      }

      onAddEvent({
        ...values,
        notifyBefore: parseInt(values.notifyBefore),
        isCompleted: false,
        id: uuidv4()
      })
      formik.resetForm()
    }
  })

  return (
    <form className={styles.eventForm} onSubmit={formik.handleSubmit}>
      <input
        type='text'
        placeholder='Event Name'
        {...formik.getFieldProps('name')}
      />
      {formik.touched.name && formik.errors.name ? (
        <div className={styles.error}>{formik.errors.name}</div>
      ) : null}

      <input type='date' {...formik.getFieldProps('date')} />
      {formik.touched.date && formik.errors.date ? (
        <div className={styles.error}>{formik.errors.date}</div>
      ) : null}

      <input type='time' {...formik.getFieldProps('time')} />
      {formik.touched.time && formik.errors.time ? (
        <div className={styles.error}>{formik.errors.time}</div>
      ) : null}

      <input
        type='number'
        placeholder='Notify Before (minutes)'
        {...formik.getFieldProps('notifyBefore')}
      />
      {formik.touched.notifyBefore && formik.errors.notifyBefore ? (
        <div className={styles.error}>{formik.errors.notifyBefore}</div>
      ) : null}

      <button type='submit'>Add Event</button>
    </form>
  )
}

export default EventForm
