import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCurrentAreaWeatherThunk} from '../store'

// import { Card, Icon } from 'semantic-ui-react'
import SingleCard from './SingleCard'
class LandingPage extends Component{
  constructor(){
    super()
  }
  render(){

    let arr = [1,2,3,4,5,6,7]
    return (

      <div className="ui seven cards">
        {
          arr.map( a =>
            <SingleCard />
          )
        }

      </div>
    )
  }
}


export default connect()(LandingPage)
