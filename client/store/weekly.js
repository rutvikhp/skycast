import axios from 'axios'

const GET_WEEKLY_AREA_WEATHER = 'GET_WEEKLY_AREA_WEATHER'

const getWeeklyAreaWeatherAction = (weeklyWeather) => {
  return {
    type: GET_WEEKLY_AREA_WEATHER,
    weeklyWeather
  }
}

export const getWeeklyAreaWeatherThunk = (lat, lng) => dispatch =>
  axios.post('/api/weather', {lat, lng})
  .then(res => res.data)
  .then(result => {
    result = result.daily.data.map(arr => (
      {
        icon: arr.icon,
        tempHigh: Math.floor(arr.temperatureHigh),
        tempLow: Math.floor(arr.temperatureMin),
        time: arr.time,
        summary: arr.summary
      }
    ))
    dispatch(getWeeklyAreaWeatherAction(result))}
)

const initialState = []

export default function(state = initialState, action){
  switch (action.type) {
    case GET_WEEKLY_AREA_WEATHER:
      return [...action.weeklyWeather]

    default:
      return state
  }
}
