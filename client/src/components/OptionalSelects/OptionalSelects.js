import React from 'react'
import CONSTANTS from '../../constants'
import SelectInput from '../SelectInput/SelectInput'
import FormInput from '../FormInput/FormInput'
import styles from '../ContestForm/ContestForm.module.sass'
import Spinner from '../Spinner/Spinner'

const OptionalSelects = props => {
  if (props.isFetching) {
    return <Spinner />
  }

  let content = null

  switch (props.contestType) {
    case CONSTANTS.NAME_CONTEST:
      content = (
        <>
          <SelectInput
            name='typeOfName'
            header='Type of company'
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning
            }}
            optionsArray={props.dataForContest.data.typeOfName}
          />
          <SelectInput
            name='styleName'
            header='Style name'
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning
            }}
            optionsArray={props.dataForContest.data.nameStyle}
          />
        </>
      )
      break
    case CONSTANTS.LOGO_CONTEST:
      content = (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name='nameVenture'
              type='text'
              label='Name of venture'
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning
              }}
            />
          </div>
          <SelectInput
            name='brandStyle'
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning
            }}
            header='Brand Style'
            optionsArray={props.dataForContest.data.brandStyle}
          />
        </>
      )
      break
    case CONSTANTS.TAGLINE_CONTEST:
      content = (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name='nameVenture'
              type='text'
              label='Name of venture'
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning
              }}
            />
          </div>
          <SelectInput
            name='typeOfTagline'
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning
            }}
            header='Type tagline'
            optionsArray={props.dataForContest.data.typeOfTagline}
          />
        </>
      )
      break
    default:
      break
  }

  return content
}

export default OptionalSelects
