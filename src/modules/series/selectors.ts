import { RootState } from '../store'
import { ById } from '../../types'
import { Series } from './types'

export const getIsSeriesLoading = (state: RootState): boolean =>
  state.series.isLoading

export const getSeriesById = (state: RootState): ById<Series> =>
  state.series.byId

export const getSeriesFlowIds = (state: RootState): number[] =>
  state.series.allIds

export const getSeriesList = (state: RootState): Series[] => {
  const byId = getSeriesById(state)
  const allIds = getSeriesFlowIds(state)

  return allIds.map((id) => byId[id])
}

export const getSeriesError = (state: RootState): Error | null =>
  state.series.seriesError

export const getSeriesTotal = (state: RootState) => state.series.total

export const getSeriesLoadedTotal = (state: RootState) =>
  getSeriesFlowIds(state).length

export const getCanLoadingMoreSeries = (state: RootState) => {
  const totalLoaded = getSeriesLoadedTotal(state)
  const total = getSeriesTotal(state)

  return total > totalLoaded
}
