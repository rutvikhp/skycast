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
      <div style={ui_four_cards}>
      <div className="ui four cards">
        { ( this.props.weeklyWeather.length > 0 ) &&
          this.props.weeklyWeather.map( (data, idx) =>
          (

              <div className="ui raised card" key={idx}>
                <NavLink key = {idx} to={`/detailWeather/${data.time}`} style={single}>
                  <SingleCard data = {data} />
                </NavLink>
              </div>

          ))
        }
      </div>
      </div>
    )
  }
}

var ui_four_cards = {
  padding : "30px 100px"
};

var single = {
    height : "200px"
}

const mapState = state => {
  return {
    weeklyWeather: state.weeklyWeather
  }
}

export default connect(mapState)(LandingPage)
