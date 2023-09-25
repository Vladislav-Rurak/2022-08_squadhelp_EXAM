import React from 'react'
import { connect } from 'react-redux'
import CONSTANTS from '../../constants'
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard'
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard'
import ModeratorDashboard from '../../components/ModeratorDashboard/ModeratorDashboard'
import Header from '../../components/Header/Header'

const DashboardPage = props => {
  const { role, history } = props
  return (
    <div>
      <Header />
      {role === CONSTANTS.CUSTOMER ? (
        <CustomerDashboard history={history} match={props.match} />
      ) : role === CONSTANTS.CREATOR ? (
        <CreatorDashboard history={history} match={props.match} />
      ) : (
        <ModeratorDashboard history={history} match={props.match} />
      )}
    </div>
  )
}

const mapStateToProps = state => state.userStore.data

export default connect(mapStateToProps)(DashboardPage)
