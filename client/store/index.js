import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import currentWeather from './currentWeather'

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))

const reducer = combineReducers({
  user,
  currentWeather
})

const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './currentWeather'
