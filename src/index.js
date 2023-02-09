import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

// components
import App from './pages/App';

// store
import rootReducer from './redux';

// styles
import './index.scss';

// init redux
const history = createHistory();
const store = createStore(
  combineReducers({
    app: rootReducer,
    router: routerReducer,
  }),
  applyMiddleware(...[routerMiddleware(history), thunk]),
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route exact path="/*" component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
