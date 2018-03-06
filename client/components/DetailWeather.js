import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getDetailWeatherThunk} from '../store'
import {Grid, Table} from 'semantic-ui-react'
import ReactAnimatedWeather from 'react-animated-weather';
class DetailWeather extends Component{

  constructor(){
    super()
  }

  componentDidMount(){
    this.props.getDetailWeather(this.props.currentWeather.lat, this.props.currentWeather.lng, this.props.match.params.time)
  }

  render(){
    const iterator = []
    for (let i=0; i<24; i++) iterator.push(i)
    const arr = [12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11]
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
          </Grid.Column>

            <Grid.Column width={12}>
              <Table celled >
                <Table.Body>
                  {
                    this.props.detailWeather.map((data, idx) => (
                      <Grid.Row columns="equal">
                        <Grid.Column width ={3}>

                          {
                            (idx<12) ?
                              <div>{arr[idx]} am</div>
                              :
                              <div>{arr[idx]} pm</div>
                          }

                        </Grid.Column>
                        <Grid.Column width={3}>

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
                  {/* <Table.Row>
                    <Table.Cell>

                    </Table.Cell>
                    {
                      this.props.detailWeather.map(data =>(
                        <Table.Cell>
                          <ReactAnimatedWeather
                            icon={data.icon}
                            color="orange"
                            size={16}
                            animate={true}
                          />
                        </Table.Cell>
                      ))
                    }
                  </Table.Row> */}
                </Table.Body>
              </Table>
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
