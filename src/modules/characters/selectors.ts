import { RootState } from '../store'
import { ById } from '../../types'
import { Character } from './types'

export const getIsCharactersLoading = (state: RootState): boolean =>
  state.characters.isLoading

export const getCharactersById = (state: RootState): ById<Character> =>
  state.characters.byId

export const getCharactersFlowIds = (state: RootState): number[] =>
  state.characters.allIds

export const getCharactersList = (state: RootState): Character[] => {
  const byId = getCharactersById(state)
  const allIds = getCharactersFlowIds(state)

  return allIds.map((id) => byId[id])
}
