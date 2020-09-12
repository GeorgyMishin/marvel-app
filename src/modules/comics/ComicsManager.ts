import { AxiosError } from 'axios'
import api from '../../api'
import { ResponseData } from '../../types'
import { ComicsPagination, ComicsRequestParams } from './types'

const getComics = async ({
  characterId,
  params,
}: ComicsRequestParams): Promise<ComicsPagination> => {
  try {
    const response = await api.get<ResponseData<ComicsPagination>>(
      `characters/${characterId}/comics`,
      { params },
    )

    return response.data.data
  } catch (ex) {
    const error = ex as AxiosError
    throw new Error(error.response?.data?.status || error.message)
  }
}

export default {
  getComics,
}
