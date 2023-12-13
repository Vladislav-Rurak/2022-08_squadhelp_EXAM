import React, { useState } from 'react'
import ButtonComponent from './ButtonComponent'
import styles from './ButtonGroup.module.sass'

const ButtonGroup = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(-1)

  const textChange = index => {
    setSelectedButtonIndex(index)
  }

  const parTextArray = [
    'The Domain should exactly match the name',
    'But minor variations are allowed (Recommended)',
    'I am only looking for a name, not a Domain'
  ]

  const buttonData = parTextArray.map((parText, index) => ({
    text: selectedButtonIndex === index ? 'Yes' : 'No',
    onClick: () => textChange(index),
    className:
      selectedButtonIndex === index
        ? styles.ststatementButtons
        : styles.negativeButtons,
    parText
  }))

  return (
    <div className={styles.buttonGroupContainer}>
      {buttonData.map((button, index) => (
        <ButtonComponent key={index} {...button} />
      ))}
    </div>
  )
}

export default ButtonGroup
