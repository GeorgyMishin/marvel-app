import { call, all, takeLatest, put } from 'redux-saga/effects'
import { PayloadAction } from 'typesafe-actions'
import { fetchCharacters, fetchCharacterInfo } from './duck'
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

function* fetchCharacterInfoSaga(action: PayloadAction<string, string>) {
  try {
    const characterInfo: CharacterPagination = yield call(
      CharacterManager.getCharacters,
      {
        id: action.payload,
      },
    )
    yield put(fetchCharacterInfo.success(characterInfo))
  } catch (ex) {
    console.log(ex)
  }
}

function* characters() {
  yield all([
    takeLatest(fetchCharacters.request, fetchCharactersSaga),
    takeLatest(fetchCharacterInfo.request, fetchCharacterInfoSaga),
  ])
}

export default characters
