import { AxiosError } from 'axios'
import api from '../../api'
import { ResponseData } from '../../types'
import { StoriesPagination, StoriesRequestParams } from './types'

const getStories = async ({
  characterId,
  params,
}: StoriesRequestParams): Promise<StoriesPagination> => {
  try {
    const response = await api.get<ResponseData<StoriesPagination>>(
      `characters/${characterId}/stories`,
      { params },
    )

    return response.data.data
  } catch (ex) {
    const error = ex as AxiosError
    throw new Error(error.response?.data?.status || error.message)
  }
}

export default {
  getStories,
}
