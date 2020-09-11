import api from '../../api'
import { ResponseData } from '../../types'
import { CharacterPagination } from './types'

const getCharacters = async (params?: any): Promise<CharacterPagination> => {
  const response = await api.get<ResponseData<CharacterPagination>>(
    'characters',
    { params },
  )

  return response.data.data
}

export default {
  getCharacters,
}
