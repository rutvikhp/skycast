import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getWeeklyAreaWeatherThunk} from '../store'

class Navbar extends Component{
  constructor(){
    super()
    this.state = {
      city: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt){
    this.setState({city: evt.target.value})
  }

  handleSubmit(evt){
    evt.preventDefault()
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: this.state.city}, (results, status) => {
      if (status === 'OK'){
        let lat = results[0].geometry.location.lat()
        let lng = results[0].geometry.location.lng()
        this.props.getCityWeather(lat, lng)
      }
    })
  }

  render(){
    return (
      <div>
        <nav>
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} />
            <button type="submit" > Click </button>
          </form>
        </nav>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    weeklyWeather: state.weeklyWeather
  }
}

const mapDispatch = dispatch => {
  return {
    getCityWeather(lat, lng) {
      dispatch(getWeeklyAreaWeatherThunk(lat, lng))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
