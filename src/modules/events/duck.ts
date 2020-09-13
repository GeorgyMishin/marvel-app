import {
  createAsyncAction,
  createAction,
  createReducer,
  getType,
  PayloadAction,
} from 'typesafe-actions'
import { combineReducers } from 'redux'
import { Events, EventsPagination } from './types'
import { ById } from '../../types'

export const fetchEvents = createAsyncAction(
  'FETCH_EVENTS_REQUEST',
  'FETCH_EVENTS_SUCCESS',
  'FETCH_EVENTS_FAILURE',
  'FETCH_EVENTS_CANCEL',
)<number, EventsPagination, Error, undefined>()

export const resetEvents = createAction('RESET_EVENTS')()
export const setEventsCharacterId = createAction('SET_EVENTS_CHARACTER_ID')<
  number
>()

const isLoading = createReducer<boolean>(false, {
  [getType(fetchEvents.request)]: () => true,
  [getType(fetchEvents.success)]: () => false,
  [getType(fetchEvents.failure)]: () => false,
})

const byId = createReducer<
  ById<Events>,
  PayloadAction<string, EventsPagination>
>(
  {},
  {
    [getType(fetchEvents.success)]: (state, { payload }) => {
      const newItemsById = payload.results.reduce<ById<Events>>(
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
    [getType(resetEvents)]: () => ({}),
  },
)

const allIds = createReducer<number[], PayloadAction<string, EventsPagination>>(
  [],
  {
    [getType(fetchEvents.success)]: (state, { payload }) => [
      ...state,
      ...payload.results.map((item) => item.id),
    ],
    [getType(resetEvents)]: () => [],
  },
)

const loadedCharacterId = createReducer<
  number | null,
  PayloadAction<string, number>
>(null, {
  [getType(setEventsCharacterId)]: (_, { payload }) => payload,
  [getType(resetEvents)]: () => null,
})

const comicsError = createReducer<
  Error | null,
  PayloadAction<string, Error | null>
>(null, {
  [getType(fetchEvents.request)]: () => null,
  [getType(fetchEvents.failure)]: (_, { payload }) => payload,
  [getType(resetEvents)]: () => null,
})

const total = createReducer<number, PayloadAction<string, EventsPagination>>(
  0,
  {
    [getType(fetchEvents.success)]: (_, { payload }) => payload.total,
    [getType(resetEvents)]: () => 0,
  },
)

const eventsReducer = combineReducers({
  isLoading,
  byId,
  allIds,
  loadedCharacterId,
  comicsError,
  total,
})

export default eventsReducer
