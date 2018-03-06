import axios from 'axios'

const GET_DETAIL_WEATHER = 'GET_DETAIL_WEATHER'

const getDetailWeatherAction = (result) => {
  return {
    type: GET_DETAIL_WEATHER,
    result
  }
}

export const getDetailWeatherThunk = (lat, lng, time) => dispatch =>
  axios.post('/api/weather/time', {lat, lng, time})
  .then(res => res.data)
  .then(result => {
    result = result.hourly.data.map(arr => (
      {
        icon: arr.icon.toUpperCase().replace(/-/g, '_'),
        summary: arr.summary,
        temp: Math.floor(arr.temperature),
        feelsLike: Math.floor(arr.apparentTemperature),
        windSpeed: arr.windSpeed,
        time: arr.time
      }
    ))
    dispatch(getDetailWeatherAction(result))
  })

const initialState = []

export default function(state = initialState, action){
  switch (action.type) {
    case GET_DETAIL_WEATHER:
      return [...action.result]
    default:
      return state
  }
}
