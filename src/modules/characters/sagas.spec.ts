import { testSaga } from 'redux-saga-test-plan'
import { fetchCharactersSaga } from './sagas'
import { getCharacterLoadedTotal } from './selectors'
import CharacterManager from './CharacterManager'
import { PAGE_LIMIT } from '../../constants'
import { fetchCharacters } from './duck'
import { DataPagination } from '../../types'
import { Character } from './types'

describe('Characters sagas', () => {
  test('Fetch characters should be done in identity scenario', () => {
    const requestData: DataPagination<Character> = {
      count: 0,
      limit: 0,
      offset: 0,
      results: [],
      total: 0,
    }
    testSaga(fetchCharactersSaga)
      .next()
      .select(getCharacterLoadedTotal)
      .next()
      .call(CharacterManager.getCharacters, {
        offset: undefined,
        limit: PAGE_LIMIT,
      })
      .next(requestData)
      .put(fetchCharacters.success(requestData))
      .next()
      .isDone()
  })

  test('Fetch character should be handle error on request failure', () => {
    const error = new Error()
    testSaga(fetchCharactersSaga)
      .next()
      .select(getCharacterLoadedTotal)
      .next()
      .call(CharacterManager.getCharacters, {
        offset: undefined,
        limit: PAGE_LIMIT,
      })
      .next()
      .throw(error)
      .put(fetchCharacters.failure(error))
      .next()
      .isDone()
  })
})
