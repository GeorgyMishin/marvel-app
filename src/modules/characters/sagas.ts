import { call, all, takeLatest, put } from 'redux-saga/effects'
import { PayloadAction } from 'typesafe-actions'
import { fetchCharacters } from './duck'
import CharacterManager from './CharacterManager'
import { CharacterPagination } from './types'

function* fetchCharactersSaga() {
  try {
    const characters: CharacterPagination = yield call(
      CharacterManager.getCharacters,
    )
    yield put(fetchCharacters.success(characters))
  } catch {}
}

function* characters() {
  yield all([takeLatest(fetchCharacters.request, fetchCharactersSaga)])
}

export default characters
