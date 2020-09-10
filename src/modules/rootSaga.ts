import { call, all } from 'redux-saga/effects'
import { charactersSaga } from './characters'

function* rootSaga() {
  yield all([call(charactersSaga)])
}

export default rootSaga
