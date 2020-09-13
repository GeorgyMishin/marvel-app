import { call, all, takeLatest, put, select } from 'redux-saga/effects'
import { fetchStories } from './duck'
import EventsManager from './StoriesManager'
import { StoriesPagination } from './types'
import { getStoriesLoadedTotal } from './selectors'
import { PAGE_LIMIT } from '../../constants'
import { PayloadAction } from 'typesafe-actions'
import { cancelable } from '../../utils/sagas'

function* fetchStoriesSaga(action: PayloadAction<string, number>) {
  try {
    const loaded = yield select(getStoriesLoadedTotal)
    const characters: StoriesPagination = yield call<any>(
      EventsManager.getStories,
      {
        characterId: action.payload,
        params: {
          offset: loaded,
          limit: PAGE_LIMIT,
        },
      },
    )
    yield put(fetchStories.success(characters))
  } catch (ex) {
    yield put(fetchStories.failure(ex))
  }
}

function* stories() {
  yield all([
    takeLatest(
      fetchStories.request,
      cancelable(fetchStories.cancel, fetchStoriesSaga),
    ),
  ])
}

export default stories
