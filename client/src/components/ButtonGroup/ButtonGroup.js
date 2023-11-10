import React, { useState } from 'react'
import ButtonComponent from './ButtonComponent'
import styles from './ButtonGroup.module.sass'

const ButtonGroup = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(-1)

  const textChange = index => {
    setSelectedButtonIndex(index)
  }

  const buttonData = [
    {
      text: selectedButtonIndex === 0 ? 'Yes' : 'No',
      onClick: () => textChange(0),
      className:
        selectedButtonIndex === 0
          ? styles.ststatementButtons
          : styles.negativeButtons,
      parText: 'The Domain should exactly match the name'
    },
    {
      text: selectedButtonIndex === 1 ? 'Yes' : 'No',
      onClick: () => textChange(1),
      className:
        selectedButtonIndex === 1
          ? styles.ststatementButtons
          : styles.negativeButtons,
      parText: 'But minor variations are allowed (Recommended)'
    },
    {
      text: selectedButtonIndex === 2 ? 'Yes' : 'No',
      onClick: () => textChange(2),
      className:
        selectedButtonIndex === 2
          ? styles.ststatementButtons
          : styles.negativeButtons,
      parText: 'I am only looking for a name, not a Domain'
    }
  ]

  return (
    <div className={styles.buttonGroupContainer}>
      {buttonData.map((button, index) => (
        <ButtonComponent key={index} {...button} />
      ))}
    </div>
  )
}

export default ButtonGroup
