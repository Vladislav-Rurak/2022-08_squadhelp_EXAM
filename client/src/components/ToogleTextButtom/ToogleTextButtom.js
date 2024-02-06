import React, { useState } from 'react'
import styles from '../ToogleTextButtom/ToogleTextButtom.module.sass'

const ToogleTextButtom = ({ initialText, visibleText, listItems }) => {
  const [isTextVisible, setTextVisibility] = useState(false)

  const toggleTextVisibility = () => {
    setTextVisibility(!isTextVisible)
  }

  return (
    <div className={styles.buttonGroup}>
      <button
        onClick={toggleTextVisibility}
        className={styles.buttonGroupContainer}
      >
        {initialText}
        <span className={styles.arrow}>{isTextVisible ? '▼' : '►'}</span>
      </button>
      {isTextVisible && (
        <div className={styles.visibleText}>
          {visibleText}
          {listItems && listItems.length > 0 && (
            <div>
              {listItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ToogleTextButtom
