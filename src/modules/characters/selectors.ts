import { RootState } from '../store'
import { ById } from '../../types'
import { Character } from './types'

export const getIsLoadingCharacters = (state: RootState): boolean =>
  state.characters.isLoading

export const getCharactersById = (state: RootState): ById<Character> =>
  state.characters.byId

export const getCharactersFlowIds = (state: RootState): number[] =>
  state.characters.allIds
