import { AxiosError } from 'axios'
import api from '../../api'
import { ResponseData } from '../../types'
import { SeriesPagination, SeriesRequestParams } from './types'

const getSeries = async ({
  characterId,
  params,
}: SeriesRequestParams): Promise<SeriesPagination> => {
  try {
    const response = await api.get<ResponseData<SeriesPagination>>(
      `characters/${characterId}/series`,
      { params },
    )

    return response.data.data
  } catch (ex) {
    const error = ex as AxiosError
    throw new Error(error.response?.data?.status || error.message)
  }
}

export default {
  getSeries,
}
