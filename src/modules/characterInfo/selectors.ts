import { RootState } from '../store'
import { Character } from '../characters'

export const getIsCharacterInfoLoading = (state: RootState): boolean =>
  state.characterInfo.isLoading

export const getCharacterInfo = (state: RootState): Character | null =>
  state.characterInfo.selectedCharacter

export const getCharacterInfoError = (state: RootState): Error | null =>
  state.characterInfo.characterInfoError
