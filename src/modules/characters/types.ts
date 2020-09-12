import { Image, DataPagination } from '../../types'

export type ComicsPreview = {
  name: string
  resourceURI: string
}

export type Character = {
  id: number
  name: string
  description: string
  thumbnail: Image
  comics: {
    available: number
    collectionURI: string
    items: ComicsPreview[]
  }
}

export type CharacterPagination = DataPagination<Character>
