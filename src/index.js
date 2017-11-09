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