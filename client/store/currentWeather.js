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
  .then(result => {
    console.log(result)
    dispatch(getCurrentAreaWeatherAction(result))}
)

const initialState = {
  summary: '',
  currentTemp: '',
  tempHigh: '',
  tempLow: '',
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
        currentTemp: Math.floor(action.currentWeather.currently.temperature),
        tempHigh: Math.floor(action.currentWeather.daily.data[0].temperatureMax),
        tempLow: Math.floor(action.currentWeather.daily.data[0].temperatureMin),
        feelsLikeTemp: Math.floor(action.currentWeather.currently.apparentTemperature),
        icon: action.currentWeather.currently.icon,
        time: action.currentWeather.currently.time
      }
    default:
      return state
  }
}
