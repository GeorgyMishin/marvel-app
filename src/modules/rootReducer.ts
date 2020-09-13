import { combineReducers } from 'redux'
import characters from './characters'
import characterInfo from './characterInfo'
import comics from './comics'
import events from './events'
import stories from './stories'

const rootReducer = combineReducers({
  characters,
  characterInfo,
  comics,
  events,
  stories,
})

export default rootReducer
