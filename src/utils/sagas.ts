import { fork, join, race, take, cancel } from 'redux-saga/effects'
import { getType } from 'typesafe-actions'

export const cancelable = (cancelAction: any, saga: any) =>
  function* (...params: any[]) {
    const task = yield fork(saga, ...params)

    const { canceled } = yield race({
      complete: join(task),
      canceled: take(getType(cancelAction)),
    })

    if (canceled) {
      yield cancel(task)
    }
  }
