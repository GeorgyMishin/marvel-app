import { Image, DataPagination } from '../../types'

export type Comics = {
  id: number
  digitalId: number
  title: string
  issueNumber: number
  variantDescription: string
  description: string
  thumbnail: Image
  images: Image[]
}

export type ComicsPagination = DataPagination<Comics>

export type ComicsRequestParams = {
  characterId: number
  params?: any
}
