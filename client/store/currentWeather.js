import axios from 'axios'

const GET_CURRENT_AREA_WEATHER = 'GET_CURRENT_AREA_WEATHER'

const getCurrentAreaWeatherAction = (currentWeather) => {
  return {
    type: GET_CURRENT_AREA_WEATHER,
    currentWeather
  }
}

export const getCurrentAreaWeatherThunk = (lat, lng) => dispatch =>
  axios.post('/api/weather', {lat, lng})
  .then(res => res.data)
  .then(result => dispatch(getCurrentAreaWeatherAction(result))
)

const initialState = {
  summary: '',
  temp: '',
  feelsLikeTemp: '',
  icon: '',
  time: ''
}

export default function(state = initialState, action){
  switch (action.type) {
    case GET_CURRENT_AREA_WEATHER:
      return {
        ...state,
        summary: action.currentWeather.hourly.summary,
        temp: action.currentWeather.currently.temperature,
        icon: action.currentWeather.currently.icon
      }
    default:
      return state
  }
}
