import {
  createAsyncAction,
  createReducer,
  getType,
  PayloadAction,
  createAction,
} from 'typesafe-actions'
import { combineReducers } from 'redux'
import { Character, CharacterPagination } from './types'
import { ById } from '../../types'

export const fetchCharacters = createAsyncAction(
  'GET_CHARACTERS_REQUEST',
  'GET_CHARACTERS_SUCCESS',
  'GET_CHARACTERS_FAILURE',
  'GET_CHARACTERS_CANCEL',
)<undefined, CharacterPagination, Error, undefined>()
export const resetCharacters = createAction('RESET_CHARACTERS')()

const isLoading = createReducer<boolean>(false, {
  [getType(fetchCharacters.request)]: () => true,
  [getType(fetchCharacters.success)]: () => false,
  [getType(fetchCharacters.failure)]: () => false,
})

const byId = createReducer<
  ById<Character>,
  PayloadAction<string, CharacterPagination>
>(
  {},
  {
    [getType(fetchCharacters.success)]: (state, { payload }) => {
      const newItemsById = payload.results.reduce<ById<Character>>(
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
    [getType(resetCharacters)]: () => ({}),
  },
)

const allIds = createReducer<
  number[],
  PayloadAction<string, CharacterPagination>
>([], {
  [getType(fetchCharacters.success)]: (state, { payload }) => [
    ...state,
    ...payload.results.map((item) => item.id),
  ],
  [getType(resetCharacters)]: () => [],
})

const total = createReducer<number, PayloadAction<string, CharacterPagination>>(
  0,
  {
    [getType(fetchCharacters.success)]: (_, { payload }) => payload.total,
    [getType(resetCharacters)]: () => 0,
  },
)

const charactersError = createReducer<
  Error | null,
  PayloadAction<string, Error | null>
>(null, {
  [getType(fetchCharacters.request)]: () => null,
  [getType(fetchCharacters.failure)]: (_, { payload }) => payload,
  [getType(resetCharacters)]: () => null,
})

const charactersReducer = combineReducers({
  isLoading,
  byId,
  allIds,
  total,
  charactersError,
})

export default charactersReducer
