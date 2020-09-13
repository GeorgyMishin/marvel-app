import { call, all, takeLatest, put, select } from 'redux-saga/effects'
import { fetchEvents } from './duck'
import EventsManager from './EventsManager'
import { EventsPagination } from './types'
import { getEventsLoadedTotal } from './selectors'
import { PAGE_LIMIT } from '../../constants'
import { PayloadAction } from 'typesafe-actions'
import { cancelable } from '../../utils/sagas'

function* fetchEventsSaga(action: PayloadAction<string, number>) {
  try {
    const loaded = yield select(getEventsLoadedTotal)
    // TODO: fixme
    const characters: EventsPagination = yield call<any>(
      EventsManager.getEvents,
      {
        characterId: action.payload,
        params: {
          offset: loaded,
          limit: PAGE_LIMIT,
        },
      },
    )
    yield put(fetchEvents.success(characters))
  } catch (ex) {
    yield put(fetchEvents.failure(ex))
  }
}

function* events() {
  yield all([
    takeLatest(
      fetchEvents.request,
      cancelable(fetchEvents.cancel, fetchEventsSaga),
    ),
  ])
}

export default events
