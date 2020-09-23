import { testSaga } from 'redux-saga-test-plan'
import { PayloadAction } from 'typesafe-actions'
import { PAGE_LIMIT } from '../../constants'
import { DataPagination } from '../../types'
import StoriesManager from './StoriesManager'
import { fetchStories } from './duck'
import { fetchStoriesSaga } from './sagas'
import { getStoriesLoadedTotal } from './selectors'
import { Story } from './types'

describe('Stories sagas', () => {
  const action: PayloadAction<string, number> = {
    type: 'SOME_ACTION',
    payload: 1,
  }

  test('Fetch stories should be done in identity scenario', () => {
    const requestData: DataPagination<Story> = {
      count: 0,
      limit: 0,
      offset: 0,
      results: [],
      total: 0,
    }

    testSaga(fetchStoriesSaga, action)
      .next()
      .select(getStoriesLoadedTotal)
      .next()
      .call(StoriesManager.getStories, {
        characterId: 1,
        params: { offset: undefined, limit: PAGE_LIMIT },
      })
      .next(requestData)
      .put(fetchStories.success(requestData))
      .next()
      .isDone()
  })

  test('Fetch series should be handle error on request failure', () => {
    const error = new Error()

    testSaga(fetchStoriesSaga, action)
      .next()
      .select(getStoriesLoadedTotal)
      .next()
      .call(StoriesManager.getStories, {
        characterId: 1,
        params: { offset: undefined, limit: PAGE_LIMIT },
      })
      .throw(error)
      .put(fetchStories.failure(error))
      .next()
      .isDone()
  })
})
