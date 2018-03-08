import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getWeeklyAreaWeatherThunk, setLocationAction} from '../store'

class Navbar extends Component{
  constructor(){
    super()
    this.state = {
      city: '',
      searchText: []
    }
    // this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.props.setLocation(position.coords.latitude, position.coords.longitude)
        this.props.getCityWeather(position.coords.latitude, position.coords.longitude)
      })
    }
    // localStorage.setItem("lastname", "Rutvik");
    console.log(localStorage.getItem("prevSearch"));
  }

  // handleChange(evt){
  //   this.setState({city: evt.target.value})
  // }

  handleSubmit(evt){
    evt.preventDefault()
    const city = evt.target.city.value
    if (localStorage.getItem("prevSearch")){
      let storedNames = JSON.parse(localStorage.getItem("prevSearch"));
      storedNames = [city, ...storedNames]
      localStorage.setItem("prevSearch", JSON.stringify(storedNames))
    }
    else {
      localStorage.setItem("prevSearch", city)
    }
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: city}, (results, status) => {
      if (status === 'OK'){
        let lat = results[0].geometry.location.lat()
        let lng = results[0].geometry.location.lng()
        this.props.setLocation(lat, lng)
        this.props.getCityWeather(lat, lng)
      }
    })
    this.setState({city})
  }

  render(){
    return (
      <div>
        <nav>
          <div style={ui_four_cards}>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="city" />
              <button type="submit" > Click </button>
            </form>
            {/* <label>City: </label>{this.state.city} */}
          </div>
        </nav>
        <hr />
      </div>
    )
  }
}

var ui_four_cards = {
  padding : "10px 100px"
};

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
    },
    setLocation(lat, lng) {
      dispatch(setLocationAction(lat, lng))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
