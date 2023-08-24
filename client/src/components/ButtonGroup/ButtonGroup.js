import { React, useState } from 'react'
import styles from './ButtonGroup.module.sass'

const ButtonGroup = () => {
  const [texts, setTexts] = useState(['No', 'No', 'No'])

  const textChange = i => {
    const newTexts = [...texts]
    if (newTexts[i] === 'No') {
      newTexts[i] = 'Yes'
    } else {
      newTexts[i] = 'No'
    }
    setTexts(newTexts)
  }

  return (
    <div className={styles.ButtonGroupContainer}>
      <button onClick={() => textChange(0)}>
        <span className={styles.buttonHeader}>{texts[0]}</span>
        <p className={styles.text}>The Domain should exactly match the name</p>
      </button>
      <button onClick={() => textChange(1)}>
        <span className={styles.buttonHeader}>{texts[1]}</span>
        <p className={styles.text}>
          But minor variations are allowed (Recommended)
        </p>
      </button>
      <button onClick={() => textChange(2)}>
        <span className={styles.buttonHeader}>{texts[2]}</span>
        <p className={styles.text}>
          I am only looking for a name, not a Domain
        </p>
      </button>
    </div>
  )
}

export default ButtonGroup
