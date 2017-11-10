# Saga

I will use the [progress component](https://ant.design/components/progress/) from ant-design to demo saga

## Actions

in `src/core/navigate/actions.js`, add an action

```javascript
export const navigateActions = {
  CHANGE_LAYOUT_COLLAPSED: 'CHANGE_LAYOUT_COLLAPSED',
  
  // HERE
  UPDATE_PROCESS: 'UPDATE_PROCESS',
  

  changeLayoutCollapsed: payload => ({
    type: navigateActions.CHANGE_LAYOUT_COLLAPSED,
    payload: payload
  })
};
```

## Reducer

in `src/core/navigate/reducer.js`

```javascript
import { Record } from 'immutable';
import { navigateActions } from './actions';

export const NavigateState = new Record({
  isCollapsed: false,
  
  // HERE
  process: 0,
  
});

export function navigateReducer(state = new NavigateState(), {payload, type}) {
  switch (type) {
    case navigateActions.CHANGE_LAYOUT_COLLAPSED:
      return state.set('isCollapsed', payload.collapsed);
    
    // HERE
    case navigateActions.UPDATE_PROCESS:
      return state.set('process', payload.process);
  
    default:
      return state;
  }
}

```

## Util

in `src/core/navigate/util.js`, you can put your fetch api code here

```javascript
export function process(number) {
  return number
}
```

## Sagas

in `src/core/navigate/sagas.js`

0. import dependency

1. make a watcher

2. make a worker

3. export the watcher

```javascript
// 0. import dependency
import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { navigateActions } from "./actions";
import { process } from "./utils";
import { delay } from 'redux-saga'
```

```javascript
// 1. make a watcher
export function*  watchChangeLayoutCollapsed() {
  yield takeLatest(navigateActions.CHANGE_LAYOUT_COLLAPSED, changeLayoutCollapsed);
}
```

```javascript
// 2. make a worker
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
```
```javascript
// 3. export the watcher
export const navigateSagas = [
  fork(watchChangeLayoutCollapsed),
];
```
## Views

in `src/views/pages/home-page/home-page.js`

```html
<div>
  <Progress type="circle" percent={this.props.navigateReducer.process} width={80} />
</div>
```