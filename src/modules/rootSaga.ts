import { call, all } from 'redux-saga/effects'
import { charactersSaga } from './characters'
import { characterInfoSaga } from './characterInfo'
import { comicsSaga } from './comics'

function* rootSaga() {
  yield all([call(charactersSaga), call(characterInfoSaga), call(comicsSaga)])
}

export default rootSaga
