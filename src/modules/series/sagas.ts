import { call, all, takeLatest, put, select } from 'redux-saga/effects'
import { fetchSeries } from './duck'
import SeriesManager from './SeriesManager'
import { SeriesPagination } from './types'
import { getSeriesLoadedTotal } from './selectors'
import { PAGE_LIMIT } from '../../constants'
import { PayloadAction } from 'typesafe-actions'
import { cancelable } from '../../utils/sagas'

function* fetchSeriesSaga(action: PayloadAction<string, number>) {
  try {
    const loaded = yield select(getSeriesLoadedTotal)
    // TODO: fixme
    const characters: SeriesPagination = yield call<any>(
      SeriesManager.getSeries,
      {
        characterId: action.payload,
        params: {
          offset: loaded,
          limit: PAGE_LIMIT,
        },
      },
    )
    yield put(fetchSeries.success(characters))
  } catch (ex) {
    yield put(fetchSeries.failure(ex))
  }
}

function* stories() {
  yield all([
    takeLatest(
      fetchSeries.request,
      cancelable(fetchSeries.cancel, fetchSeriesSaga),
    ),
  ])
}

export default stories
