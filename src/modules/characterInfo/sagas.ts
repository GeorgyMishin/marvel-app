import { call, all, takeLatest, put } from 'redux-saga/effects'
import { PayloadAction } from 'typesafe-actions'
import { fetchCharacterInfo } from './duck'
import { CharacterManager, CharacterPagination } from '../characters'

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
    yield put(fetchCharacterInfo.failure(ex))
  }
}

function* characters() {
  yield all([takeLatest(fetchCharacterInfo.request, fetchCharacterInfoSaga)])
}

export default characters
