import { AxiosError } from 'axios'
import api from '../../api'
import { ResponseData } from '../../types'
import { CharacterPagination } from './types'

const getCharacters = async (params?: any): Promise<CharacterPagination> => {
  try {
    const response = await api.get<ResponseData<CharacterPagination>>(
      'characters',
      { params },
    )

    return response.data.data
  } catch (ex) {
    const error = ex as AxiosError
    throw new Error(error.response?.data?.status || error.message)
  }
}

export default {
  getCharacters,
}
