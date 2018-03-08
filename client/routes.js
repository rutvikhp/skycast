import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {LandingPage, DetailWeather} from './components'


/**
 * COMPONENT
 */
class Routes extends Component {
  render () {

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/detailWeather/:time" component={DetailWeather} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect()(Routes))
