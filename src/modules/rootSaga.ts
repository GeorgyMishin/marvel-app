import { call, all } from 'redux-saga/effects'
import { charactersSaga } from './characters'
import { characterInfoSaga } from './characterInfo'
import { comicsSaga } from './comics'
import { eventsSaga } from './events'

function* rootSaga() {
  yield all([
    call(charactersSaga),
    call(characterInfoSaga),
    call(comicsSaga),
    call(eventsSaga),
  ])
}

export default rootSaga
