import {
  createAsyncAction,
  createAction,
  createReducer,
  getType,
  PayloadAction,
} from 'typesafe-actions'
import { combineReducers } from 'redux'
import { Series, SeriesPagination } from './types'
import { ById } from '../../types'

export const fetchSeries = createAsyncAction(
  'FETCH_SERIES_REQUEST',
  'FETCH_SERIES_SUCCESS',
  'FETCH_SERIES_FAILURE',
  'FETCH_SERIES_CANCEL',
)<number, SeriesPagination, Error, undefined>()

export const resetSeries = createAction('RESET_SERIES')()
export const setSeriesCharacterId = createAction('SET_SERIES_CHARACTER_ID')<
  number
>()

const isLoading = createReducer<boolean>(false, {
  [getType(fetchSeries.request)]: () => true,
  [getType(fetchSeries.success)]: () => false,
  [getType(fetchSeries.failure)]: () => false,
})

const byId = createReducer<
  ById<Series>,
  PayloadAction<string, SeriesPagination>
>(
  {},
  {
    [getType(fetchSeries.success)]: (state, { payload }) => {
      const newItemsById = payload.results.reduce<ById<Series>>(
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
    [getType(resetSeries)]: () => ({}),
  },
)

const allIds = createReducer<number[], PayloadAction<string, SeriesPagination>>(
  [],
  {
    [getType(fetchSeries.success)]: (state, { payload }) => [
      ...state,
      ...payload.results.map((item) => item.id),
    ],
    [getType(resetSeries)]: () => [],
  },
)

const loadedCharacterId = createReducer<
  number | null,
  PayloadAction<string, number>
>(null, {
  [getType(setSeriesCharacterId)]: (_, { payload }) => payload,
  [getType(resetSeries)]: () => null,
})

const seriesError = createReducer<
  Error | null,
  PayloadAction<string, Error | null>
>(null, {
  [getType(fetchSeries.request)]: () => null,
  [getType(fetchSeries.failure)]: (_, { payload }) => payload,
  [getType(resetSeries)]: () => null,
})

const total = createReducer<number, PayloadAction<string, SeriesPagination>>(
  0,
  {
    [getType(fetchSeries.success)]: (_, { payload }) => payload.total,
    [getType(resetSeries)]: () => 0,
  },
)

const seriesReducer = combineReducers({
  isLoading,
  byId,
  allIds,
  loadedCharacterId,
  seriesError,
  total,
})

export default seriesReducer
