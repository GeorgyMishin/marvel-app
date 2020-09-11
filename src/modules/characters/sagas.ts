import { call, all, takeLatest, put, select } from 'redux-saga/effects'
import { fetchCharacters } from './duck'
import CharacterManager from './CharacterManager'
import { CharacterPagination } from './types'
import { getCharacterLoadedTotal } from './selectors'
import { PAGE_LIMIT } from '../../constants'

function* fetchCharactersSaga() {
  try {
    const loaded = yield select(getCharacterLoadedTotal)
    const characters: CharacterPagination = yield call(
      CharacterManager.getCharacters,
      { offset: loaded, limit: PAGE_LIMIT },
    )
    yield put(fetchCharacters.success(characters))
  } catch (ex) {
    yield put(fetchCharacters.failure(ex))
  }
}

function* characters() {
  yield all([takeLatest(fetchCharacters.request, fetchCharactersSaga)])
}

export default characters
