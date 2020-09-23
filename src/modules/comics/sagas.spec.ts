import { testSaga } from 'redux-saga-test-plan'
import { PayloadAction } from 'typesafe-actions'
import { PAGE_LIMIT } from '../../constants'
import { DataPagination } from '../../types'
import ComicsManager from './ComicsManager'
import { fetchComics } from './duck'
import { fetchComicsSaga } from './sagas'
import { getComicsLoadedTotal } from './selectors'
import { Comics } from './types'

describe('Comics sagas', () => {
  const action: PayloadAction<string, number> = {
    type: 'SOME_ACTION',
    payload: 1,
  }

  test('Fetch comics should be done in identity scenario', () => {
    const requestData: DataPagination<Comics> = {
      count: 0,
      limit: 0,
      offset: 0,
      results: [],
      total: 0,
    }

    testSaga(fetchComicsSaga, action)
      .next()
      .select(getComicsLoadedTotal)
      .next()
      .call(ComicsManager.getComics, {
        characterId: 1,
        params: { offset: undefined, limit: PAGE_LIMIT },
      })
      .next(requestData)
      .put(fetchComics.success(requestData))
      .next()
      .isDone()
  })

  test('Fetch comics should be handle error on request failure', () => {
    const error = new Error()

    testSaga(fetchComicsSaga, action)
      .next()
      .select(getComicsLoadedTotal)
      .next()
      .call(ComicsManager.getComics, {
        characterId: 1,
        params: { offset: undefined, limit: PAGE_LIMIT },
      })
      .throw(error)
      .put(fetchComics.failure(error))
      .next()
      .isDone()
  })
})
