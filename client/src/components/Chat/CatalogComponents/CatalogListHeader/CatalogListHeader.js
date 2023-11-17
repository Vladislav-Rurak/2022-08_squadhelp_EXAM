import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import {
  changeShowModeCatalog,
  changeRenameCatalogMode,
  changeCatalogName
} from '../../../../actions/actionCreator'
import styles from './CatalogListHeader.module.sass'
import FormInput from '../../../FormInput/FormInput'
import Schems from '../../../../validators/validationSchems'

const CatalogListHeader = props => {
  const [localCatalogName, setLocalCatalogName] = useState(props.catalogName)

  const changeCatalogName = values => {
    const { changeCatalogName, id } = props
    changeCatalogName({ catalogName: values.catalogName, catalogId: id })
    setLocalCatalogName(values.catalogName)
  }

  const { changeShowModeCatalog, changeRenameCatalogMode, isRenameCatalog } =
    props

  return (
    <div className={styles.headerContainer}>
      <i
        className='fas fa-long-arrow-alt-left'
        onClick={() => changeShowModeCatalog()}
      />
      {!isRenameCatalog && (
        <div className={styles.infoContainer}>
          <span>{localCatalogName}</span>
          <i
            className='fas fa-edit'
            onClick={() => changeRenameCatalogMode()}
          />
        </div>
      )}
      {isRenameCatalog && (
        <div className={styles.changeContainer}>
          <Formik
            onSubmit={changeCatalogName}
            initialValues={{ catalogName: localCatalogName }}
            validationSchema={Schems.CatalogSchema}
          >
            <Form>
              <FormInput
                name='catalogName'
                classes={{
                  container: styles.inputContainer,
                  input: styles.input,
                  warning: styles.fieldWarning,
                  notValid: styles.notValid
                }}
                type='text'
                label='Catalog Name'
              />
              <button type='submit'>Change</button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  const { isRenameCatalog } = state.chatStore
  const { catalogName, id } = state.chatStore.currentCatalog
  return {
    id,
    catalogName,
    isRenameCatalog,
    initialValues: {
      catalogName
    }
  }
}

const mapDispatchToProps = dispatch => ({
  changeShowModeCatalog: () => dispatch(changeShowModeCatalog()),
  changeRenameCatalogMode: () => dispatch(changeRenameCatalogMode()),
  changeCatalogName: data => dispatch(changeCatalogName(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CatalogListHeader)
