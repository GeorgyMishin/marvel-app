import { Image, DataPagination } from '../../types'

export type Events = {
  id: number
  title: string
  description: string
  thumbnail: Image
}

export type EventsPagination = DataPagination<Events>

export type EventsRequestParams = {
  characterId: number
  params?: any
}
