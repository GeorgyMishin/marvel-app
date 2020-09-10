import api from '../../api'

const getCharacters = () => api.get('characters')

export default {
  getCharacters,
}
