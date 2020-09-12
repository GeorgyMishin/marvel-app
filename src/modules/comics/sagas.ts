import { call, all, takeLatest, put, select } from 'redux-saga/effects'
import { fetchComics } from './duck'
import ComicsManager from './ComicsManager'
import { ComicsPagination } from './types'
import { getComicsLoadedTotal } from './selectors'
import { PAGE_LIMIT } from '../../constants'
import { PayloadAction } from 'typesafe-actions'
import { cancelable } from '../../utils/sagas'

function* fetchComicsSaga(action: PayloadAction<string, number>) {
  try {
    const loaded = yield select(getComicsLoadedTotal)
    // TODO: fixme
    const characters: ComicsPagination = yield call<any>(
      ComicsManager.getComics,
      {
        characterId: action.payload,
        params: {
          offset: loaded,
          limit: PAGE_LIMIT,
        },
      },
    )
    yield put(fetchComics.success(characters))
  } catch (ex) {
    yield put(fetchComics.failure(ex))
  }
}

function* comics() {
  yield all([
    takeLatest(
      fetchComics.request,
      cancelable(fetchComics.cancel, fetchComicsSaga),
    ),
  ])
}

export default comics
