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
    <div className={styles.buttonGroupContainer}>
      <button
        onClick={() => textChange(0)}
        className={
          texts[0] === 'No' ? styles.negativeButtons : styles.ststatementButtons
        }
      >
        <span
          className={
            texts[0] === 'No' ? styles.negativeText : styles.statementText
          }
        >
          {texts[0]}
        </span>
        <p className={texts[0] === 'No' ? styles.negativeParText : ' '}>
          The Domain should exactly match the name
        </p>
      </button>
      <button
        onClick={() => textChange(1)}
        className={
          texts[1] === 'No' ? styles.negativeButtons : styles.ststatementButtons
        }
      >
        <span
          className={
            texts[1] === 'No' ? styles.negativeText : styles.statementText
          }
        >
          {texts[1]}
        </span>
        <p className={texts[1] === 'No' ? styles.negativeParText : ' '}>
          But minor variations are allowed (Recommended)
        </p>
      </button>
      <button
        onClick={() => textChange(2)}
        className={
          texts[2] === 'No' ? styles.negativeButtons : styles.ststatementButtons
        }
      >
        <span
          className={
            texts[2] === 'No' ? styles.negativeText : styles.statementText
          }
        >
          {texts[2]}
        </span>
        <p className={texts[2] === 'No' ? styles.negativeParText : ' '}>
          I am only looking for a name, not a Domain
        </p>
      </button>
    </div>
  )
}

export default ButtonGroup
