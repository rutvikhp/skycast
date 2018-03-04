import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import axios from 'axios'


class Navbar extends Component{
  constructor(){
    super()
    this.state = {
      city: '',
      lat: '',
      lng: ''
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
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
      })
      console.log('hello')
    }
    geocoder.geocode({address: this.state.city}, (results, status) => {
      if (status === 'OK'){
        let lat = results[0].geometry.location.lat()
        let lng = results[0].geometry.location.lng()

        axios.post('/api/weather', {lat, lng})
        .then(res => res.data)
        .then(results => {
          console.log(results)
          this.setState({
            lat,
            lng
          })
        })
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
