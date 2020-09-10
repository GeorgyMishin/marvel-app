import { call, all, takeLatest } from 'redux-saga/effects'
import { fetchCharacters } from './duck'
import CharacterManager from './CharacterManager'

function* fetchCharactersSaga() {
  const res = yield call(CharacterManager.getCharacters)
}

function* characters() {
  yield all([takeLatest(fetchCharacters.request, fetchCharactersSaga)])
}

export default characters
