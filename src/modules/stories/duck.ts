import {
  createAsyncAction,
  createAction,
  createReducer,
  getType,
  PayloadAction,
} from 'typesafe-actions'
import { combineReducers } from 'redux'
import { Story, StoriesPagination } from './types'
import { ById } from '../../types'

export const fetchStories = createAsyncAction(
  'FETCH_STORIES_REQUEST',
  'FETCH_STORIES_SUCCESS',
  'FETCH_STORIES_FAILURE',
  'FETCH_STORIES_CANCEL',
)<number, StoriesPagination, Error, undefined>()

export const resetStories = createAction('RESET_STORIES')()
export const setStoriesCharacterId = createAction('SET_STORIES_CHARACTER_ID')<
  number
>()

const isLoading = createReducer<boolean>(false, {
  [getType(fetchStories.request)]: () => true,
  [getType(fetchStories.success)]: () => false,
  [getType(fetchStories.failure)]: () => false,
})

const byId = createReducer<
  ById<Story>,
  PayloadAction<string, StoriesPagination>
>(
  {},
  {
    [getType(fetchStories.success)]: (state, { payload }) => {
      const newItemsById = payload.results.reduce<ById<Story>>(
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
    [getType(resetStories)]: () => ({}),
  },
)

const allIds = createReducer<
  number[],
  PayloadAction<string, StoriesPagination>
>([], {
  [getType(fetchStories.success)]: (state, { payload }) => [
    ...state,
    ...payload.results.map((item) => item.id),
  ],
  [getType(resetStories)]: () => [],
})

const loadedCharacterId = createReducer<
  number | null,
  PayloadAction<string, number>
>(null, {
  [getType(setStoriesCharacterId)]: (_, { payload }) => payload,
  [getType(resetStories)]: () => null,
})

const storiesError = createReducer<
  Error | null,
  PayloadAction<string, Error | null>
>(null, {
  [getType(fetchStories.request)]: () => null,
  [getType(fetchStories.failure)]: (_, { payload }) => payload,
  [getType(resetStories)]: () => null,
})

const total = createReducer<number, PayloadAction<string, StoriesPagination>>(
  0,
  {
    [getType(fetchStories.success)]: (_, { payload }) => payload.total,
    [getType(resetStories)]: () => 0,
  },
)

const storiesReducer = combineReducers({
  isLoading,
  byId,
  allIds,
  loadedCharacterId,
  storiesError,
  total,
})

export default storiesReducer
