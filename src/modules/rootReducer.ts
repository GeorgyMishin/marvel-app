import { combineReducers } from 'redux'
import characters from './characters'
import characterInfo from './characterInfo'
import comics from './comics'
import events from './events'

const rootReducer = combineReducers({
  characters,
  characterInfo,
  comics,
  events,
})

export default rootReducer
