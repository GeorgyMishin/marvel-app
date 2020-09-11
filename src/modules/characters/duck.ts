import {
  createAsyncAction,
  createReducer,
  getType,
  PayloadAction,
} from 'typesafe-actions'
import { combineReducers } from 'redux'
import { Character, CharacterPagination } from './types'
import { ById } from '../../types'

export const fetchCharacters = createAsyncAction(
  'GET_CHARACTERS_REQUEST',
  'GET_CHARACTERS_SUCCESS',
  'GET_CHARACTERS_FAILURE',
)<undefined, CharacterPagination, Error>()
export const fetchCharacterInfo = createAsyncAction(
  'GET_CHARACTER_INFO_REQUEST',
  'GET_CHARACTER_INFO_SUCCESS',
  'GET_CHARACTER_INFO_FAILURE',
)<string, CharacterPagination, Error>()

const isCharactersLoading = createReducer<boolean>(false, {
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
})

const selectedCharacter = createReducer<
  Character | null,
  PayloadAction<string, CharacterPagination>
>(null, {
  [getType(fetchCharacterInfo.success)]: (_, { payload }) => payload.results[0],
})

const total = createReducer<number, PayloadAction<string, CharacterPagination>>(
  0,
  {
    [getType(fetchCharacters.success)]: (_, { payload }) => payload.total,
  },
)

const charactersReducer = combineReducers({
  isCharactersLoading,
  byId,
  allIds,
  total,
  selectedCharacter,
})

export default charactersReducer
