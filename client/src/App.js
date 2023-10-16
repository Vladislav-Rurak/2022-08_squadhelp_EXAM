import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import PaymentPage from './pages/PaymentPage/PaymentPage'
import StartContestPage from './pages/StartContestPage/StartContestPage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import PrivateHoc from './components/PrivateHoc/PrivateHoc'
import NotFound from './components/NotFound/NotFound'
import HomePage from './pages/HomePage/HomePage'
import OnlyNotAuthorizedUserHoc from './components/OnlyNotAuthorizedUserHoc/OnlyNotAuthorizedUserHoc'
import ContestPage from './pages/ContestPage/ContestPage'
import UserProfilePage from './pages/UserProfilePage/UserProfilePage'
import 'react-toastify/dist/ReactToastify.css'
import ContestCreationPage from './pages/ContestCreationPage/ContestCreationPage'
import CONSTANTS from './constants'
import browserHistory from './browserHistory'
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer'
import HowItWorksPage from './pages/HowItWorksPage/HowItWorksPage'

class App extends Component {
  render () {
    return (
      <Router history={browserHistory}>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route
            exact
            path='/login'
            component={OnlyNotAuthorizedUserHoc(LoginPage)}
          />
          <Route
            exact
            path='/registration'
            component={OnlyNotAuthorizedUserHoc(RegistrationPage)}
          />
          <Route exact path='/payment' component={PrivateHoc(PaymentPage)} />
          <Route
            exact
            path='/startContest'
            component={PrivateHoc(StartContestPage)}
          />
          <Route
            exact
            path='/startContest/nameContest'
            component={PrivateHoc(ContestCreationPage, {
              contestType: CONSTANTS.NAME_CONTEST,
              title: 'Company Name'
            })}
          />
          <Route
            exact
            path='/startContest/taglineContest'
            component={PrivateHoc(ContestCreationPage, {
              contestType: CONSTANTS.TAGLINE_CONTEST,
              title: 'TAGLINE'
            })}
          />
          <Route
            exact
            path='/startContest/logoContest'
            component={PrivateHoc(ContestCreationPage, {
              contestType: CONSTANTS.LOGO_CONTEST,
              title: 'LOGO'
            })}
          />
          <Route
            exact
            path='/dashboard'
            component={PrivateHoc(DashboardPage)}
          />
          <Route
            exact
            path='/contest/:id'
            component={PrivateHoc(ContestPage)}
          />
          <Route
            exact
            path='/account'
            component={PrivateHoc(UserProfilePage)}
          />
          <Route
            exact
            path='/how-it-works'
            component={PrivateHoc(HowItWorksPage)}
          />
          <Route component={NotFound} />
        </Switch>
        <ChatContainer />
      </Router>
    )
  }
}

export default App
