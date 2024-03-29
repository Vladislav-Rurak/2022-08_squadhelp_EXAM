import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import styles from './Header.module.sass'
import CONSTANTS from '../../constants'
import { clearUserStore, headerRequest } from '../../actions/actionCreator'

class Header extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      completedEventsCount: 0
    }

    this.updateCompletedEventsCount = this.updateCompletedEventsCount.bind(this)
  }
  componentDidMount () {
    if (!this.props.data) {
      this.props.getUser()
    }
    this.updateCompletedEventsCount()

    this.timerId = setInterval(this.updateCompletedEventsCount, 1000)
  }
  componentWillUnmount () {
    clearInterval(this.timerId)
  }
  logOut = () => {
    localStorage.clear()
    this.props.clearUserStore()
    this.props.history.replace('/login')
  }

  startContests = () => {
    this.props.history.push('/startContest')
  }

  renderLoginButtons = () => {
    if (this.props.data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={
                this.props.data.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${this.props.data.avatar}`
              }
              alt='user'
            />
            <span>{`Hi, ${this.props.data.displayName}`}</span>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
              alt='menu'
            />
            <ul>
              <li>
                <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                  <span>View Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to='/account' style={{ textDecoration: 'none' }}>
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <a href='http://www.google.com'>
                  <span>Messages</span>
                </a>
              </li>
              <li>
                <a href='http://www.google.com'>
                  <span>Affiliate Dashboard</span>
                </a>
              </li>
              <li>
                <Link to='/events' style={{ textDecoration: 'none' }}>
                  <span>Events</span>
                </Link>
              </li>
              <li>
                <Link
                  to='/login'
                  onClick={this.logOut}
                  style={{ textDecoration: 'none' }}
                >
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
            className={styles.emailIcon}
            alt='email'
          />
        </>
      )
    }
    return (
      <>
        <Link to='/login' style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link to='/registration' style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    )
  }

  updateCompletedEventsCount = () => {
    const { events } = this.props
    const now = new Date().getTime()
    const completedEventsCount = events.filter(event => {
      const targetTime = new Date(`${event.date}T${event.time}`).getTime()
      const notifyBeforeInSeconds = event.notifyBefore * 60
      const isCompleted = now > targetTime - notifyBeforeInSeconds * 1000
      return isCompleted
    }).length

    this.setState({ completedEventsCount })
  }

  render () {
    const { completedEventsCount } = this.state

    if (this.props.isFetching) {
      return null
    }
    return (
      <div className={styles.headerContainer}>
        <div className={styles.fixedHeader}>
          {completedEventsCount > 0 && (
            <div className={styles.completedEvent}>
              {`Events ${completedEventsCount} completed`}
            </div>
          )}
          <span className={styles.info}>
            Squadhelp recognized as one of the Most Innovative Companies by Inc
            Magazine.
          </span>
          <a href='http://www.google.com'>Read Announcement</a>
        </div>
        <div className={styles.loginSignnUpHeaders}>
          <div className={styles.numberContainer}>
            <a href={`tel: +${CONSTANTS.CONTACT_INFO.TEL}`}>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`}
                alt='phone'
              />
              <span>{CONSTANTS.CONTACT_INFO.TEL}</span>
            </a>
          </div>
          <div className={styles.userButtonsContainer}>
            {this.renderLoginButtons()}
          </div>
        </div>
        <div className={styles.navContainer}>
          <Link to='/'>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
              className={styles.logo}
              alt='blue_logo'
            />
          </Link>

          <div className={styles.leftNav}>
            <div className={styles.nav}>
              <ul>
                <li>
                  <span style={{ cursor: 'pointer' }}>Name Ideas</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt='menu'
                  />
                  <ul>
                    <li>
                      <a href='http://www.google.com'>Beauty</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>Consulting</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>E-Commerce</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>Fashion & Clothing</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>Finance</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>Real Estate</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>Tech</a>
                    </li>
                    <li className={styles.last}>
                      <a href='http://www.google.com'>More Categories</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span style={{ cursor: 'pointer' }}>Contests</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt='menu'
                  />
                  <ul>
                    <li>
                      <Link
                        to='/how-it-works'
                        style={{ textDecoration: 'none' }}
                      >
                        <span>How it works</span>
                      </Link>
                    </li>
                    <li>
                      <a href='http://www.google.com'>PRICING</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>AGENCY SERVICE</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>ACTIVE CONTESTS</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>WINNERS</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>LEADERBOARD</a>
                    </li>
                    <li className={styles.last}>
                      <a href='http://www.google.com'>BECOME A CREATIVE</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span style={{ cursor: 'pointer' }}>Our Work</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt='menu'
                  />
                  <ul>
                    <li>
                      <a href='http://www.google.com'>NAMES</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>TAGLINES</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>LOGOS</a>
                    </li>
                    <li className={styles.last}>
                      <a href='http://www.google.com'>TESTIMONIALS</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span style={{ cursor: 'pointer' }}>Names For Sale</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt='menu'
                  />
                  <ul>
                    <li>
                      <a href='http://www.google.com'>POPULAR NAMES</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>SHORT NAMES</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>INTRIGUING NAMES</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>NAMES BY CATEGORY</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>VISUAL NAME SEARCH</a>
                    </li>
                    <li className={styles.last}>
                      <a href='http://www.google.com'>SELL YOUR DOMAINS</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span style={{ cursor: 'pointer' }}>Blog</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt='menu'
                  />
                  <ul>
                    <li>
                      <a href='http://www.google.com'>ULTIMATE NAMING GUIDE</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>
                        POETIC DEVICES IN BUSINESS NAMING
                      </a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>CROWDED BAR THEORY</a>
                    </li>
                    <li className={styles.last}>
                      <a href='http://www.google.com'>ALL ARTICLES</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {this.props.data && this.props.data.role === CONSTANTS.CUSTOMER && (
              <Link
                to='startContest'
                className={styles.startContestBtn}
                onClick={this.startContests}
              >
                START CONTEST
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.userStore
const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(headerRequest()),
  clearUserStore: () => dispatch(clearUserStore())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
