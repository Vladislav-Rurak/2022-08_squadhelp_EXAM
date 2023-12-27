import React from 'react'
import styles from './ButtonGroup.module.sass'

const ButtonComponent = ({ text, onClick, className, parText }) => {
  return (
    <button onClick={onClick} className={className}>
      <span
        className={text === 'No' ? styles.negativeText : styles.statementText}
      >
        {text}
      </span>
      <p className={text === 'No' && styles.negativeParText}>{parText}</p>
    </button>
  )
}

export default ButtonComponent
