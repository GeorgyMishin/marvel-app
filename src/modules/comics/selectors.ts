import { RootState } from '../store'
import { ById } from '../../types'
import { Comics } from './types'

export const getIsComicsLoading = (state: RootState): boolean =>
  state.comics.isLoading

export const getComicsById = (state: RootState): ById<Comics> =>
  state.comics.byId

export const getComicsFlowIds = (state: RootState): number[] =>
  state.comics.allIds

export const getComicsList = (state: RootState): Comics[] => {
  const byId = getComicsById(state)
  const allIds = getComicsFlowIds(state)

  return allIds.map((id) => byId[id])
}

export const getComicsError = (state: RootState): Error | null =>
  state.comics.comicsError

export const getComicsTotal = (state: RootState) => state.comics.total

export const getComicsLoadedTotal = (state: RootState) =>
  getComicsFlowIds(state).length

export const getCanLoadingMoreComics = (state: RootState) => {
  const totalLoaded = getComicsLoadedTotal(state)
  const total = getComicsTotal(state)

  return total > totalLoaded
}
