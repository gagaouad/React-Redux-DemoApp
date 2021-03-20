export const CREATE_BOARD = 'CREATE_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const SET_BOARD = 'SET_BOARD';
export const NEXT_BOARD = 'NEXT_BOARD';
export const NEXT_POSTIT = 'NEXT_POSTIT';
export const PREV_POSTIT = 'PREV_POSTIT';
export const ADD_DRAW_POINTS = 'ADD_DRAW_POINTS';
export const RESET_DRAW_POINTS = 'RESET_DRAW_POINTS';

export function createBoard(payload) {
  return { type: CREATE_BOARD, payload };
}

export function deleteBoard(payload) {
  return { type: DELETE_BOARD, payload };
}

export function nextPostit(payload) {
  return { type: NEXT_POSTIT, payload, meta: { propagate: false } };
}

export function prevPostit(payload) {
  return { type: PREV_POSTIT, payload, meta: { propagate: false } };
}

export function setBoard(payload, metadata) {
  return { type: SET_BOARD, payload, meta: { propagate: metadata } };
}

export function nextBoard(payload) {
  return { type: NEXT_BOARD, payload, meta: { propagate: false } };
}

export function addDrawPoints(clickX, clickY, clickDrag, metadata) {
  return {
    type: ADD_DRAW_POINTS,
    payload: { clickX, clickY, clickDrag },
    meta: { propagate: metadata },
  };
}

export function resetDrawPoints(payload, metadata) {
  return { type: RESET_DRAW_POINTS, payload, meta: { propagate: metadata } };
}
