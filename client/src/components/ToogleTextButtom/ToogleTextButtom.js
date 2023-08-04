import React, { useState } from 'react'
import styles from '../ToogleTextButtom/ToogleTextButtom.module.sass'

const ToogleTextButtom = ({ initialText, visibleText, listItems }) => {
  const [isTextVisible, setTextVisibility] = useState(false)

  const toggleTextVisibility = () => {
    setTextVisibility(!isTextVisible)
  }

  return (
    <div>
      <button onClick={toggleTextVisibility} className={styles.buttonGroup}>
        {initialText}
        <span className={styles.arrow}>{isTextVisible ? '▼' : '►'}</span>
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
      </button>
    </div>
  )
}

export default ToogleTextButtom
