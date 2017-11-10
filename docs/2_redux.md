# Redux


## Actions

in `src/core/navigate/actions.js` define a new action

```javascript

export const navigateActions = {
  CHANGE_LAYOUT_COLLAPSED: 'CHANGE_LAYOUT_COLLAPSED',

  changeLayoutCollapsed: payload => ({
    type: navigateActions.CHANGE_LAYOUT_COLLAPSED,
    payload: payload
  })
};
```

## Reducer

in `src/core/navigate/reducer.js` define a corresponding reducer 

```javascript
import { Record } from 'immutable';
import { navigateActions } from './actions';

export const NavigateState = new Record({
  isCollapsed: false
});

export function navigateReducer(state = new NavigateState(), {payload, type}) {
  switch (type) {
    case navigateActions.CHANGE_LAYOUT_COLLAPSED:
      return state.set('isCollapsed', payload.collapsed);

    default:
      return state;
  }
}

```

## Store

in `src/core/store.js` 

```javascript
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';


export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  let middleware = applyMiddleware(sagaMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension());
    }
  }

  const store = createStore(reducers, middleware);
  sagaMiddleware.run(sagas);

  return store;
}

```

## Wrap your store with Provider

in `src/index.js`

```javascript
import 'babel-polyfill';

import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import configureStore from 'core/store';

import HomePage from 'pages/home-page';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div className="app">
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
```

## Usage

```javascript
// import your action
import { navigateActions } from 'core/navigate';


// connect your component
const mapStateToProps = store => (
  {
    navigateReducer: store.navigateReducer,
  }
);

export default connect(mapStateToProps, navigateActions)(HomePage)

// then you can dispatch an action now
this.props.changeLayoutCollapsed({collapsed: true})

```