import { combineReducers } from 'redux'
import characters from './characters'
import characterInfo from './characterInfo'

const rootReducer = combineReducers({
  characters,
  characterInfo,
})

export default rootReducer
