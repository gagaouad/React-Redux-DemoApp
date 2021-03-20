import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { isMobile } from 'react-device-detect';
import App from './Components/Main/App';
import MainPostit from './Components/Main/MainPostit';
import store from './store';
import { setBoard } from './actions';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/:id" exact strict>
          {isMobile ? <Redirect to="/postit/" /> : <App />}
        </Route>
        <Route path="/postit/" exact strict>
          {isMobile ? <MainPostit /> : <Redirect to={`/${store.getState().currentBoard}`} /> }
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
window.addEventListener('popstate', () => {
  const { hash } = window.location;
  const hashlist = hash.split('/');
  const boardIndex = parseInt(hashlist[hashlist.length - 1], 10);
  if (!Number.isNaN(boardIndex)) {
    if (store.getState().currentBoard !== boardIndex) {
      store.dispatch(setBoard(boardIndex, true));
    }
  }
});
store.subscribe(() => {
  const hash = `#/${store.getState().currentBoard}`;
  if (window.location.hash !== hash) {
    window.location.hash = hash;
    document.body.scrollTop = 0;
  }
});
