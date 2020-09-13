import { Image, DataPagination } from '../../types'

export type Story = {
  id: number
  title: string
  description: string
  thumbnail?: Image
}

export type StoriesPagination = DataPagination<Story>

export type StoriesRequestParams = {
  characterId: number
  params?: any
}
