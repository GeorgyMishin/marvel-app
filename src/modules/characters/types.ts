import { Image, DataPagination } from '../../types'

export type Character = {
  id: number
  name: string
  description: string
  thumbnail: Image
}

export type CharacterPagination = DataPagination<Character>
