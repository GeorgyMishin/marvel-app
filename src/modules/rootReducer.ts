import { combineReducers } from 'redux'
import characters from './characters'
import characterInfo from './characterInfo'
import comics from './comics'

const rootReducer = combineReducers({
  characters,
  characterInfo,
  comics,
})

export default rootReducer
