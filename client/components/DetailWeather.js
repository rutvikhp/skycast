import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getDetailWeatherThunk} from '../store'
import {Grid, Table} from 'semantic-ui-react'
import ReactAnimatedWeather from 'react-animated-weather';
class DetailWeather extends Component{

  componentDidMount(){
    this.props.getDetailWeather(this.props.currentWeather.lat, this.props.currentWeather.lng, this.props.match.params.time)
  }

  render(){
    const iterator = []
    for (let i = 0; i < 24; i++) iterator.push(i)
    const arr = [12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11]
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
          </Grid.Column>
          <Grid.Column width={12}>
            {
              this.props.detailWeather.map((data, idx) => (
                <Grid.Row key = {idx}>
                  <Grid.Column width ={6}>
                    {arr[idx]}
                    {  (idx<12) ?
                      <span> am</span>
                      :
                      <span> pm</span>
                    }
                  </Grid.Column>
                  <Grid.Column width={6}>

                    <ReactAnimatedWeather
                      icon={data.icon}
                      color="orange"
                      size={16}
                      animate={true}
                    />

                  </Grid.Column>
                </Grid.Row>
              ))
            }

          </Grid.Column>
          <Grid.Column width={2}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapState = state => {
  return {
    currentWeather: state.currentWeather,
    detailWeather: state.detailWeather
  }
}
const mapDispatch = dispatch => {
  return {
    getDetailWeather(lat, lng, time){
      dispatch(getDetailWeatherThunk(lat, lng, time))
    },
  }
}
export default connect(mapState, mapDispatch)(DetailWeather)
