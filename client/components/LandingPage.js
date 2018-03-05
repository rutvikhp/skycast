import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getWeeklyAreaWeatherThunk} from '../store'
import SingleCard from './SingleCard'

class LandingPage extends Component{

  constructor(){
    super()
  }

  componentDidMount(){
    let geocoder = new google.maps.Geocoder();
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.props.getCurrentWeather(position.coords.latitude, position.coords.longitude)
      })
    }
  }

  render(){

    return (
      <div className="ui four cards">
        { ( this.props.weeklyWeather.length > 0 ) &&
          this.props.weeklyWeather.map( (data, idx) =>
            <SingleCard key = {idx} data = {data} />
          )
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    currentWeather: state.currentWeather,
    weeklyWeather: state.weeklyWeather
  }
}
const mapDispatch = dispatch => {
  return {
    getCurrentWeather(lat, lng){
      dispatch(getWeeklyAreaWeatherThunk(lat, lng))
    },
  }
}
export default connect(mapState, mapDispatch)(LandingPage)
