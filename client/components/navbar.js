import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getWeeklyAreaWeatherThunk, setLocationAction} from '../store'

class Navbar extends Component{
  constructor(){
    super()
    this.state = {
      city: '',
      searchText: '',
    }
    // this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.props.setLocation(position.coords.latitude, position.coords.longitude)
        this.props.getCityWeather(position.coords.latitude, position.coords.longitude)
        let geocoder = new google.maps.Geocoder();
        let location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        geocoder.geocode({location: location}, (results, status) => {
          if (status === 'OK'){
            this.setState({city: results[2].formatted_address.split(',')[1]})
          }
        })
      })
    }
  }

  handleSubmit(evt){
    evt.preventDefault()
    const city = evt.target.city.value
    // if (localStorage.getItem("prevSearch")){
    //   let storedNames = JSON.parse(localStorage.getItem("prevSearch"));
    //   storedNames = [city, ...storedNames]
    //   localStorage.setItem("prevSearch", JSON.stringify(storedNames))
    // }
    // else {
    //   localStorage.setItem("prevSearch", city)
    // }
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: city}, (results, status) => {
      if (status === 'OK'){
        let lat = results[0].geometry.location.lat()
        let lng = results[0].geometry.location.lng()
        this.props.setLocation(lat, lng)
        this.props.getCityWeather(lat, lng)
        this.setState({city, searchText:''})
      }
    })
  }

  render(){
    return (
      <div>
        <nav>
          <div style={ui_four_cards}>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="city" value={this.state.searchText}
                onChange={(evt)=>{this.setState({searchText:evt.target.value})}}/>
              <button type="submit" > Click </button>
            </form>

          </div>
        </nav>
        <hr />
        <div style={{paddingTop: "10px", paddingBottom:'10px', textAlign: 'center', fontSize : '20px'}} >
        <label >Your Search: {this.state.city} </label>
        </div>
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
