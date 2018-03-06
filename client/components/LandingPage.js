import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getWeeklyAreaWeatherThunk} from '../store'
import SingleCard from './SingleCard'

class LandingPage extends Component{

  constructor(){
    super()
  }

  render(){

    return (
      <div className="ui four cards">
        { ( this.props.weeklyWeather.length > 0 ) &&
          this.props.weeklyWeather.map( (data, idx) =>
          (
            <div className="ui raised card" key={idx}>
              <NavLink key = {idx} to={`/detailWeather/${data.time}`}>
                <SingleCard data = {data} />
              </NavLink>
            </div>
          ))
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    weeklyWeather: state.weeklyWeather
  }
}

export default connect(mapState)(LandingPage)
