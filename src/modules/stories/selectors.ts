import { RootState } from '../store'
import { ById } from '../../types'
import { Story } from './types'

export const getIsStoriesLoading = (state: RootState): boolean =>
  state.stories.isLoading

export const getStoriesById = (state: RootState): ById<Story> =>
  state.stories.byId

export const getStoriesFlowIds = (state: RootState): number[] =>
  state.stories.allIds

export const getStoriesList = (state: RootState): Story[] => {
  const byId = getStoriesById(state)
  const allIds = getStoriesFlowIds(state)

  return allIds.map((id) => byId[id])
}

export const getStoriesError = (state: RootState): Error | null =>
  state.stories.storiesError

export const getStoriesTotal = (state: RootState) => state.stories.total

export const getStoriesLoadedTotal = (state: RootState) =>
  getStoriesFlowIds(state).length

export const getCanLoadingMoreStories = (state: RootState) => {
  const totalLoaded = getStoriesLoadedTotal(state)
  const total = getStoriesTotal(state)

  return total > totalLoaded
}
