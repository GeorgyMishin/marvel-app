import {
  createAsyncAction,
  createReducer,
  getType,
  PayloadAction,
} from 'typesafe-actions'
import { combineReducers } from 'redux'
import { Character } from './types'
import { ById } from '../../types'

export const fetchCharacters = createAsyncAction(
  'GET_CHARACTERS_REQUEST',
  'GET_CHARACTERS_SUCCESS',
  'GET_CHARACTERS_FAILURE',
)<undefined, Character, Error>()

const isLoading = createReducer<boolean>(false, {
  [getType(fetchCharacters.request)]: () => true,
  [getType(fetchCharacters.success)]: () => false,
  [getType(fetchCharacters.failure)]: () => false,
})

const byId = createReducer<ById<Character>, PayloadAction<string, Character[]>>(
  {},
  {
    [getType(fetchCharacters.success)]: (state, { payload }) => {
      const newItemsById = payload.reduce<ById<Character>>(
        (previous, currentCharacter) => ({
          ...previous,
          [currentCharacter.id.toString()]: currentCharacter,
        }),
        {},
      )

      return {
        ...newItemsById,
        ...state,
      }
    },
  },
)

const allIds = createReducer<number[], PayloadAction<string, Character[]>>([], {
  [getType(fetchCharacters.success)]: (state, { payload }) => [
    ...state,
    ...payload.map((item) => item.id),
  ],
})

const charactersReducer = combineReducers({
  isLoading,
  byId,
  allIds,
})

export default charactersReducer
