import axios from 'axios'

const SET_LOCATION = 'SET_LOCATION'

export const setLocationAction = (lat, lng) => {
  return {
    type: SET_LOCATION,
    lat,
    lng
  }
}

const initialState = {
  lat: '',
  lng: ''
}

export default function(state = initialState, action){
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        lat: action.lat,
        lng: action.lng
      }
    default:
      return state
  }
}
