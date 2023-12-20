import React, { useState } from 'react'
import { connect } from 'react-redux'
import Rating from 'react-rating'
import { withRouter } from 'react-router-dom'
import isEqual from 'lodash/isEqual'
import classNames from 'classnames'
import { confirmAlert } from 'react-confirm-alert'
import {
  changeMark,
  clearChangeMarkError,
  goToExpandedDialog,
  changeShowImage
} from '../../actions/actionCreator'
import CONSTANTS from '../../constants'
import styles from './OfferBox.module.sass'
import 'react-confirm-alert/src/react-confirm-alert.css'
import './OfferBox.css'

const OfferBox = props => {
  const [, updateState] = useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])
  const findConversationInfo = () => {
    const { messagesPreview, id } = props
    const participants = [id, props.data.User.id]
    participants.sort(
      (participant1, participant2) => participant1 - participant2
    )
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          id: messagesPreview[i].id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList
        }
      }
    }
    return null
  }

  const resolveOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            await props.setOfferStatus(
              props.data.User.id,
              props.data.id,
              'resolve'
            )

            props.data.status = CONSTANTS.OFFER_STATUS_APPROVE
            forceUpdate()
          }
        },
        { label: 'No' }
      ]
    })
  }

  const rejectOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            await props.setOfferStatus(
              props.data.User.id,
              props.data.id,
              'reject'
            )

            props.data.status = CONSTANTS.OFFER_STATUS_APPROVE
            forceUpdate()
          }
        },
        { label: 'No' }
      ]
    })
  }

  const approveOffer = async () => {
    console.log('props', props)
    try {
      confirmAlert({
        title: 'confirm',
        message: 'Are u sure?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              await props.setOfferStatus(
                props.data.User.id,
                props.data.id,
                'approve'
              )
              props.data.status = CONSTANTS.OFFER_STATUS_APPROVE
              forceUpdate()
            }
          },
          { label: 'No' }
        ]
      })
    } catch (error) {
      console.error('Error approving offer:', error)
    }
  }

  const declineOffer = async () => {
    try {
      confirmAlert({
        title: 'confirm',
        message: 'Are u sure?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              await props.setOfferStatus(
                props.data.User.id,
                props.data.id,
                'decline'
              )
              props.data.status = CONSTANTS.OFFER_STATUS_DECLINE
              forceUpdate()
            }
          },
          { label: 'No' }
        ]
      })
    } catch (error) {
      console.error('Error declining offer:', error)
    }
  }

  const changeMark = value => {
    props.clearError()
    props.changeMark({
      mark: value,
      offerId: props.data.id,
      isFirst: !props.data.mark,
      creatorId: props.data.User.id
    })
  }

  const offerStatus = () => {
    const { status } = props.data
    if (status === CONSTANTS.OFFER_STATUS_REJECTED) {
      return (
        <i
          className={classNames('fas fa-times-circle reject', styles.reject)}
        />
      )
    }
    if (status === CONSTANTS.OFFER_STATUS_WON) {
      return (
        <i
          className={classNames('fas fa-check-circle resolve', styles.resolve)}
        />
      )
    }
    return null
  }

  const goChat = () => {
    props.goToExpandedDialog({
      interlocutor: props.data.User,
      conversationData: findConversationInfo()
    })
  }

  const { data, role, id, contestType } = props
  const { status } = props.data
  const { avatar, firstName, lastName, email, rating } = props.data.User

  return (
    <>
      {role === CONSTANTS.MODERATOR ? (
        <div className={styles.offerContainer}>
          <div className={styles.mainInfoContainer}>
            <div className={styles.responseConainer}>
              {contestType === CONSTANTS.LOGO_CONTEST ? (
                <img
                  onClick={() =>
                    props.changeShowImage({
                      imagePath: data.fileName,
                      isShowOnFull: true
                    })
                  }
                  className={styles.responseLogo}
                  src={`${CONSTANTS.publicURL}${data.fileName}`}
                  alt='logo'
                />
              ) : (
                <span className={styles.response}>{data.text}</span>
              )}
            </div>
          </div>
          {props.needModeratorButtons(data.status) ? (
            <div className={styles.btnsContainer}>
              <div onClick={approveOffer} className={styles.resolveBtn}>
                Resolve
              </div>
              <div onClick={declineOffer} className={styles.rejectBtn}>
                Reject
              </div>
            </div>
          ) : status === CONSTANTS.OFFER_STATUS_APPROVE ? (
            <div className={styles.btnsContainer}>
              <div className={styles.resolveBtn}>Approve</div>
            </div>
          ) : (
            status === CONSTANTS.OFFER_STATUS_DECLINE && (
              <div className={styles.btnsContainer}>
                <div className={styles.rejectBtn}>Decline</div>
              </div>
            )
          )}
          {offerStatus()}
        </div>
      ) : (role === CONSTANTS.CUSTOMER &&
          status === CONSTANTS.OFFER_STATUS_APPROVE) ||
        status === CONSTANTS.OFFER_STATUS_WON ? (
        <div className={styles.offerContainer}>
          <div className={styles.mainInfoContainer}>
            <div className={styles.userInfo}>
              <div className={styles.creativeInfoContainer}>
                <img
                  src={
                    avatar === 'anon.png'
                      ? CONSTANTS.ANONYM_IMAGE_PATH
                      : `${CONSTANTS.publicURL}${avatar}`
                  }
                  alt='user'
                />
                <div className={styles.nameAndEmail}>
                  <span>{`${firstName} ${lastName}`}</span>
                  <span>{email}</span>
                </div>
              </div>
              <div className={styles.creativeRating}>
                <span className={styles.userScoreLabel}>Creative Rating </span>
                <Rating
                  initialRating={rating}
                  fractions={2}
                  fullSymbol={
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                      alt='star'
                    />
                  }
                  placeholderSymbol={
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                      alt='star'
                    />
                  }
                  emptySymbol={
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                      alt='star-outline'
                    />
                  }
                  readonly
                />
              </div>
            </div>
            <div className={styles.responseConainer}>
              {contestType === CONSTANTS.LOGO_CONTEST ? (
                <img
                  onClick={() =>
                    props.changeShowImage({
                      imagePath: data.fileName,
                      isShowOnFull: true
                    })
                  }
                  className={styles.responseLogo}
                  src={`${CONSTANTS.publicURL}${data.fileName}`}
                  alt='logo'
                />
              ) : (
                <span className={styles.response}>{data.text}</span>
              )}
              {data.User.id !== id && role === CONSTANTS.CUSTOMER && (
                <Rating
                  fractions={2}
                  fullSymbol={
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                      alt='star'
                    />
                  }
                  placeholderSymbol={
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                      alt='star'
                    />
                  }
                  emptySymbol={
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                      alt='star'
                    />
                  }
                  onClick={changeMark}
                  placeholderRating={data.mark}
                />
              )}
            </div>
            <i onClick={goChat} className='fas fa-comments' />
          </div>
          {props.needCustomerButtons(data.status) && (
            <div className={styles.btnsContainer}>
              <div onClick={resolveOffer} className={styles.resolveBtn}>
                Resolve
              </div>
              <div onClick={rejectOffer} className={styles.rejectBtn}>
                Reject
              </div>
            </div>
          )}
          {offerStatus()}
        </div>
      ) : role === CONSTANTS.CREATOR ? (
        <div className={styles.offerContainer}>
          <div className={styles.mainInfoContainer}>
            <div className={styles.userInfo}>
              <div className={styles.creativeInfoContainer}>
                <img
                  src={
                    avatar === 'anon.png'
                      ? CONSTANTS.ANONYM_IMAGE_PATH
                      : `${CONSTANTS.publicURL}${avatar}`
                  }
                  alt='user'
                />
                <div className={styles.nameAndEmail}>
                  <span>{`${firstName} ${lastName}`}</span>
                  <span>{email}</span>
                </div>
              </div>
              <div className={styles.creativeRating}>
                <span className={styles.userScoreLabel}>Creative Rating </span>
                <Rating
                  initialRating={rating}
                  fractions={2}
                  fullSymbol={
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                      alt='star'
                    />
                  }
                  placeholderSymbol={
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                      alt='star'
                    />
                  }
                  emptySymbol={
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                      alt='star-outline'
                    />
                  }
                  readonly
                />
              </div>
            </div>
            <div className={styles.responseConainer}>
              {contestType === CONSTANTS.LOGO_CONTEST ? (
                <img
                  onClick={() =>
                    props.changeShowImage({
                      imagePath: data.fileName,
                      isShowOnFull: true
                    })
                  }
                  className={styles.responseLogo}
                  src={`${CONSTANTS.publicURL}${data.fileName}`}
                  alt='logo'
                />
              ) : (
                <span className={styles.response}>{data.text}</span>
              )}
              {data.User.id !== id && role === CONSTANTS.CUSTOMER && (
                <Rating
                  fractions={2}
                  fullSymbol={
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                      alt='star'
                    />
                  }
                  placeholderSymbol={
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                      alt='star'
                    />
                  }
                  emptySymbol={
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                      alt='star'
                    />
                  }
                  onClick={changeMark}
                  placeholderRating={data.mark}
                />
              )}
            </div>
            <i onClick={goChat} className='fas fa-comments' />
          </div>
          {status === CONSTANTS.OFFER_STATUS_APPROVE ? (
            <div className={styles.btnsContainer}>
              <div className={styles.resolveBtn}>Approve</div>
            </div>
          ) : (
            status === CONSTANTS.OFFER_STATUS_DECLINE && (
              <div className={styles.btnsContainer}>
                <div className={styles.rejectBtn}>Decline</div>
              </div>
            )
          )}
          {offerStatus()}
        </div>
      ) : null}
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  changeMark: data => dispatch(changeMark(data)),
  clearError: () => dispatch(clearChangeMarkError()),
  goToExpandedDialog: data => dispatch(goToExpandedDialog(data)),
  changeShowImage: data => dispatch(changeShowImage(data))
})

const mapStateToProps = state => {
  const { changeMarkError, isShowModal } = state.contestByIdStore
  const { id, role } = state.userStore.data
  const { messagesPreview } = state.chatStore
  return {
    changeMarkError,
    id,
    role,
    messagesPreview,
    isShowModal
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OfferBox)
)
