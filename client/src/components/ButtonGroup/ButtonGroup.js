import React from 'react'
import styles from './ButtonGroup.module.sass'

const ButtonGroup = () => {
  return (
    <div className={styles.ButtonGroupContainer}>
      <button onClick={zaglushka}>
        <span className={styles.buttonHeader}>No</span>
        <p className={styles.text}>The Domain should exactly match the name</p>
      </button>
      <button onClick={zaglushka}>
        <span className={styles.buttonHeader}>No</span>
        <p className={styles.text}>
          But minor variations are allowed (Recommended)
        </p>
      </button>
      <button onClick={zaglushka}>
        <span className={styles.buttonHeader}>No</span>
        <p className={styles.text}>
          I am only looking for a name, not a Domain
        </p>
      </button>
    </div>
  )
}

export default ButtonGroup
