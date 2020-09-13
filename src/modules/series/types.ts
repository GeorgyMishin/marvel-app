import { Image, DataPagination } from '../../types'

export type Series = {
  id: number
  title: string
  description: string
  thumbnail?: Image
}

export type SeriesPagination = DataPagination<Series>

export type SeriesRequestParams = {
  characterId: number
  params?: any
}
