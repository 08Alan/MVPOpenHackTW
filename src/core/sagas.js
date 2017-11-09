import { all } from 'redux-saga/effects'

import { navigateSagas } from "core/navigate/sagas";

export default function* sagas() {
  yield all([
    ...navigateSagas
  ]);
}
