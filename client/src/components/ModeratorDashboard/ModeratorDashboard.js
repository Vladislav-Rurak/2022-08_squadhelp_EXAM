import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'
import isEqual from 'lodash/isEqual'
import {
  getContestsForCreative,
  clearContestList,
  setNewCreatorFilter,
  getDataForContest
} from '../../actions/actionCreator'
import ContestsContainer from '../ContestsContainer/ContestsContainer'
import ContestBox from '../ContestBox/ContestBox'
import styles from './ModeratorDashboard.module.sass'
import TryAgain from '../TryAgain/TryAgain'

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo'
]

class ModeratorDashboard extends React.Component {
  renderSelectType = () => {
    const array = []
    const { creatorFilter } = this.props
    types.forEach(
      (el, i) =>
        !i ||
        array.push(
          <option key={i - 1} value={el}>
            {el}
          </option>
        )
    )
    return (
      <select
        onChange={({ target }) =>
          this.changePredicate({
            name: 'typeIndex',
            value: types.indexOf(target.value)
          })
        }
        value={types[creatorFilter.typeIndex]}
        className={styles.input}
      >
        {array}
      </select>
    )
  }

  renderIndustryType = () => {
    const array = []
    const { creatorFilter } = this.props
    const { industry } = this.props.dataForContest.data
    array.push(
      <option key={0} value={null}>
        Choose industry
      </option>
    )
    industry.forEach((industry, i) =>
      array.push(
        <option key={i + 1} value={industry}>
          {industry}
        </option>
      )
    )
    return (
      <select
        onChange={({ target }) =>
          this.changePredicate({
            name: 'industry',
            value: target.value
          })
        }
        value={creatorFilter.industry}
        className={styles.input}
      >
        {array}
      </select>
    )
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.location.search !== this.props.location.search) {
      this.parseUrlForParams(nextProps.location.search)
    }
  }

  componentDidMount () {
    this.props.getDataForContest()
    if (
      this.parseUrlForParams(this.props.location.search) &&
      !this.props.contests.length
    )
      this.getContests(this.props.creatorFilter)
  }

  getContests = filter => {
    this.props.getContests({
      limit: 8,
      offset: 0,
      ...filter
    })
  }

  changePredicate = ({ name, value }) => {
    const { creatorFilter } = this.props
    this.props.newFilter({ [name]: value === 'Choose industry' ? null : value })
    this.parseParamsToUrl({
      ...creatorFilter,
      ...{ [name]: value === 'Choose industry' ? null : value }
    })
  }

  parseParamsToUrl = creatorFilter => {
    const obj = {}
    Object.keys(creatorFilter).forEach(el => {
      if (creatorFilter[el]) obj[el] = creatorFilter[el]
    })
    this.props.history.push(`/Dashboard?${queryString.stringify(obj)}`)
  }

  parseUrlForParams = search => {
    const obj = queryString.parse(search)
    const filter = {
      typeIndex: obj.typeIndex || 1,
      contestId: obj.contestId ? obj.contestId : '',
      industry: obj.industry ? obj.industry : '',
      awardSort: obj.awardSort || 'asc',
      ownEntries: typeof obj.ownEntries === 'undefined' ? false : obj.ownEntries
    }
    if (!isEqual(filter, this.props.creatorFilter)) {
      this.props.newFilter(filter)
      this.props.clearContestsList()
      this.getContests(filter)
      return false
    }
    return true
  }

  getPredicateOfRequest = () => {
    const obj = {}
    const { creatorFilter } = this.props
    Object.keys(creatorFilter).forEach(el => {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el]
      }
    })
    obj.ownEntries = creatorFilter.ownEntries
    return obj
  }

  loadMore = startFrom => {
    this.props.getContests({
      limit: 8,
      offset: startFrom,
      ...this.getPredicateOfRequest()
    })
  }

  setContestList = () => {
    const array = []
    const { contests } = this.props
    for (let i = 0; i < contests.length; i++) {
      array.push(
        <ContestBox
          data={contests[i]}
          key={contests[i].id}
          goToExtended={this.goToExtended}
        />
      )
    }
    return array
  }

  goToExtended = contestId => {
    this.props.history.push(`/contest/${contestId}`)
  }

  tryLoadAgain = () => {
    this.props.clearContestsList()
    this.props.getContests({
      limit: 8,
      offset: 0,
      ...this.getPredicateOfRequest()
    })
  }

  render () {
    const { error, haveMore } = this.props
    return (
      <div className={styles.mainContainer}>
        {error ? (
          <div className={styles.messageContainer}>
            <TryAgain getData={this.tryLoadAgain} />
          </div>
        ) : (
          <ContestsContainer
            isFetching={this.props.isFetching}
            loadMore={this.loadMore}
            history={this.props.history}
            haveMore={haveMore}
          >
            {this.setContestList()}
          </ContestsContainer>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { contestsList, dataForContest } = state
  return { ...contestsList, dataForContest }
}

const mapDispatchToProps = dispatch => ({
  getContests: data => dispatch(getContestsForCreative(data)),
  clearContestsList: () => dispatch(clearContestList()),
  newFilter: filter => dispatch(setNewCreatorFilter(filter)),
  getDataForContest: () => dispatch(getDataForContest())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard)
)
