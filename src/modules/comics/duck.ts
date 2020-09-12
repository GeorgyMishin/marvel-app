import {
  createAsyncAction,
  createAction,
  createReducer,
  getType,
  PayloadAction,
} from 'typesafe-actions'
import { combineReducers } from 'redux'
import { Comics, ComicsPagination } from './types'
import { ById } from '../../types'

export const fetchComics = createAsyncAction(
  'FETCH_COMICS_REQUEST',
  'FETCH_COMICS_SUCCESS',
  'FETCH_COMICS_FAILURE',
  'FETCH_COMICS_CANCEL',
)<number, ComicsPagination, Error, undefined>()

export const resetComics = createAction('RESET_COMICS')()
export const setComicsCharacterId = createAction('SET_COMICS_CHARACTER_ID')<
  number
>()

const isLoading = createReducer<boolean>(false, {
  [getType(fetchComics.request)]: () => true,
  [getType(fetchComics.success)]: () => false,
  [getType(fetchComics.failure)]: () => false,
})

const byId = createReducer<
  ById<Comics>,
  PayloadAction<string, ComicsPagination>
>(
  {},
  {
    [getType(fetchComics.success)]: (state, { payload }) => {
      const newItemsById = payload.results.reduce<ById<Comics>>(
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
    [getType(resetComics)]: () => ({}),
  },
)

const allIds = createReducer<number[], PayloadAction<string, ComicsPagination>>(
  [],
  {
    [getType(fetchComics.success)]: (state, { payload }) => [
      ...state,
      ...payload.results.map((item) => item.id),
    ],
    [getType(resetComics)]: () => [],
  },
)

const loadedCharacterId = createReducer<
  number | null,
  PayloadAction<string, number>
>(null, {
  [getType(setComicsCharacterId)]: (_, { payload }) => payload,
  [getType(resetComics)]: () => null,
})

const comicsError = createReducer<
  Error | null,
  PayloadAction<string, Error | null>
>(null, {
  [getType(fetchComics.request)]: () => null,
  [getType(fetchComics.failure)]: (_, { payload }) => payload,
  [getType(resetComics)]: () => null,
})

const total = createReducer<number, PayloadAction<string, ComicsPagination>>(
  0,
  {
    [getType(fetchComics.success)]: (_, { payload }) => payload.total,
    [getType(resetComics)]: () => 0,
  },
)

const comicsReducer = combineReducers({
  isLoading,
  byId,
  allIds,
  loadedCharacterId,
  comicsError,
  total,
})

export default comicsReducer
