import { Image, DataPagination, EntityPreviews } from '../../types'

export type ComicsPreview = {
  name: string
  resourceURI: string
}

export type SeriesPreview = {
  name: string
  resourceURI: string
}

export type EventsPreview = {
  name: string
  resourceURI: string
}

export type StoriesPreview = {
  name: string
  resourceURI: string
}

export type Character = {
  id: number
  name: string
  description: string
  thumbnail: Image
  comics: EntityPreviews<ComicsPreview>
  series: EntityPreviews<SeriesPreview>
  events: EntityPreviews<EventsPreview>
  stories: EntityPreviews<StoriesPreview>
}

export type CharacterPagination = DataPagination<Character>
