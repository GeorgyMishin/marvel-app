import { testSaga } from 'redux-saga-test-plan'
import { PayloadAction } from 'typesafe-actions'
import { DataPagination } from '../../types'
import { Character, CharacterManager } from '../characters'
import { fetchCharacterInfo } from './duck'
import { fetchCharacterInfoSaga } from './sagas'

describe('Character info saga', () => {
  const action: PayloadAction<string, string> = {
    type: 'SOME_ACTION',
    payload: '1',
  }

  test('Fetch character info should be done in identity scenario', () => {
    const requestData: DataPagination<Character> = {
      count: 0,
      limit: 0,
      offset: 0,
      results: [],
      total: 0,
    }

    testSaga(fetchCharacterInfoSaga, action)
      .next()
      .call(CharacterManager.getCharacters, { id: '1' })
      .next(requestData)
      .put(fetchCharacterInfo.success(requestData))
      .next()
      .isDone()
  })

  test('Fetch character info should be handle error on request failure', () => {
    const error = new Error()

    testSaga(fetchCharacterInfoSaga, action)
      .next()
      .call(CharacterManager.getCharacters, {
        id: '1',
      })
      .throw(error)
      .put(fetchCharacterInfo.failure(error))
      .next()
      .isDone()
  })
})
