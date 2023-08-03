import React, { useState } from 'react'

const ToogleTextButtom = ({ initialText, visibleText, listItems }) => {
  const [isTextVisible, setTextVisibility] = useState(false)

  const toggleTextVisibility = () => {
    setTextVisibility(!isTextVisible)
  }

  return (
    <div>
      <button onClick={toggleTextVisibility}>
        {isTextVisible ? initialText : initialText}
      </button>
      {isTextVisible && (
        <div>
          {visibleText}
          {listItems && listItems.length > 0 && (
            <div>
              {listItems.map(item => (
                <li>{item}</li>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ToogleTextButtom
