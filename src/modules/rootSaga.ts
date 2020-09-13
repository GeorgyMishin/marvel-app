import { call, all } from 'redux-saga/effects'
import { charactersSaga } from './characters'
import { characterInfoSaga } from './characterInfo'
import { comicsSaga } from './comics'
import { eventsSaga } from './events'
import { storiesSaga } from './stories'
import { seriesSaga } from './series'

function* rootSaga() {
  yield all([
    call(charactersSaga),
    call(characterInfoSaga),
    call(comicsSaga),
    call(eventsSaga),
    call(storiesSaga),
    call(seriesSaga),
  ])
}

export default rootSaga
