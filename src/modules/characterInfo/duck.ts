import {
  createAsyncAction,
  createReducer,
  getType,
  PayloadAction,
  createAction,
} from 'typesafe-actions'
import { combineReducers } from 'redux'
import { CharacterPagination, Character } from '../characters'

export const fetchCharacterInfo = createAsyncAction(
  'GET_CHARACTER_INFO_REQUEST',
  'GET_CHARACTER_INFO_SUCCESS',
  'GET_CHARACTER_INFO_FAILURE',
)<string, CharacterPagination, Error>()
export const resetCharacterInfo = createAction('RESET_CHARACTER_INFO')()

const selectedCharacter = createReducer<
  Character | null,
  PayloadAction<string, CharacterPagination>
>(null, {
  [getType(fetchCharacterInfo.success)]: (_, { payload }) => payload.results[0],
  [getType(resetCharacterInfo)]: () => null,
})

const characterInfoError = createReducer<
  Error | null,
  PayloadAction<string, Error | null>
>(null, {
  [getType(fetchCharacterInfo.request)]: () => null,
  [getType(fetchCharacterInfo.failure)]: (_, { payload }) => payload,
})

const isLoading = createReducer<boolean>(false, {
  [getType(fetchCharacterInfo.request)]: () => true,
  [getType(fetchCharacterInfo.success)]: () => false,
  [getType(fetchCharacterInfo.failure)]: () => false,
})

const characterInfoReducer = combineReducers({
  selectedCharacter,
  characterInfoError,
  isLoading,
})

export default characterInfoReducer
