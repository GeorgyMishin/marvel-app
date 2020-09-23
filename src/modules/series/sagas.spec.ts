import { testSaga } from 'redux-saga-test-plan'
import { PayloadAction } from 'typesafe-actions'
import { PAGE_LIMIT } from '../../constants'
import { DataPagination } from '../../types'
import SeriesManager from './SeriesManager'
import { fetchSeries } from './duck'
import { fetchSeriesSaga } from './sagas'
import { getSeriesLoadedTotal } from './selectors'
import { Series } from './types'

describe('Series sagas', () => {
  const action: PayloadAction<string, number> = {
    type: 'SOME_ACTION',
    payload: 1,
  }

  test('Fetch series should be done in identity scenario', () => {
    const requestData: DataPagination<Series> = {
      count: 0,
      limit: 0,
      offset: 0,
      results: [],
      total: 0,
    }

    testSaga(fetchSeriesSaga, action)
      .next()
      .select(getSeriesLoadedTotal)
      .next()
      .call(SeriesManager.getSeries, {
        characterId: 1,
        params: { offset: undefined, limit: PAGE_LIMIT },
      })
      .next(requestData)
      .put(fetchSeries.success(requestData))
      .next()
      .isDone()
  })

  test('Fetch series should be handle error on request failure', () => {
    const error = new Error()

    testSaga(fetchSeriesSaga, action)
      .next()
      .select(getSeriesLoadedTotal)
      .next()
      .call(SeriesManager.getSeries, {
        characterId: 1,
        params: { offset: undefined, limit: PAGE_LIMIT },
      })
      .throw(error)
      .put(fetchSeries.failure(error))
      .next()
      .isDone()
  })
})
