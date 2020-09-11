import { call, all } from 'redux-saga/effects'
import { charactersSaga } from './characters'
import { characterInfoSaga } from './characterInfo'

function* rootSaga() {
  yield all([call(charactersSaga), call(characterInfoSaga)])
}

export default rootSaga
