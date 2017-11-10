import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { navigateActions } from "./actions";
import { process } from "./utils";
import { delay } from 'redux-saga'

export function* changeLayoutCollapsed(action) {
  const response1 = yield call(process, 20);
  console.log(response1);
  yield put({
    type: navigateActions.UPDATE_PROCESS,
    payload: {process: response1}
  });

  yield delay(1000);

  const response2 = yield call(process, 40);
  console.log(response2);
  yield put({
    type: navigateActions.UPDATE_PROCESS,
    payload: {process: response2}
  });

  yield delay(1000);

  const response3 = yield call(process, 60);
  console.log(response3);
  yield put({
    type: navigateActions.UPDATE_PROCESS,
    payload: {process: response3}
  });

  yield delay(1000);

  const response4 = yield call(process, 80);
  console.log(response4);
  yield put({
    type: navigateActions.UPDATE_PROCESS,
    payload: {process: response4}
  });

  yield delay(1000);

  const response5 = yield call(process, 100);
  console.log(response5);
  yield put({
    type: navigateActions.UPDATE_PROCESS,
    payload: {process: response5}
  });
}

export function*  watchChangeLayoutCollapsed() {
  yield takeLatest(navigateActions.CHANGE_LAYOUT_COLLAPSED, changeLayoutCollapsed);
}

export const navigateSagas = [
  fork(watchChangeLayoutCollapsed),
];