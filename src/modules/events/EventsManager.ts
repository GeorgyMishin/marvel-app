import { AxiosError } from 'axios'
import api from '../../api'
import { ResponseData } from '../../types'
import { EventsPagination, EventsRequestParams } from './types'

const getEvents = async ({
  characterId,
  params,
}: EventsRequestParams): Promise<EventsPagination> => {
  try {
    const response = await api.get<ResponseData<EventsPagination>>(
      `characters/${characterId}/events`,
      { params },
    )

    return response.data.data
  } catch (ex) {
    const error = ex as AxiosError
    throw new Error(error.response?.data?.status || error.message)
  }
}

export default {
  getEvents,
}
