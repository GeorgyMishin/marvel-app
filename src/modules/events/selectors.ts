import { RootState } from '../store'
import { ById } from '../../types'
import { Events } from './types'

export const getIsEventsLoading = (state: RootState): boolean =>
  state.events.isLoading

export const getEventsById = (state: RootState): ById<Events> =>
  state.events.byId

export const getEventsFlowIds = (state: RootState): number[] =>
  state.events.allIds

export const getEventsList = (state: RootState): Events[] => {
  const byId = getEventsById(state)
  const allIds = getEventsFlowIds(state)

  return allIds.map((id) => byId[id])
}

export const getEventsError = (state: RootState): Error | null =>
  state.events.comicsError

export const getEventsTotal = (state: RootState) => state.events.total

export const getEventsLoadedTotal = (state: RootState) =>
  getEventsFlowIds(state).length

export const getCanLoadingMoreEvents = (state: RootState) => {
  const totalLoaded = getEventsLoadedTotal(state)
  const total = getEventsTotal(state)

  return total > totalLoaded
}
