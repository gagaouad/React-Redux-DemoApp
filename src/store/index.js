import { createStore, applyMiddleware, compose } from 'redux';
import { io } from 'socket.io-client';
import rootReducer from '../reducers';
import {
  SET_BOARD, ADD_DRAW_POINTS, RESET_DRAW_POINTS, setBoard, addDrawPoints, resetDrawPoints,
} from '../actions';

const socket = io();
const propagateSocket = (store) => (next) => (action) => {
  if (action.meta.propagate) {
    if (action.type === SET_BOARD) {
      socket.emit('action', { type: 'set_board', value: action.payload });
    } else if (action.type === ADD_DRAW_POINTS) {
      socket.emit('action', {
        type: 'add_draw_points',
        value: {
          x: action.payload.clickX,
          y: action.payload.clickY,
          drag: action.payload.clickDrag,
        },
      });
    } else if (action.type === RESET_DRAW_POINTS) {
      socket.emit('action', { type: 'reset_draw_points', value: false });
    }
  }
  next(action);
  socket.on('action', (msg) => {
    if (msg.type === 'set_board') {
      store.dispatch(setBoard(msg.value, false));
    } else if (msg.type === 'add_draw_points') {
      store.dispatch(addDrawPoints(msg.value.x, msg.value.y, msg.value.drag, false));
      window.console.log(msg.value.x, msg.value.y, msg.value.drag);
    } else if (msg.type === 'reset_draw_points') {
      store.dispatch(resetDrawPoints(msg.value, false));
    }
  });
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(propagateSocket)),
);
export default store;
