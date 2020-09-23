import { testSaga } from 'redux-saga-test-plan'
import { PayloadAction } from 'typesafe-actions'
import { PAGE_LIMIT } from '../../constants'
import { DataPagination } from '../../types'
import EventsManager from './EventsManager'
import { fetchEvents } from './duck'
import { fetchEventsSaga } from './sagas'
import { getEventsLoadedTotal } from './selectors'
import { Events } from './types'

describe('Events sagas', () => {
  const action: PayloadAction<string, number> = {
    type: 'SOME_ACTION',
    payload: 1,
  }

  test('Fetch events should be done in identity scenario', () => {
    const requestData: DataPagination<Events> = {
      count: 0,
      limit: 0,
      offset: 0,
      results: [],
      total: 0,
    }

    testSaga(fetchEventsSaga, action)
      .next()
      .select(getEventsLoadedTotal)
      .next()
      .call(EventsManager.getEvents, {
        characterId: 1,
        params: { offset: undefined, limit: PAGE_LIMIT },
      })
      .next(requestData)
      .put(fetchEvents.success(requestData))
      .next()
      .isDone()
  })

  test('Fetch events should be handle error on request failure', () => {
    const error = new Error()

    testSaga(fetchEventsSaga, action)
      .next()
      .select(getEventsLoadedTotal)
      .next()
      .call(EventsManager.getEvents, {
        characterId: 1,
        params: { offset: undefined, limit: PAGE_LIMIT },
      })
      .throw(error)
      .put(fetchEvents.failure(error))
      .next()
      .isDone()
  })
})
